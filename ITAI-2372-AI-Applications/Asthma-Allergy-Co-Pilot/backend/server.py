"""
AeroSense Backend - Asthma & Allergy AI Co-Pilot
Main FastAPI server handling symptom interpretation, environmental data, 
risk forecasting, and inhaler technique analysis.

This application provides educational guidance for asthma and allergy management
and is NOT a substitute for professional medical advice.
"""

from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
from huggingface_hub import InferenceClient
import json
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
import pandas as pd
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="AeroSense API", description="Asthma & Allergy AI Co-Pilot Backend")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize MedGemma client for symptom interpretation  
def get_medgemma_client():
    """Initialize MedGemma client for symptom interpretation using Hugging Face"""
    hf_token = os.environ.get('HUGGINGFACE_API_KEY')
    if not hf_token:
        raise ValueError("HUGGINGFACE_API_KEY environment variable is required")
    
    return InferenceClient(token=hf_token)

async def analyze_with_medgemma(symptom_text: str) -> Dict[str, Any]:
    """
    Analyze symptoms using MedGemma model for educational purposes.
    Returns structured medical analysis with disclaimers.
    """
    client = get_medgemma_client()
    
    # Medical analysis prompt for MedGemma
    prompt = f"""You are a medical educational assistant specializing in asthma and allergy symptom interpretation.

IMPORTANT DISCLAIMERS:
- You provide educational information only
- You do NOT diagnose, treat, or prescribe  
- Always remind users to consult healthcare professionals

Analyze this symptom description for asthma/allergy educational purposes:
"{symptom_text}"

Your role:
1. Analyze symptom descriptions for clinical keywords (cough, wheeze, chest tightness, shortness of breath)
2. Categorize severity as: mild, moderate, severe
3. Suggest educational triage level: self-care, primary care, urgent care
4. Provide patient-friendly explanations
5. Recommend educational resources

Provide your analysis in this exact JSON format:
{{
    "severity": "mild|moderate|severe",
    "keywords": ["extracted", "clinical", "keywords"],
    "triage_level": "self-care|primary care|urgent care", 
    "explanation": "Patient-friendly explanation of symptoms and what they might indicate",
    "recommendations": ["educational recommendation 1", "recommendation 2", "consult healthcare provider"]
}}

Remember: This is educational only, not diagnostic. Always include consulting healthcare provider in recommendations."""
    
    try:
        # Call MedGemma model via Hugging Face Inference API with timeout
        response = await asyncio.wait_for(
            asyncio.get_event_loop().run_in_executor(
                None,
                lambda: client.text_generation(
                    prompt,
                    model="google/medgemma-4b-it",
                    max_new_tokens=512,
                    temperature=0.3,  # Lower temperature for more consistent medical advice
                    top_p=0.85,
                    repetition_penalty=1.1,
                    do_sample=True,
                    return_full_text=False
                )
            ),
            timeout=30.0  # 30 second timeout for MedGemma API
        )
        
        # Parse the JSON response from MedGemma
        try:
            # Clean the response - sometimes models return extra text
            response_text = response.strip()
            if '```json' in response_text:
                # Extract JSON from code block
                start = response_text.find('{')
                end = response_text.rfind('}') + 1
                response_text = response_text[start:end]
            elif response_text.startswith('```'):
                # Remove markdown code block markers
                lines = response_text.split('\n')
                lines = [line for line in lines if not line.strip().startswith('```')]
                response_text = '\n'.join(lines)
            
            analysis_data = json.loads(response_text)
            
            # Validate required fields
            required_fields = ['severity', 'keywords', 'triage_level', 'explanation', 'recommendations']
            for field in required_fields:
                if field not in analysis_data:
                    raise ValueError(f"Missing required field: {field}")
            
            # Ensure recommendations always includes healthcare consultation
            if not any('healthcare' in rec.lower() or 'doctor' in rec.lower() or 'medical' in rec.lower() 
                      for rec in analysis_data['recommendations']):
                analysis_data['recommendations'].append("Consult with healthcare provider for proper evaluation")
            
            return analysis_data
            
        except (json.JSONDecodeError, ValueError) as parse_error:
            logging.warning(f"Failed to parse MedGemma response: {parse_error}. Response: {response[:200]}")
            # Fallback to rule-based analysis if parsing fails
            return await fallback_symptom_analysis(symptom_text)
        
    except Exception as api_error:
        logging.error(f"Error calling MedGemma API: {api_error}")
        # Fallback to rule-based analysis if API fails
        return await fallback_symptom_analysis(symptom_text)

async def fallback_symptom_analysis(symptom_text: str) -> Dict[str, Any]:
    """
    Fallback rule-based symptom analysis when MedGemma API is unavailable.
    Provides safe, educational guidance for asthma and allergy symptoms.
    """
    try:
        # Rule-based symptom analysis
        symptom_lower = symptom_text.lower()
        
        # Define keyword categories
        severe_keywords = ["severe", "extreme", "cannot breathe", "emergency", "hospital", "chest pain", "blue lips", "unconscious"]
        moderate_keywords = ["moderate", "difficult", "worse", "increasing", "wheezing", "tight chest", "shortness of breath"]
        mild_keywords = ["mild", "slight", "occasional", "minor", "light cough", "runny nose", "sneezing"]
        
        # Respiratory keywords
        respiratory_keywords = ["cough", "wheeze", "breathe", "breathing", "chest", "lung", "asthma", "shortness", "tight"]
        allergy_keywords = ["allergy", "allergic", "pollen", "dust", "pet", "food", "rash", "itchy", "hives", "swelling"]
        
        # Analyze severity
        severity = "mild"  # default
        if any(keyword in symptom_lower for keyword in severe_keywords):
            severity = "severe"
        elif any(keyword in symptom_lower for keyword in moderate_keywords):
            severity = "moderate"
        
        # Extract keywords
        found_keywords = []
        for keyword in respiratory_keywords + allergy_keywords:
            if keyword in symptom_lower:
                found_keywords.append(keyword)
        
        if not found_keywords:
            found_keywords = ["general symptoms"]
        
        # Determine triage level
        if severity == "severe":
            triage_level = "urgent care"
        elif severity == "moderate":
            triage_level = "primary care"
        else:
            triage_level = "self-care"
        
        # Generate explanation
        if "wheez" in symptom_lower or "breathe" in symptom_lower or "breath" in symptom_lower:
            explanation = "You've described respiratory symptoms that may be related to asthma or allergies. These symptoms can vary in severity and may be triggered by environmental factors."
        elif any(word in symptom_lower for word in allergy_keywords):
            explanation = "Your symptoms suggest possible allergic reactions. Allergies can manifest in various ways and identifying triggers is important for management."
        else:
            explanation = "Based on your symptom description, this appears to be a general health concern that would benefit from professional medical evaluation."
        
        # Generate recommendations
        recommendations = [
            "Keep a symptom diary to track patterns and potential triggers",
            "Monitor your symptoms and note any changes in severity",
            "Consider environmental factors that might be contributing to your symptoms"
        ]
        
        if severity == "severe":
            recommendations.insert(0, "Seek immediate medical attention if symptoms worsen")
        elif "wheez" in symptom_lower or "asthma" in symptom_lower:
            recommendations.append("Ensure you have your rescue inhaler available if prescribed")
        
        # Always include healthcare consultation
        recommendations.append("Consult with healthcare provider for proper evaluation and personalized treatment plan")
        
        return {
            "severity": severity,
            "keywords": found_keywords[:5],  # Limit to 5 keywords
            "triage_level": triage_level,
            "explanation": explanation,
            "recommendations": recommendations[:5]  # Limit to 5 recommendations
        }
        
    except Exception as e:
        logging.error(f"Error in fallback symptom analysis: {str(e)}", exc_info=True)
        # Return safe fallback response
        return {
            "severity": "mild",
            "keywords": ["symptom analysis"], 
            "triage_level": "primary care",
            "explanation": "Unable to complete symptom analysis at this time. Please consult with a healthcare provider for evaluation.",
            "recommendations": [
                "Consult with healthcare provider for symptom evaluation",
                "Monitor symptoms and seek medical attention if they worsen",
                "Keep a symptom diary to discuss with your healthcare provider"
            ]
        }

# Pydantic Models
class SymptomAnalysisRequest(BaseModel):
    """Request model for symptom analysis"""
    symptom_text: str = Field(..., description="Free-text symptom description")
    user_id: Optional[str] = Field(default=None, description="User ID for tracking")

class SymptomAnalysisResponse(BaseModel):
    """Response model for symptom analysis"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    severity: str = Field(..., description="Severity level: mild, moderate, severe")
    keywords: List[str] = Field(..., description="Extracted clinical keywords")
    triage_level: str = Field(..., description="Recommended care level")
    explanation: str = Field(..., description="Patient-friendly explanation")
    recommendations: List[str] = Field(..., description="Educational recommendations")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EnvironmentalData(BaseModel):
    """Environmental trigger data model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    pollen_level: int = Field(..., description="Pollen count (0-12 scale)")
    aqi: int = Field(..., description="Air Quality Index (0-500)")
    weather_condition: str = Field(..., description="Weather condition")
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: int = Field(..., description="Humidity percentage")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RiskForecastRequest(BaseModel):
    """Request model for risk forecasting"""
    user_id: str
    recent_symptoms: List[str] = Field(..., description="Recent symptom descriptions")

class RiskForecastResponse(BaseModel):
    """Response model for risk forecasting"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    risk_level: str = Field(..., description="Risk level: low, medium, high")
    confidence: float = Field(..., description="Confidence score 0-1")
    factors: List[str] = Field(..., description="Contributing risk factors")
    forecast_period: str = Field(default="72 hours", description="Forecast period")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class InhalerTechniqueRequest(BaseModel):
    """Request model for inhaler technique analysis"""
    technique_steps: Dict[str, bool] = Field(..., description="Technique checklist")
    inhaler_type: str = Field(default="MDI", description="Inhaler type")

class InhalerTechniqueResponse(BaseModel):
    """Response model for inhaler technique analysis"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    overall_score: float = Field(..., description="Overall technique score 0-100")
    step_feedback: Dict[str, str] = Field(..., description="Per-step feedback")
    improvement_tips: List[str] = Field(..., description="Improvement suggestions")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Demo environmental data generator
def generate_demo_environmental_data() -> EnvironmentalData:
    """Generate realistic demo environmental data for triggers"""
    import random
    
    pollen_levels = [2, 3, 5, 8, 10, 4, 6]  # Varying pollen through week
    aqi_values = [45, 62, 38, 89, 55, 41, 67]  # Moderate AQI values
    weather_conditions = ["Clear", "Partly Cloudy", "Rainy", "Windy", "Humid", "Dry", "Foggy"]
    
    today_idx = datetime.now().weekday()
    
    return EnvironmentalData(
        pollen_level=pollen_levels[today_idx],
        aqi=aqi_values[today_idx],
        weather_condition=weather_conditions[today_idx],
        temperature=round(random.uniform(15, 28), 1),
        humidity=random.randint(40, 80)
    )

# Simple risk prediction model
def predict_exacerbation_risk(symptoms_data: List[str], env_data: EnvironmentalData) -> RiskForecastResponse:
    """
    Simple predictive model for asthma exacerbation risk.
    Uses basic feature engineering and rule-based logic.
    """
    
    # Extract symptom severity features
    severe_keywords = ["severe", "extreme", "cannot", "emergency", "hospital"]
    moderate_keywords = ["moderate", "difficult", "worse", "increasing"]
    symptom_count = len(symptoms_data)
    
    severity_score = 0
    for symptom in symptoms_data:
        symptom_lower = symptom.lower()
        if any(keyword in symptom_lower for keyword in severe_keywords):
            severity_score += 3
        elif any(keyword in symptom_lower for keyword in moderate_keywords):
            severity_score += 2
        else:
            severity_score += 1
    
    # Environmental risk factors
    env_risk = 0
    factors = []
    
    if env_data.pollen_level > 7:
        env_risk += 2
        factors.append(f"High pollen count ({env_data.pollen_level}/12)")
    
    if env_data.aqi > 100:
        env_risk += 2
        factors.append(f"Poor air quality (AQI {env_data.aqi})")
    elif env_data.aqi > 50:
        env_risk += 1
        factors.append(f"Moderate air quality (AQI {env_data.aqi})")
    
    if env_data.weather_condition in ["Windy", "Humid", "Foggy"]:
        env_risk += 1
        factors.append(f"Challenging weather ({env_data.weather_condition})")
    
    # Calculate total risk
    total_risk = severity_score + env_risk
    confidence = min(0.85, 0.5 + (total_risk * 0.05))  # Basic confidence calculation
    
    # Determine risk level
    if total_risk >= 8:
        risk_level = "high"
        if not factors:
            factors = ["Frequent severe symptoms"]
    elif total_risk >= 4:
        risk_level = "medium"
        if not factors:
            factors = ["Moderate symptom frequency", "Some environmental triggers"]
    else:
        risk_level = "low"
        if not factors:
            factors = ["Minimal symptoms", "Favorable conditions"]
    
    return RiskForecastResponse(
        risk_level=risk_level,
        confidence=confidence,
        factors=factors
    )

# API Routes

@api_router.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "AeroSense API - Educational Asthma & Allergy Co-Pilot"}

@api_router.post("/analyze-symptoms", response_model=SymptomAnalysisResponse)
async def analyze_symptoms(request: SymptomAnalysisRequest):
    """
    Analyze user symptoms using MedGemma AI model for educational purposes.
    Extracts clinical keywords, categorizes severity, and provides educational guidance.
    
    This endpoint uses Google's MedGemma model specialized for medical symptom interpretation.
    Falls back to rule-based analysis if the AI service is unavailable.
    """
    try:
        # Use MedGemma for symptom analysis with fallback
        analysis_data = await analyze_with_medgemma(request.symptom_text)
        
        # Create response model
        analysis_response = SymptomAnalysisResponse(**analysis_data)
        
        # Store in database for tracking
        analysis_dict = analysis_response.dict()
        analysis_dict['user_id'] = request.user_id
        analysis_dict['original_text'] = request.symptom_text
        await db.symptom_analyses.insert_one(analysis_dict)
        
        return analysis_response
        
    except Exception as e:
        logging.error(f"Error in symptom analysis: {e}")
        raise HTTPException(status_code=500, detail="Error processing symptom analysis")

@api_router.get("/environmental-data", response_model=EnvironmentalData)
async def get_environmental_data():
    """
    Get current environmental trigger data.
    Returns demo data with realistic values for pollen, AQI, and weather.
    """
    return generate_demo_environmental_data()

@api_router.get("/environmental-history", response_model=List[EnvironmentalData])
async def get_environmental_history(days: int = 7):
    """Get historical environmental data for trend analysis"""
    import random
    from datetime import timedelta
    
    history = []
    base_date = datetime.now(timezone.utc)
    
    for i in range(days):
        date = base_date - timedelta(days=i)
        env_data = generate_demo_environmental_data()
        env_data.timestamp = date
        history.append(env_data)
    
    return history

@api_router.post("/risk-forecast", response_model=RiskForecastResponse)
async def forecast_risk(request: RiskForecastRequest):
    """
    Generate 72-hour exacerbation risk forecast.
    Combines symptom patterns with environmental factors.
    """
    try:
        # Get recent environmental data
        env_data = generate_demo_environmental_data()
        
        # Generate risk forecast
        forecast = predict_exacerbation_risk(request.recent_symptoms, env_data)
        
        # Store forecast
        forecast_dict = forecast.dict()
        forecast_dict['user_id'] = request.user_id
        await db.risk_forecasts.insert_one(forecast_dict)
        
        return forecast
        
    except Exception as e:
        logging.error(f"Error in risk forecasting: {e}")
        raise HTTPException(status_code=500, detail="Error generating risk forecast")

@api_router.post("/inhaler-technique", response_model=InhalerTechniqueResponse)
async def analyze_inhaler_technique(request: InhalerTechniqueRequest):
    """
    Analyze inhaler technique using rule-based educational system.
    Provides step-by-step feedback and improvement tips.
    """
    try:
        # Define proper technique steps for MDI (Metered Dose Inhaler)
        proper_steps = {
            "shake_inhaler": "Shake inhaler vigorously for 3-5 seconds",
            "remove_cap": "Remove protective cap and check for obstructions",
            "exhale_fully": "Exhale fully, away from inhaler",
            "seal_lips": "Form tight seal around mouthpiece with lips",
            "press_breathe": "Press down and breathe in slowly and deeply",
            "hold_breath": "Hold breath for 10 seconds or as long as comfortable",
            "exhale_slowly": "Exhale slowly and replace cap"
        }
        
        step_feedback = {}
        correct_steps = 0
        improvement_tips = []
        
        # Analyze each step
        for step, description in proper_steps.items():
            if step in request.technique_steps:
                if request.technique_steps[step]:
                    step_feedback[step] = "✅ Correct technique"
                    correct_steps += 1
                else:
                    step_feedback[step] = f"⚠️ Needs improvement: {description}"
                    improvement_tips.append(f"Focus on: {description}")
            else:
                step_feedback[step] = f"❌ Step missing: {description}"
                improvement_tips.append(f"Remember to: {description}")
        
        # Calculate overall score
        total_steps = len(proper_steps)
        overall_score = (correct_steps / total_steps) * 100
        
        # Add general tips based on score
        if overall_score < 60:
            improvement_tips.insert(0, "Consider asking your healthcare provider for technique demonstration")
        elif overall_score < 80:
            improvement_tips.insert(0, "Good technique! Focus on the missed steps for optimal medication delivery")
        else:
            improvement_tips = ["Excellent technique! Continue this proper form"] + improvement_tips[:2]
        
        technique_response = InhalerTechniqueResponse(
            overall_score=round(overall_score, 1),
            step_feedback=step_feedback,
            improvement_tips=improvement_tips[:5]  # Limit to top 5 tips
        )
        
        # Store analysis
        technique_dict = technique_response.dict()
        technique_dict['technique_steps'] = request.technique_steps
        technique_dict['inhaler_type'] = request.inhaler_type
        await db.inhaler_analyses.insert_one(technique_dict)
        
        return technique_response
        
    except Exception as e:
        logging.error(f"Error in inhaler technique analysis: {e}")
        raise HTTPException(status_code=500, detail="Error analyzing inhaler technique")

@api_router.get("/user-history/{user_id}")
async def get_user_history(user_id: str):
    """Get user's analysis history for tracking progress"""
    try:
        symptoms = await db.symptom_analyses.find({"user_id": user_id}).sort("timestamp", -1).limit(10).to_list(10)
        forecasts = await db.risk_forecasts.find({"user_id": user_id}).sort("timestamp", -1).limit(10).to_list(10)
        
        # Convert ObjectId to string if present
        for symptom in symptoms:
            if '_id' in symptom:
                symptom['_id'] = str(symptom['_id'])
        
        for forecast in forecasts:
            if '_id' in forecast:
                forecast['_id'] = str(forecast['_id'])
        
        return {
            "symptom_analyses": symptoms,
            "risk_forecasts": forecasts
        }
    except Exception as e:
        logging.error(f"Error getting user history: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving user history")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    client.close()

# Educational disclaimer for all responses
@app.middleware("http")
async def add_medical_disclaimer(request, call_next):
    """Add medical disclaimer header to all responses"""
    response = await call_next(request)
    response.headers["X-Medical-Disclaimer"] = "Educational purposes only. Not a substitute for professional medical advice."
    return response