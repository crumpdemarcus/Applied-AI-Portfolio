import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  AlertTriangle, 
  Phone, 
  Clock, 
  Users, 
  Lock,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function Safety() {
  const emergencyNumbers = [
    { service: "Emergency Services", number: "911", description: "Life-threatening emergencies" },
    { service: "Poison Control", number: "1-800-222-1222", description: "Poisoning emergencies" },
    { service: "Crisis Text Line", number: "Text HOME to 741741", description: "Mental health support" }
  ];

  const whenToSeekCare = [
    {
      urgency: "Emergency (Call 911)",
      color: "border-red-500 bg-red-50",
      icon: AlertTriangle,
      iconColor: "text-red-600",
      symptoms: [
        "Severe difficulty breathing",
        "Unable to speak in full sentences",
        "Bluish lips or face", 
        "Chest pain with breathing problems",
        "Fainting or loss of consciousness"
      ]
    },
    {
      urgency: "Urgent Care (Same Day)",
      color: "border-yellow-500 bg-yellow-50", 
      icon: Clock,
      iconColor: "text-yellow-600",
      symptoms: [
        "Worsening breathing despite medications",
        "Persistent cough with fever",
        "Wheezing that doesn't improve with rescue inhaler",
        "Significant change in symptom patterns"
      ]
    },
    {
      urgency: "Primary Care (Schedule Appointment)",
      color: "border-green-500 bg-green-50",
      icon: Users,
      iconColor: "text-green-600", 
      symptoms: [
        "Mild breathing changes",
        "Questions about medications",
        "Routine symptom management",
        "Preventive care and planning"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-teal-600" />
          Safety & Guidelines
        </h1>
        <p className="text-slate-600">
          Important information about using AeroSense safely and responsibly
        </p>
      </div>

      {/* Main Safety Alert */}
      <Alert className="mb-8 border-red-200 bg-red-50">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong className="text-lg block mb-2">Medical Disclaimer</strong>
          AeroSense is an educational tool only. It does not provide medical diagnosis, treatment recommendations, or replace professional healthcare advice. Always consult qualified healthcare providers for medical decisions.
        </AlertDescription>
      </Alert>

      {/* Emergency Numbers */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-red-700 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {emergencyNumbers.map((contact, index) => (
              <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                <h3 className="font-semibold text-red-900">{contact.service}</h3>
                <p className="text-2xl font-bold text-red-700 my-2">{contact.number}</p>
                <p className="text-sm text-red-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* When to Seek Care */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">When to Seek Medical Care</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {whenToSeekCare.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className={`p-6 border-2 rounded-lg ${category.color}`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${category.iconColor}`}>
                    <Icon className="w-5 h-5" />
                    {category.urgency}
                  </h3>
                  <ul className="space-y-2">
                    {category.symptoms.map((symptom, symptomIndex) => (
                      <li key={symptomIndex} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 ${category.iconColor.replace('text-', 'bg-')}`} />
                        <span className="text-slate-700">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* What AeroSense Can & Cannot Do */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-700 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              What AeroSense CAN Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Provide educational information about symptoms",
                "Track symptom patterns over time",
                "Show environmental factor correlations", 
                "Offer inhaler technique guidance",
                "Generate risk awareness insights",
                "Connect you with educational resources"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-700 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              What AeroSense CANNOT Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Diagnose medical conditions",
                "Prescribe medications",
                "Replace professional medical advice",
                "Provide emergency medical care",
                "Make treatment decisions for you",
                "Act as your healthcare provider"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Privacy & Data */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Lock className="w-6 h-6 text-slate-600" />
            Privacy & Your Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Data We Collect</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Symptom descriptions you provide</li>
                <li>• Environmental data (public sources)</li>
                <li>• Inhaler technique assessment results</li>
                <li>• App usage patterns</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Your Rights</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Your data is encrypted and secure</li>
                <li>• You control what information you share</li>
                <li>• You can delete your data anytime</li>
                <li>• We never sell personal information</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Questions or Concerns?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-slate-700 mb-2">
              If you have questions about AeroSense, privacy, or need support:
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Use the feedback button in the app</li>
              <li>• Contact your healthcare provider for medical questions</li>
              <li>• Visit our help center for technical support</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}