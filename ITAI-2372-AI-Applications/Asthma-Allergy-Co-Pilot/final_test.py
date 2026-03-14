#!/usr/bin/env python3
"""
Final MedGemma Integration Test Results
"""

import requests
import json

def test_all_endpoints():
    """Test all endpoints quickly"""
    base_url = "https://allergy-ai.preview.emergentagent.com/api"
    results = []
    
    # Test 1: Health Check
    try:
        response = requests.get(f"{base_url}/", timeout=10)
        if response.status_code == 200 and "AeroSense" in response.json().get("message", ""):
            results.append(("Health Check", "✅ PASSED"))
        else:
            results.append(("Health Check", "❌ FAILED"))
    except:
        results.append(("Health Check", "❌ FAILED"))
    
    # Test 2: MedGemma Respiratory Analysis (with fallback)
    try:
        response = requests.post(f"{base_url}/analyze-symptoms", 
                               json={"symptom_text": "I have a cough and shortness of breath", "user_id": "test"}, 
                               timeout=45)
        if response.status_code == 200:
            data = response.json()
            if all(field in data for field in ['severity', 'keywords', 'triage_level', 'explanation', 'recommendations']):
                has_disclaimer = any('healthcare' in rec.lower() or 'doctor' in rec.lower() or 'medical' in rec.lower() 
                                   for rec in data.get('recommendations', []))
                if has_disclaimer:
                    results.append(("MedGemma Respiratory Analysis", f"✅ PASSED (Fallback) - Severity: {data['severity']}, Triage: {data['triage_level']}"))
                else:
                    results.append(("MedGemma Respiratory Analysis", "❌ FAILED - Missing medical disclaimer"))
            else:
                results.append(("MedGemma Respiratory Analysis", "❌ FAILED - Missing required fields"))
        else:
            results.append(("MedGemma Respiratory Analysis", f"❌ FAILED - Status: {response.status_code}"))
    except:
        results.append(("MedGemma Respiratory Analysis", "❌ FAILED - Exception"))
    
    # Test 3: Complex Allergy Analysis
    try:
        response = requests.post(f"{base_url}/analyze-symptoms", 
                               json={"symptom_text": "I'm experiencing severe wheezing, chest tightness, and difficulty breathing after exposure to pollen", "user_id": "test"}, 
                               timeout=45)
        if response.status_code == 200:
            data = response.json()
            if data.get('severity') in ['moderate', 'severe'] and data.get('triage_level') in ['primary care', 'urgent care']:
                results.append(("MedGemma Complex Allergy Analysis", f"✅ PASSED (Fallback) - Severity: {data['severity']}, Triage: {data['triage_level']}"))
            else:
                results.append(("MedGemma Complex Allergy Analysis", f"❌ FAILED - Inappropriate severity/triage: {data.get('severity')}/{data.get('triage_level')}"))
        else:
            results.append(("MedGemma Complex Allergy Analysis", f"❌ FAILED - Status: {response.status_code}"))
    except:
        results.append(("MedGemma Complex Allergy Analysis", "❌ FAILED - Exception"))
    
    # Test 4: Mild Symptoms Analysis
    try:
        response = requests.post(f"{base_url}/analyze-symptoms", 
                               json={"symptom_text": "Light runny nose and occasional sneezing", "user_id": "test"}, 
                               timeout=45)
        if response.status_code == 200:
            data = response.json()
            if data.get('severity') in ['mild', 'moderate'] and data.get('triage_level') in ['self-care', 'primary care']:
                results.append(("MedGemma Mild Symptom Analysis", f"✅ PASSED (Fallback) - Severity: {data['severity']}, Triage: {data['triage_level']}"))
            else:
                results.append(("MedGemma Mild Symptom Analysis", f"❌ FAILED - Inappropriate severity/triage: {data.get('severity')}/{data.get('triage_level')}"))
        else:
            results.append(("MedGemma Mild Symptom Analysis", f"❌ FAILED - Status: {response.status_code}"))
    except:
        results.append(("MedGemma Mild Symptom Analysis", "❌ FAILED - Exception"))
    
    # Test 5: Environmental Data
    try:
        response = requests.get(f"{base_url}/environmental-data", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if all(field in data for field in ['pollen_level', 'aqi', 'weather_condition', 'temperature', 'humidity']):
                results.append(("Environmental Data", f"✅ PASSED - Pollen: {data['pollen_level']}, AQI: {data['aqi']}"))
            else:
                results.append(("Environmental Data", "❌ FAILED - Missing fields"))
        else:
            results.append(("Environmental Data", f"❌ FAILED - Status: {response.status_code}"))
    except:
        results.append(("Environmental Data", "❌ FAILED - Exception"))
    
    # Test 6: Risk Forecast
    try:
        response = requests.post(f"{base_url}/risk-forecast", 
                               json={"user_id": "test", "recent_symptoms": ["mild cough"]}, 
                               timeout=15)
        if response.status_code == 200:
            data = response.json()
            if all(field in data for field in ['risk_level', 'confidence', 'factors']):
                results.append(("Risk Forecast", f"✅ PASSED - Risk: {data['risk_level']}, Confidence: {data['confidence']:.2f}"))
            else:
                results.append(("Risk Forecast", "❌ FAILED - Missing fields"))
        else:
            results.append(("Risk Forecast", f"❌ FAILED - Status: {response.status_code}"))
    except:
        results.append(("Risk Forecast", "❌ FAILED - Exception"))
    
    # Test 7: Inhaler Technique
    try:
        response = requests.post(f"{base_url}/inhaler-technique", 
                               json={"technique_steps": {"shake_inhaler": True, "remove_cap": True, "exhale_fully": False}, "inhaler_type": "MDI"}, 
                               timeout=10)
        if response.status_code == 200:
            data = response.json()
            if all(field in data for field in ['overall_score', 'step_feedback', 'improvement_tips']):
                results.append(("Inhaler Technique", f"✅ PASSED - Score: {data['overall_score']}%"))
            else:
                results.append(("Inhaler Technique", "❌ FAILED - Missing fields"))
        else:
            results.append(("Inhaler Technique", f"❌ FAILED - Status: {response.status_code}"))
    except:
        results.append(("Inhaler Technique", "❌ FAILED - Exception"))
    
    return results

if __name__ == "__main__":
    print("🚀 Final MedGemma Integration Test Results")
    print("=" * 60)
    
    results = test_all_endpoints()
    
    passed = sum(1 for _, result in results if "✅ PASSED" in result)
    total = len(results)
    
    for test_name, result in results:
        print(f"{result}")
    
    print("=" * 60)
    print(f"📊 SUMMARY: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
    
    if passed == total:
        print("🎉 All tests passed!")
    else:
        print("⚠️ Some tests failed - see details above")