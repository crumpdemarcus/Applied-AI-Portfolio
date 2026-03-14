#!/usr/bin/env python3
"""
AeroSense Backend API Testing Suite
Tests all backend endpoints for the Asthma & Allergy AI Co-Pilot application.
"""

import requests
import json
import sys
from datetime import datetime
import time

class AeroSenseAPITester:
    def __init__(self, base_url="https://allergy-ai.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details="", response_data=None):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test_name": name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        })

    def test_health_check(self):
        """Test basic API health check"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "AeroSense" in data.get("message", ""):
                    self.log_test("Health Check", True, response_data=data)
                    return True
                else:
                    self.log_test("Health Check", False, "Invalid response message", data)
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
        return False

    def test_symptom_analysis_respiratory(self):
        """Test MedGemma symptom analysis with respiratory symptoms"""
        try:
            test_data = {
                "symptom_text": "I have a cough and shortness of breath",
                "user_id": "test-respiratory-user"
            }
            
            print("🔍 Testing MedGemma respiratory symptom analysis...")
            response = requests.post(
                f"{self.api_url}/analyze-symptoms", 
                json=test_data, 
                timeout=30,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['severity', 'keywords', 'triage_level', 'explanation', 'recommendations']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    # Validate severity levels
                    valid_severities = ['mild', 'moderate', 'severe']
                    valid_triage = ['self-care', 'primary care', 'urgent care']
                    
                    if (data['severity'].lower() in valid_severities and 
                        data['triage_level'].lower() in valid_triage and
                        isinstance(data['keywords'], list) and
                        isinstance(data['recommendations'], list)):
                        
                        # Check for medical disclaimer in recommendations
                        has_medical_disclaimer = any('healthcare' in rec.lower() or 'doctor' in rec.lower() or 'medical' in rec.lower() 
                                                   for rec in data['recommendations'])
                        
                        if has_medical_disclaimer:
                            self.log_test("MedGemma Respiratory Analysis", True, 
                                        f"Severity: {data['severity']}, Triage: {data['triage_level']}, Keywords: {len(data['keywords'])}", data)
                            return True
                        else:
                            self.log_test("MedGemma Respiratory Analysis", False, "Missing medical disclaimer in recommendations")
                    else:
                        self.log_test("MedGemma Respiratory Analysis", False, 
                                    f"Invalid values - Severity: {data['severity']}, Triage: {data['triage_level']}")
                else:
                    self.log_test("MedGemma Respiratory Analysis", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("MedGemma Respiratory Analysis", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("MedGemma Respiratory Analysis", False, f"Exception: {str(e)}")
        return False

    def test_symptom_analysis_complex_allergy(self):
        """Test MedGemma symptom analysis with complex allergy symptoms"""
        try:
            test_data = {
                "symptom_text": "I'm experiencing severe wheezing, chest tightness, and difficulty breathing after exposure to pollen",
                "user_id": "test-allergy-user"
            }
            
            print("🔍 Testing MedGemma complex allergy symptom analysis...")
            response = requests.post(
                f"{self.api_url}/analyze-symptoms", 
                json=test_data, 
                timeout=30,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['severity', 'keywords', 'triage_level', 'explanation', 'recommendations']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    # For severe symptoms, expect higher severity and appropriate triage
                    if (data['severity'].lower() in ['moderate', 'severe'] and 
                        data['triage_level'].lower() in ['primary care', 'urgent care'] and
                        len(data['keywords']) > 0 and
                        len(data['recommendations']) > 0):
                        
                        # Check for medical disclaimer
                        has_medical_disclaimer = any('healthcare' in rec.lower() or 'doctor' in rec.lower() or 'medical' in rec.lower() 
                                                   for rec in data['recommendations'])
                        
                        if has_medical_disclaimer:
                            self.log_test("MedGemma Complex Allergy Analysis", True, 
                                        f"Severity: {data['severity']}, Triage: {data['triage_level']}, Keywords: {data['keywords']}", data)
                            return True
                        else:
                            self.log_test("MedGemma Complex Allergy Analysis", False, "Missing medical disclaimer in recommendations")
                    else:
                        self.log_test("MedGemma Complex Allergy Analysis", False, 
                                    f"Inappropriate severity/triage for severe symptoms - Severity: {data['severity']}, Triage: {data['triage_level']}")
                else:
                    self.log_test("MedGemma Complex Allergy Analysis", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("MedGemma Complex Allergy Analysis", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("MedGemma Complex Allergy Analysis", False, f"Exception: {str(e)}")
        return False

    def test_symptom_analysis_mild(self):
        """Test MedGemma symptom analysis with mild symptoms"""
        try:
            test_data = {
                "symptom_text": "Light runny nose and occasional sneezing",
                "user_id": "test-mild-user"
            }
            
            print("🔍 Testing MedGemma mild symptom analysis...")
            response = requests.post(
                f"{self.api_url}/analyze-symptoms", 
                json=test_data, 
                timeout=30,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['severity', 'keywords', 'triage_level', 'explanation', 'recommendations']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    # For mild symptoms, expect mild severity and self-care or primary care triage
                    if (data['severity'].lower() in ['mild', 'moderate'] and 
                        data['triage_level'].lower() in ['self-care', 'primary care'] and
                        len(data['keywords']) > 0 and
                        len(data['recommendations']) > 0):
                        
                        # Check for medical disclaimer
                        has_medical_disclaimer = any('healthcare' in rec.lower() or 'doctor' in rec.lower() or 'medical' in rec.lower() 
                                                   for rec in data['recommendations'])
                        
                        if has_medical_disclaimer:
                            self.log_test("MedGemma Mild Symptom Analysis", True, 
                                        f"Severity: {data['severity']}, Triage: {data['triage_level']}, Keywords: {data['keywords']}", data)
                            return True
                        else:
                            self.log_test("MedGemma Mild Symptom Analysis", False, "Missing medical disclaimer in recommendations")
                    else:
                        self.log_test("MedGemma Mild Symptom Analysis", False, 
                                    f"Inappropriate severity/triage for mild symptoms - Severity: {data['severity']}, Triage: {data['triage_level']}")
                else:
                    self.log_test("MedGemma Mild Symptom Analysis", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("MedGemma Mild Symptom Analysis", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("MedGemma Mild Symptom Analysis", False, f"Exception: {str(e)}")
        return False

    def test_fallback_analysis(self):
        """Test fallback rule-based analysis when MedGemma fails"""
        try:
            # Test with empty symptom text to potentially trigger fallback
            test_data = {
                "symptom_text": "xyz invalid symptom description that might cause parsing issues with special chars @#$%",
                "user_id": "test-fallback-user"
            }
            
            print("🔍 Testing fallback analysis system...")
            response = requests.post(
                f"{self.api_url}/analyze-symptoms", 
                json=test_data, 
                timeout=30,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['severity', 'keywords', 'triage_level', 'explanation', 'recommendations']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    # Even fallback should provide valid structure
                    valid_severities = ['mild', 'moderate', 'severe']
                    valid_triage = ['self-care', 'primary care', 'urgent care']
                    
                    if (data['severity'].lower() in valid_severities and 
                        data['triage_level'].lower() in valid_triage):
                        
                        self.log_test("Fallback Analysis", True, 
                                    f"Fallback working - Severity: {data['severity']}, Triage: {data['triage_level']}", data)
                        return True
                    else:
                        self.log_test("Fallback Analysis", False, 
                                    f"Invalid fallback values - Severity: {data['severity']}, Triage: {data['triage_level']}")
                else:
                    self.log_test("Fallback Analysis", False, f"Missing fields in fallback: {missing_fields}")
            else:
                self.log_test("Fallback Analysis", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Fallback Analysis", False, f"Exception: {str(e)}")
        return False

    def test_environmental_data(self):
        """Test environmental data endpoint"""
        try:
            response = requests.get(f"{self.api_url}/environmental-data", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['pollen_level', 'aqi', 'weather_condition', 'temperature', 'humidity']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    # Validate data ranges
                    if (0 <= data['pollen_level'] <= 12 and 
                        0 <= data['aqi'] <= 500 and 
                        0 <= data['humidity'] <= 100):
                        self.log_test("Environmental Data", True, f"Pollen: {data['pollen_level']}, AQI: {data['aqi']}", data)
                        return True
                    else:
                        self.log_test("Environmental Data", False, "Data values out of expected range")
                else:
                    self.log_test("Environmental Data", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Environmental Data", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Environmental Data", False, f"Exception: {str(e)}")
        return False

    def test_environmental_history(self):
        """Test environmental history endpoint"""
        try:
            response = requests.get(f"{self.api_url}/environmental-history?days=7", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    # Check first item structure
                    first_item = data[0]
                    required_fields = ['pollen_level', 'aqi', 'weather_condition', 'temperature', 'humidity']
                    missing_fields = [field for field in required_fields if field not in first_item]
                    
                    if not missing_fields:
                        self.log_test("Environmental History", True, f"Retrieved {len(data)} days of data")
                        return True
                    else:
                        self.log_test("Environmental History", False, f"Missing fields in history: {missing_fields}")
                else:
                    self.log_test("Environmental History", False, "Empty or invalid history data")
            else:
                self.log_test("Environmental History", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Environmental History", False, f"Exception: {str(e)}")
        return False

    def test_risk_forecast(self):
        """Test risk forecasting endpoint"""
        try:
            test_data = {
                "user_id": "test-user-123",
                "recent_symptoms": [
                    "mild coughing in the morning",
                    "slight wheezing after exercise",
                    "chest tightness during pollen season"
                ]
            }
            
            response = requests.post(
                f"{self.api_url}/risk-forecast", 
                json=test_data, 
                timeout=15,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['risk_level', 'confidence', 'factors', 'forecast_period']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    valid_risk_levels = ['low', 'medium', 'high']
                    if (data['risk_level'].lower() in valid_risk_levels and 
                        0 <= data['confidence'] <= 1):
                        self.log_test("Risk Forecast", True, f"Risk: {data['risk_level']}, Confidence: {data['confidence']:.2f}", data)
                        return True
                    else:
                        self.log_test("Risk Forecast", False, f"Invalid risk level or confidence: {data['risk_level']}, {data['confidence']}")
                else:
                    self.log_test("Risk Forecast", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Risk Forecast", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Risk Forecast", False, f"Exception: {str(e)}")
        return False

    def test_inhaler_technique(self):
        """Test inhaler technique analysis endpoint"""
        try:
            test_data = {
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
            }
            
            response = requests.post(
                f"{self.api_url}/inhaler-technique", 
                json=test_data, 
                timeout=10,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['overall_score', 'step_feedback', 'improvement_tips']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    if (0 <= data['overall_score'] <= 100 and 
                        isinstance(data['step_feedback'], dict) and 
                        isinstance(data['improvement_tips'], list)):
                        self.log_test("Inhaler Technique", True, f"Score: {data['overall_score']}%, Tips: {len(data['improvement_tips'])}", data)
                        return True
                    else:
                        self.log_test("Inhaler Technique", False, "Invalid data types or score range")
                else:
                    self.log_test("Inhaler Technique", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Inhaler Technique", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Inhaler Technique", False, f"Exception: {str(e)}")
        return False

    def test_user_history(self):
        """Test user history endpoint"""
        try:
            response = requests.get(f"{self.api_url}/user-history/test-user-123", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'symptom_analyses' in data and 'risk_forecasts' in data:
                    self.log_test("User History", True, f"Symptom analyses: {len(data['symptom_analyses'])}, Risk forecasts: {len(data['risk_forecasts'])}")
                    return True
                else:
                    self.log_test("User History", False, "Missing required history fields")
            else:
                self.log_test("User History", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("User History", False, f"Exception: {str(e)}")
        return False

    def test_cors_headers(self):
        """Test CORS headers are properly set"""
        try:
            response = requests.options(f"{self.api_url}/", timeout=10)
            headers = response.headers
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            present_headers = [h for h in cors_headers if h in headers]
            if len(present_headers) >= 1:  # At least one CORS header should be present
                self.log_test("CORS Headers", True, f"Present headers: {present_headers}")
                return True
            else:
                self.log_test("CORS Headers", False, "No CORS headers found")
        except Exception as e:
            self.log_test("CORS Headers", False, f"Exception: {str(e)}")
        return False

    def test_medical_disclaimer_header(self):
        """Test medical disclaimer header is present"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            if 'X-Medical-Disclaimer' in response.headers:
                disclaimer = response.headers['X-Medical-Disclaimer']
                if 'Educational purposes only' in disclaimer:
                    self.log_test("Medical Disclaimer Header", True, f"Disclaimer: {disclaimer}")
                    return True
                else:
                    self.log_test("Medical Disclaimer Header", False, f"Invalid disclaimer: {disclaimer}")
            else:
                self.log_test("Medical Disclaimer Header", False, "Medical disclaimer header missing")
        except Exception as e:
            self.log_test("Medical Disclaimer Header", False, f"Exception: {str(e)}")
        return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting AeroSense Backend API Tests - MedGemma Integration")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test basic connectivity first
        if not self.test_health_check():
            print("❌ Health check failed - stopping tests")
            return self.generate_report()
        
        # MedGemma Integration Tests (Primary Focus)
        print("\n🧠 Testing MedGemma Integration...")
        self.test_symptom_analysis_respiratory()
        time.sleep(2)  # Allow time for MedGemma API calls
        
        self.test_symptom_analysis_complex_allergy()
        time.sleep(2)
        
        self.test_symptom_analysis_mild()
        time.sleep(2)
        
        self.test_fallback_analysis()
        time.sleep(1)
        
        # Other API Endpoints (Verify they still work)
        print("\n🌍 Testing Other Endpoints...")
        self.test_environmental_data()
        self.test_environmental_history()
        
        time.sleep(1)
        self.test_risk_forecast()
        
        time.sleep(1)
        self.test_inhaler_technique()
        
        self.test_user_history()
        
        # Infrastructure tests
        print("\n🔧 Testing Infrastructure...")
        self.test_cors_headers()
        self.test_medical_disclaimer_header()
        
        return self.generate_report()

    def generate_report(self):
        """Generate final test report"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed - check details above")
            
            # Show failed tests
            failed_tests = [t for t in self.test_results if not t['success']]
            if failed_tests:
                print("\n❌ Failed Tests:")
                for test in failed_tests:
                    print(f"  - {test['test_name']}: {test['details']}")
            
            return 1

def main():
    """Main test execution"""
    tester = AeroSenseAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())