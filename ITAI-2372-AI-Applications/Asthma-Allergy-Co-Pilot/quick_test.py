#!/usr/bin/env python3
"""
Quick test for MedGemma integration and fallback system
"""

import requests
import json

def test_symptom_analysis():
    """Test symptom analysis with fallback"""
    url = "https://allergy-ai.preview.emergentagent.com/api/analyze-symptoms"
    
    test_cases = [
        {
            "name": "Simple respiratory symptoms",
            "data": {
                "symptom_text": "I have a cough and shortness of breath",
                "user_id": "test-respiratory"
            }
        },
        {
            "name": "Complex allergy symptoms", 
            "data": {
                "symptom_text": "I'm experiencing severe wheezing, chest tightness, and difficulty breathing after exposure to pollen",
                "user_id": "test-allergy"
            }
        },
        {
            "name": "Mild symptoms",
            "data": {
                "symptom_text": "Light runny nose and occasional sneezing",
                "user_id": "test-mild"
            }
        }
    ]
    
    for test_case in test_cases:
        print(f"\n🔍 Testing: {test_case['name']}")
        try:
            response = requests.post(url, json=test_case['data'], timeout=60)
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Success - Severity: {data.get('severity')}, Triage: {data.get('triage_level')}")
                print(f"   Keywords: {data.get('keywords', [])}")
                print(f"   Recommendations: {len(data.get('recommendations', []))} items")
                
                # Check for medical disclaimer
                has_disclaimer = any('healthcare' in rec.lower() or 'doctor' in rec.lower() or 'medical' in rec.lower() 
                                   for rec in data.get('recommendations', []))
                print(f"   Medical disclaimer: {'✅' if has_disclaimer else '❌'}")
                
            else:
                print(f"❌ Failed - Status: {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                
        except requests.exceptions.Timeout:
            print("❌ Timeout - MedGemma API may be unavailable, checking if fallback worked...")
        except Exception as e:
            print(f"❌ Error: {str(e)}")

def test_other_endpoints():
    """Test other endpoints to ensure they still work"""
    base_url = "https://allergy-ai.preview.emergentagent.com/api"
    
    endpoints = [
        ("Environmental Data", f"{base_url}/environmental-data"),
        ("Risk Forecast", f"{base_url}/risk-forecast"),
        ("Inhaler Technique", f"{base_url}/inhaler-technique")
    ]
    
    print("\n🌍 Testing Other Endpoints...")
    
    for name, url in endpoints:
        try:
            if "risk-forecast" in url:
                response = requests.post(url, json={
                    "user_id": "test-user",
                    "recent_symptoms": ["mild cough", "occasional wheeze"]
                }, timeout=10)
            elif "inhaler-technique" in url:
                response = requests.post(url, json={
                    "technique_steps": {
                        "shake_inhaler": True,
                        "remove_cap": True,
                        "exhale_fully": False,
                        "seal_lips": True,
                        "press_breathe": True,
                        "hold_breath": False,
                        "exhale_slowly": True
                    },
                    "inhaler_type": "MDI"
                }, timeout=10)
            else:
                response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                print(f"✅ {name} - Working")
            else:
                print(f"❌ {name} - Status: {response.status_code}")
                
        except Exception as e:
            print(f"❌ {name} - Error: {str(e)}")

if __name__ == "__main__":
    print("🚀 Quick MedGemma Integration Test")
    print("=" * 50)
    
    test_symptom_analysis()
    test_other_endpoints()
    
    print("\n" + "=" * 50)
    print("Test completed!")