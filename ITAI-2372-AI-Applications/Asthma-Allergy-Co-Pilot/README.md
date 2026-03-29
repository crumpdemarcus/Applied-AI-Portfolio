# AeroSense - AI-Powered Respiratory Health Companion

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

> **An intelligent asthma and allergy management platform powered by Google Gemini 2.5 Pro, providing personalized health insights and real-time respiratory risk assessment.**

**ITAI 2372 AI Applications Project - Houston City College**

---

## 📋 Overview

AeroSense is a comprehensive AI-powered health companion designed to help individuals manage asthma and allergies through intelligent symptom interpretation, environmental risk forecasting, and personalized inhaler technique guidance. Built with modern full-stack technologies and advanced AI models, this application bridges the gap between medical expertise and accessible daily health management.

## Problem Statement
- **25.7 million Americans** have asthma, with many struggling to manage symptoms effectively
- Environmental triggers are difficult to track and predict in real-time
- Proper inhaler technique is used by only **31% of patients**, reducing medication effectiveness
- Limited access to immediate medical guidance for symptom interpretation

## Approach and Methodology
AeroSense provides:
- **AI-Powered Symptom Checker**: Google Gemini 2.5 Pro analyzes symptoms and provides educational guidance
- **Risk Forecasting**: Machine learning predicts respiratory risk based on environmental data
- **Inhaler Technique Coach**: Computer vision-ready guidance for proper medication delivery
- **Real-Time Environmental Monitoring**: Tracks air quality, pollen, weather conditions

### Target Users
- Asthma and allergy sufferers seeking better symptom management
- Parents monitoring children's respiratory health
- Healthcare providers looking for patient engagement tools
- Public health organizations tracking respiratory disease patterns

---

## ✨ Core Features

### 🩺 **Intelligent Symptom Checker**
- **AI-Powered Analysis**: Leverages Google Gemini 2.5 Pro (via Hugging Face) for natural language symptom interpretation
- **Educational Guidance**: Provides evidence-based recommendations without replacing medical advice
- **Symptom Tracking**: Logs user symptoms for pattern recognition and trend analysis
- **Risk Assessment**: Evaluates symptom severity and suggests appropriate actions

### 🌤️ **Environmental Risk Forecasting**
- **Real-Time Data Integration**: Monitors air quality index (AQI), pollen counts, weather conditions
- **Machine Learning Predictions**: Gradient Boosting Classifier predicts daily respiratory risk
- **Personalized Alerts**: Notifies users of high-risk environmental conditions
- **Historical Tracking**: Analyzes correlations between environment and symptom patterns

### 💨 **Inhaler Technique Analysis**
- **Video Guidance**: Step-by-step instructions for proper inhaler use
- **Technique Validation**: Computer vision-ready framework for analyzing inhaler usage
- **Educational Resources**: Evidence-based best practices for medication delivery
- **Usage Tracking**: Monitors medication adherence and effectiveness

### 📊 **Health Dashboard**
- **Comprehensive Overview**: Displays symptom trends, environmental data, and risk scores
- **Activity Feed**: Recent symptom logs and environmental alerts
- **Data Visualization**: Interactive charts showing health patterns over time
- **Export Capabilities**: Generate reports for healthcare provider consultations

---

## Requirements or Dependencies

### Backend
- **FastAPI** - High-performance Python web framework
- **Google Gemini 2.5 Pro** - Advanced AI model for symptom interpretation
- **MongoDB** - NoSQL database for flexible health data storage
- **Motor** - Async MongoDB driver for FastAPI
- **Scikit-learn** - Machine learning for risk prediction
- **Hugging Face Inference API** - LLM integration

### Frontend
- **React** - Component-based UI library
- **Vite** - Next-generation frontend build tool
- **Shadcn UI** - Modern component library
- **TailwindCSS** - Utility-first CSS framework
- **Base44 API** - Backend integration layer

### AI & ML
- **Google Gemini 2.5 Pro** - Natural language understanding for medical queries
- **Gradient Boosting Classifier** - Environmental risk prediction
- **Pandas/NumPy** - Data processing and analysis

### Development Platforms
- **Emergent AI** - Initial full-stack application scaffolding
- **Base44** - Frontend development and API integration

---

## 📂 Project Structure

```
Asthma-Allergy-Co-Pilot/
├── backend/
│   ├── server.py              # FastAPI application with AI endpoints
│   └── requirements.txt       # Python dependencies
├── frontend/                  # Original React application
├── aero-sense-6f2badf9/      # Base44-generated frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/            # Application pages
│   │   └── api/              # API integration
│   └── package.json
├── AI Asthma & Allergy Research Brief.pdf
├── AI-Driven Asthma and Allergy Co-Pilot_ Strategic Research Report.pdf
├── AeroSense-AI-Powered-Respiratory-Health-Companion.pdf
└── AeroSense-AI-Powered-Respiratory-Health-Companion.pptx
```

---

## 🚀 Key Capabilities

### Symptom Interpretation Engine
```python
# Powered by Google Gemini 2.5 Pro
- Natural language processing of symptom descriptions
- Context-aware medical guidance
- Severity assessment and triage recommendations
- Integration with user health history
```

### Environmental Risk Model
```python
# Machine Learning Pipeline
- Features: AQI, pollen count, temperature, humidity
- Model: Gradient Boosting Classifier
- Output: Daily risk score (0-100)
- Real-time alerts for high-risk conditions
```

### Data Management
```python
# MongoDB Collections
- users: User profiles and preferences
- symptoms: Symptom logs with timestamps
- environment: Historical environmental data
- risk_forecasts: Predicted risk scores
```

---

## 📚 Documentation

### Research & Analysis
- **[AI Asthma & Allergy Research Brief.pdf](AI%20Asthma%20&%20Allergy%20Research%20Brief.pdf)** - Market research and clinical insights
- **[Strategic Research Report.pdf](AI-Driven%20Asthma%20and%20Allergy%20Co-Pilot_%20Strategic%20Research%20Report.pdf)** - Technical feasibility and business model analysis

### Presentation
- **[AeroSense Presentation.pdf](AeroSense-AI-Powered-Respiratory-Health-Companion.pdf)** - Project pitch deck
- **[AeroSense Presentation.pptx](AeroSense-AI-Powered-Respiratory-Health-Companion.pptx)** - Editable presentation

---

## Results and Evaluation

The integration of Gemini 2.5 Pro improved triage and recommendation specificity by significantly reducing false positive alerts for environmental hazards compared to rule-based approaches.

### Impact & Use Cases

### Individual Health Management
- Daily symptom tracking and pattern recognition
- Personalized environmental risk alerts
- Medication adherence improvement through technique guidance
- Data-driven insights for healthcare consultations

### Healthcare Provider Support
- Patient engagement between appointments
- Objective symptom data collection
- Treatment effectiveness monitoring
- Early warning system for symptom escalation

### Public Health Applications
- Population-level respiratory health monitoring
- Environmental trigger identification
- Disease outbreak early detection
- Health policy data insights

---

## 🔬 AI & Machine Learning Models

### Google Gemini 2.5 Pro Integration
- **Model**: `gemini-2.5-pro` via Hugging Face Inference API
- **Use Case**: Medical symptom interpretation and educational guidance
- **Input**: Natural language symptom descriptions
- **Output**: Structured health guidance with severity assessment
- **Safety**: Includes medical disclaimer and professional consultation recommendations

### Risk Prediction Model
- **Algorithm**: Gradient Boosting Classifier (Scikit-learn)
- **Training Data**: Historical symptom-environment correlations
- **Features**: 7 environmental variables (AQI, pollen, weather metrics)
- **Accuracy**: Optimized for respiratory risk prediction
- **Output**: 0-100 risk score with confidence intervals

---

## ⚠️ Medical Disclaimer

**AeroSense is an educational tool and does NOT provide medical advice, diagnosis, or treatment.** 

- Always consult qualified healthcare professionals for medical decisions
- Emergency symptoms require immediate medical attention (call 911)
- This application supplements but does not replace professional healthcare
- AI-generated content is for informational purposes only

---

## Learning Outcomes

- **Foundational Machine Learning:** Designed and trained a Gradient Boosting Classifier using Python and Scikit-learn for time-series environmental risk prediction.
- **LLM Integration via Hugging Face:** Successfully implemented Google Gemini 2.5 Pro inference endpoints to provide real-time, context-aware medical symptom interpretations.
- **Full-Stack Architecture:** Architected a scalable system bridging a React/Vite frontend with an asynchronous FastAPI and MongoDB backend.

## Sample Data Access

This application synthesizes real-time environmental API data (AQI, pollen, weather metrics), avoiding the need for static sample CSVs. Demo credentials or test symptom inputs can be run directly against the live models.

## 🏆 Project Highlights

- ✅ Full-stack AI application with modern tech stack
- ✅ Integration of Google's advanced Gemini 2.5 Pro model
- ✅ Machine learning for predictive health analytics
- ✅ Real-time environmental data processing
- ✅ Comprehensive health dashboard with data visualization
- ✅ Mobile-responsive design with Shadcn UI components
- ✅ Fully functional FastAPI backend with async operations
- ✅ MongoDB for flexible health data storage
- ✅ Built using cutting-edge AI development platforms (Emergent AI + Base44)

---

## 📬 Contact

**DeMarcus Crump**  
📧 Email: crumpdemarcus@gmail.com  
💼 LinkedIn: [linkedin.com/in/demarcus-crump](https://www.linkedin.com/in/demarcus-crump/)  
🎓 Houston City College - Artificial Intelligence, A.A.S.

---

## 📄 License

This project was developed as part of the ITAI 2372 AI Applications course at Houston City College.
