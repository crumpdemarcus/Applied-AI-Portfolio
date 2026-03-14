/**
 * AeroSense - Asthma & Allergy AI Co-Pilot
 * Main React application providing educational support for asthma and allergy management.
 * 
 * Features:
 * - Symptom interpretation and educational guidance
 * - Environmental trigger monitoring
 * - Risk forecasting for exacerbation prediction
 * - Inhaler technique education and analysis
 * - Comprehensive safety and ethics guidelines
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { 
  Stethoscope, 
  Cloud, 
  AlertTriangle, 
  Zap, 
  Shield, 
  Home,
  Menu,
  X,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Calendar,
  Upload,
  Play
} from 'lucide-react';
import './App.css';

// Import Shadcn components
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Textarea } from './components/ui/textarea';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { Alert, AlertDescription } from './components/ui/alert';
import { Switch } from './components/ui/switch';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/**
 * Navigation Component
 * Mobile-first responsive navigation with tab switching
 */
const Navigation = ({ activeTab, setActiveTab, darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'symptoms', label: 'Symptom Check', icon: Stethoscope },
    { id: 'triggers', label: 'Triggers', icon: Cloud },
    { id: 'risk', label: 'Risk', icon: AlertTriangle },
    { id: 'technique', label: 'Technique', icon: Zap },
    { id: 'safety', label: 'Safety', icon: Shield }
  ];

  return (
    <>
      {/* Medical Disclaimer Banner */}
      <div className="bg-amber-50 dark:bg-amber-900 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
        <p className="text-sm text-amber-800 dark:text-amber-200 text-center font-medium">
          📋 Educational companion. Not a substitute for professional medical advice.
        </p>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">AeroSense</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Asthma & Allergy Co-Pilot</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">🌙</span>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
                data-testid="dark-mode-toggle"
              />
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mt-4 space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className="flex items-center space-x-2"
                onClick={() => setActiveTab(item.id)}
                data-testid={`nav-${item.id}`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className="w-full justify-start flex items-center space-x-2"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  data-testid={`mobile-nav-${item.id}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>
        )}
      </header>
    </>
  );
};

/**
 * Home Page Component
 * Welcome screen with app overview and quick actions
 */
const HomePage = ({ setActiveTab }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-2xl p-8">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Your AI-Powered
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Respiratory Health</span> Companion
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Get real-time insights, environmental intelligence, and educational guidance for better asthma and allergy management.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => setActiveTab('symptoms')} 
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  data-testid="get-started-button"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Check Symptoms
                </Button>
                <Button 
                  onClick={() => setActiveTab('triggers')} 
                  variant="outline" 
                  size="lg"
                  data-testid="view-triggers-button"
                >
                  <Cloud className="w-5 h-5 mr-2" />
                  View Triggers
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYXBwfGVufDB8fHx8MTc1ODg1ODY4N3ww&ixlib=rb-4.1.0&q=85"
                alt="Healthcare professional with technology"
                className="w-64 h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Stethoscope,
            title: 'Symptom Analysis',
            description: 'AI-powered interpretation of your symptoms with educational guidance',
            action: () => setActiveTab('symptoms'),
            color: 'from-blue-500 to-cyan-600'
          },
          {
            icon: Cloud,
            title: 'Environmental Triggers',
            description: 'Real-time pollen, air quality, and weather monitoring',
            action: () => setActiveTab('triggers'),
            color: 'from-green-500 to-emerald-600'
          },
          {
            icon: AlertTriangle,
            title: 'Risk Forecasting',
            description: '72-hour exacerbation risk prediction with confidence scores',
            action: () => setActiveTab('risk'),
            color: 'from-orange-500 to-red-500'
          },
          {
            icon: Zap,
            title: 'Inhaler Technique',
            description: 'Step-by-step technique analysis and improvement tips',
            action: () => setActiveTab('technique'),
            color: 'from-purple-500 to-pink-600'
          }
        ].map((feature, index) => (
          <Card 
            key={index} 
            className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
            onClick={feature.action}
            data-testid={`feature-card-${index}`}
          >
            <CardHeader className="text-center pb-2">
              <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-3`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Today's Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">Good</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Air Quality Status</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Pollen Levels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Low</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Risk Forecast</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Symptoms Page Component
 * Symptom analysis using LLM with educational guidance
 */
const SymptomsPage = () => {
  const [symptomText, setSymptomText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentAnalyses, setRecentAnalyses] = useState([]);

  /**
   * Analyze user symptoms using Gemini LLM
   * Extracts clinical keywords and provides educational triage
   */
  const analyzeSymptoms = async () => {
    if (!symptomText.trim()) {
      toast.error('Please describe your symptoms');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/analyze-symptoms`, {
        symptom_text: symptomText,
        user_id: 'demo-user'
      });
      
      setAnalysis(response.data);
      setRecentAnalyses(prev => [response.data, ...prev.slice(0, 4)]);
      toast.success('Symptoms analyzed successfully');
    } catch (error) {
      console.error('Symptom analysis error:', error);
      toast.error('Error analyzing symptoms. Please try again.');
    }
    setLoading(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'moderate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'severe': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Stethoscope className="w-8 h-8 text-emerald-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Symptom Analysis</h2>
          <p className="text-slate-600 dark:text-slate-400">Describe your symptoms for educational guidance</p>
        </div>
      </div>

      {/* Symptom Input */}
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling?</CardTitle>
          <CardDescription>
            Describe your symptoms in your own words. Be as detailed as possible for better analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Example: I've been having wheezing and coughing all night, especially when lying down..."
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            className="min-h-32"
            data-testid="symptom-textarea"
          />
          <Button 
            onClick={analyzeSymptoms} 
            disabled={loading}
            className="w-full md:w-auto"
            data-testid="analyze-symptoms-button"
          >
            {loading ? (
              <>
                <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                Analyzing...
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4 mr-2" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card className="animate-in fade-in duration-500" data-testid="analysis-results">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Analysis Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Severity Level</h4>
                <Badge className={getSeverityColor(analysis.severity)}>
                  {analysis.severity.toUpperCase()}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recommended Care Level</h4>
                <Badge variant="outline">{analysis.triage_level}</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Clinical Keywords Identified</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">{keyword}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Educational Explanation</h4>
              <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                {analysis.explanation}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Educational Recommendations</h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Alert>
              <Shield className="w-4 h-4" />
              <AlertDescription>
                This analysis is for educational purposes only. Always consult with healthcare professionals for medical advice.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Recent Analyses */}
      {recentAnalyses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAnalyses.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <Badge className={getSeverityColor(item.severity)} size="sm">
                      {item.severity}
                    </Badge>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {item.triage_level}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

/**
 * Environmental Triggers Page Component
 * Real-time environmental data with trigger correlation
 */
const TriggersPage = () => {
  const [environmentalData, setEnvironmentalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchEnvironmentalData();
  }, []);

  /**
   * Fetch current environmental trigger data
   * Includes pollen, air quality, and weather conditions
   */
  const fetchEnvironmentalData = async () => {
    try {
      const [currentResponse, historyResponse] = await Promise.all([
        axios.get(`${API}/environmental-data`),
        axios.get(`${API}/environmental-history?days=7`)
      ]);
      
      setEnvironmentalData(currentResponse.data);
      setHistory(historyResponse.data);
    } catch (error) {
      console.error('Error fetching environmental data:', error);
      toast.error('Error loading environmental data');
    }
    setLoading(false);
  };

  const getTriggerLevel = (value, thresholds) => {
    if (value >= thresholds.high) return { level: 'High', color: 'text-red-600 bg-red-100 dark:bg-red-900' };
    if (value >= thresholds.medium) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900' };
    return { level: 'Low', color: 'text-green-600 bg-green-100 dark:bg-green-900' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Cloud className="w-8 h-8 text-emerald-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Environmental Triggers</h2>
          <p className="text-slate-600 dark:text-slate-400">Monitor conditions that may affect your symptoms</p>
        </div>
      </div>

      {/* Current Conditions */}
      {environmentalData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pollen Card */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-xl">🌾</span>
              </div>
              <CardTitle className="text-lg">Pollen</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300 mb-1">
                {environmentalData.pollen_level}/12
              </div>
              <Badge className={getTriggerLevel(environmentalData.pollen_level, {high: 8, medium: 5}).color}>
                {getTriggerLevel(environmentalData.pollen_level, {high: 8, medium: 5}).level}
              </Badge>
            </CardContent>
          </Card>

          {/* Air Quality Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-2">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Air Quality</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                {environmentalData.aqi}
              </div>
              <Badge className={getTriggerLevel(environmentalData.aqi, {high: 101, medium: 51}).color}>
                {getTriggerLevel(environmentalData.aqi, {high: 101, medium: 51}).level}
              </Badge>
            </CardContent>
          </Card>

          {/* Weather Card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-2">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Weather</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-lg font-semibold text-green-700 dark:text-green-300 mb-1">
                {environmentalData.weather_condition}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {environmentalData.temperature}°C
              </div>
            </CardContent>
          </Card>

          {/* Humidity Card */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 mx-auto bg-purple-500 rounded-full flex items-center justify-center mb-2">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Humidity</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">
                {environmentalData.humidity}%
              </div>
              <Badge className={getTriggerLevel(environmentalData.humidity, {high: 70, medium: 50}).color}>
                {getTriggerLevel(environmentalData.humidity, {high: 70, medium: 50}).level}
              </Badge>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 7-Day Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>7-Day Environmental Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.slice(0, 7).map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400 w-20">
                    {new Date(day.timestamp).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-sm">🌾 {day.pollen_level}/12</span>
                    <span className="text-sm">💨 AQI {day.aqi}</span>
                    <span className="text-sm">🌡️ {day.temperature}°C</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {day.weather_condition}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trigger Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Today's Trigger Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {environmentalData && (
              <>
                {environmentalData.pollen_level > 6 && (
                  <Alert>
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription>
                      High pollen levels detected. Consider staying indoors during peak hours (10 AM - 4 PM).
                    </AlertDescription>
                  </Alert>
                )}
                {environmentalData.aqi > 100 && (
                  <Alert>
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription>
                      Poor air quality. Limit outdoor activities and ensure windows are closed.
                    </AlertDescription>
                  </Alert>
                )}
                {environmentalData.weather_condition.includes('Windy') && (
                  <Alert>
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>
                      Windy conditions may increase airborne allergens. Take precautions if sensitive.
                    </AlertDescription>
                  </Alert>
                )}
                {environmentalData.pollen_level <= 6 && environmentalData.aqi <= 100 && !environmentalData.weather_condition.includes('Windy') && (
                  <Alert>
                    <CheckCircle className="w-4 h-4" />
                    <AlertDescription>
                      Favorable conditions today! Good time for outdoor activities with proper precautions.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Risk Forecast Page Component
 * 72-hour exacerbation risk prediction with confidence scoring
 */
const RiskPage = () => {
  const [riskForecast, setRiskForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSymptoms, setRecentSymptoms] = useState([
    'mild coughing in the morning',
    'occasional wheezing during exercise'
  ]);

  /**
   * Generate risk forecast based on symptoms and environmental factors
   * Uses simple predictive modeling with confidence scoring
   */
  const generateRiskForecast = async () => {
    if (recentSymptoms.length === 0) {
      toast.error('Please add some recent symptoms for accurate forecasting');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/risk-forecast`, {
        user_id: 'demo-user',
        recent_symptoms: recentSymptoms
      });
      
      setRiskForecast(response.data);
      toast.success('Risk forecast generated successfully');
    } catch (error) {
      console.error('Risk forecast error:', error);
      toast.error('Error generating risk forecast');
    }
    setLoading(false);
  };

  useEffect(() => {
    generateRiskForecast();
  }, []);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', icon: '🟢' };
      case 'medium': return { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-200', icon: '🟡' };
      case 'high': return { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200', icon: '🔴' };
      default: return { bg: 'bg-slate-100 dark:bg-slate-900', text: 'text-slate-800 dark:text-slate-200', icon: '⚪' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-emerald-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Risk Forecast</h2>
          <p className="text-slate-600 dark:text-slate-400">72-hour exacerbation risk prediction</p>
        </div>
      </div>

      {/* Risk Forecast Results */}
      {riskForecast && (
        <div className="space-y-6">
          {/* Main Risk Display */}
          <Card className={`${getRiskColor(riskForecast.risk_level).bg} border-2`}>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">
                {getRiskColor(riskForecast.risk_level).icon}
              </div>
              <h3 className={`text-3xl font-bold mb-2 ${getRiskColor(riskForecast.risk_level).text}`}>
                {riskForecast.risk_level.toUpperCase()} RISK
              </h3>
              <p className={`text-lg mb-4 ${getRiskColor(riskForecast.risk_level).text}`}>
                {riskForecast.forecast_period} forecast
              </p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Confidence:</span>
                <Badge variant="outline">
                  {Math.round(riskForecast.confidence * 100)}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Contributing Risk Factors</CardTitle>
              <CardDescription>
                Factors influencing your current risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskForecast.factors.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{factor}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Confidence Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Confidence & Uncertainty</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Prediction Confidence</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {Math.round(riskForecast.confidence * 100)}%
                    </span>
                  </div>
                  <Progress value={riskForecast.confidence * 100} className="h-2" />
                </div>
                <Alert>
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    This prediction is based on current symptoms and environmental factors. 
                    Confidence levels reflect data quality and model certainty. Always monitor 
                    your symptoms and consult healthcare providers for concerning changes.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Action Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskForecast.risk_level.toLowerCase() === 'high' && (
                  <>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-800 dark:text-red-200">High Risk Detected</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Consider contacting your healthcare provider and having your rescue inhaler readily available.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Monitor Closely</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Track symptoms more frequently and avoid known triggers.
                        </p>
                      </div>
                    </div>
                  </>
                )}
                
                {riskForecast.risk_level.toLowerCase() === 'medium' && (
                  <>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-yellow-800 dark:text-yellow-200">Moderate Risk</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Be prepared with your rescue inhaler and monitor symptoms.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Eye className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Stay Vigilant</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Check environmental conditions and avoid unnecessary exposure to triggers.
                        </p>
                      </div>
                    </div>
                  </>
                )}
                
                {riskForecast.risk_level.toLowerCase() === 'low' && (
                  <>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-200">Low Risk Period</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Good time for regular activities with standard precautions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Maintain Routine</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Continue regular medication schedule and monitor symptoms.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <Button 
          onClick={generateRiskForecast} 
          disabled={loading}
          variant="outline"
          data-testid="refresh-forecast-button"
        >
          {loading ? 'Generating...' : 'Refresh Forecast'}
        </Button>
      </div>
    </div>
  );
};

/**
 * Inhaler Technique Page Component
 * Educational inhaler technique analysis with step-by-step feedback
 */
const TechniquePage = () => {
  const [techniqueData, setTechniqueData] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inhalerType, setInhalerType] = useState('MDI');

  // Proper technique steps for different inhaler types
  const techniqueSteps = {
    MDI: [
      { key: 'shake_inhaler', label: 'Shake inhaler vigorously for 3-5 seconds', description: 'Ensures proper mixing of medication' },
      { key: 'remove_cap', label: 'Remove protective cap and check for obstructions', description: 'Clear airway for medication delivery' },
      { key: 'exhale_fully', label: 'Exhale fully, away from inhaler', description: 'Creates space in lungs for medication' },
      { key: 'seal_lips', label: 'Form tight seal around mouthpiece with lips', description: 'Prevents medication loss' },
      { key: 'press_breathe', label: 'Press down and breathe in slowly and deeply', description: 'Delivers medication to lungs' },
      { key: 'hold_breath', label: 'Hold breath for 10 seconds or as comfortable', description: 'Allows medication to deposit in airways' },
      { key: 'exhale_slowly', label: 'Exhale slowly and replace cap', description: 'Complete the medication cycle' }
    ]
  };

  /**
   * Analyze inhaler technique using rule-based educational system
   * Provides step-by-step feedback and improvement tips
   */
  const analyzeTechnique = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/inhaler-technique`, {
        technique_steps: techniqueData,
        inhaler_type: inhalerType
      });
      
      setAnalysis(response.data);
      toast.success('Technique analyzed successfully');
    } catch (error) {
      console.error('Technique analysis error:', error);
      toast.error('Error analyzing inhaler technique');
    }
    setLoading(false);
  };

  const handleStepChange = (stepKey, value) => {
    setTechniqueData(prev => ({
      ...prev,
      [stepKey]: value
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="w-8 h-8 text-emerald-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Inhaler Technique</h2>
          <p className="text-slate-600 dark:text-slate-400">Educational analysis and improvement tips</p>
        </div>
      </div>

      {/* Demo Video Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Proper Technique Demonstration</span>
          </CardTitle>
          <CardDescription>
            Watch this demonstration of proper MDI (Metered Dose Inhaler) technique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
            <img 
              src="https://images.unsplash.com/photo-1733751682743-8f46e457149e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxyZXNwaXJhdG9yeSUyMGhlYWx0aHxlbnwwfHx8fDE3NTg4NTg2OTd8MA&ixlib=rb-4.1.0&q=85"
              alt="Proper inhaler technique demonstration"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <Alert>
            <Play className="w-4 h-4" />
            <AlertDescription>
              In a real implementation, this would show a video demonstration of proper inhaler technique. 
              For now, the image shows proper positioning and form.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Technique Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Technique Self-Assessment</CardTitle>
          <CardDescription>
            Check each step you performed correctly during your last inhaler use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {techniqueSteps[inhalerType].map((step, index) => (
            <div key={step.key} className="flex items-start space-x-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  id={step.key}
                  checked={techniqueData[step.key] || false}
                  onChange={(e) => handleStepChange(step.key, e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded"
                  data-testid={`step-${step.key}`}
                />
                <div className="flex-1">
                  <label htmlFor={step.key} className="font-medium text-slate-900 dark:text-white cursor-pointer">
                    {index + 1}. {step.label}
                  </label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={analyzeTechnique} 
            disabled={loading || Object.keys(techniqueData).length === 0}
            className="w-full"
            data-testid="analyze-technique-button"
          >
            {loading ? (
              <>
                <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                Analyzing Technique...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Analyze My Technique
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card className="animate-in fade-in duration-500" data-testid="technique-analysis-results">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Technique Analysis Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.overall_score)}`}>
                {analysis.overall_score}%
              </div>
              <div className="text-lg font-medium text-slate-700 dark:text-slate-300">
                Overall Technique Score
              </div>
              <Progress value={analysis.overall_score} className="mt-4" />
            </div>

            {/* Step-by-Step Feedback */}
            <div>
              <h4 className="font-semibold mb-4">Step-by-Step Feedback</h4>
              <div className="space-y-3">
                {Object.entries(analysis.step_feedback).map(([step, feedback]) => {
                  const isCorrect = feedback.includes('✅');
                  const needsWork = feedback.includes('⚠️');
                  const missing = feedback.includes('❌');
                  
                  return (
                    <div key={step} className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {needsWork && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                        {missing && <XCircle className="w-5 h-5 text-red-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 dark:text-white capitalize">
                          {step.replace('_', ' ')}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {feedback.replace(/[✅⚠️❌]/g, '').trim()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Improvement Tips */}
            <div>
              <h4 className="font-semibold mb-4">Improvement Tips</h4>
              <div className="space-y-3">
                {analysis.improvement_tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Resources */}
            <Alert>
              <Shield className="w-4 h-4" />
              <AlertDescription>
                <strong>Remember:</strong> Proper inhaler technique is crucial for effective medication delivery. 
                If you're having trouble with any steps, consider asking your healthcare provider or pharmacist 
                for a demonstration during your next visit.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Upload Section (Demo) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Video Analysis (Demo Mode)</span>
          </CardTitle>
          <CardDescription>
            Upload a video of your inhaler technique for AI-powered analysis (Feature in development)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Video analysis feature coming soon! For now, use the self-assessment checklist above.
            </p>
            <Button variant="outline" disabled>
              <Upload className="w-4 h-4 mr-2" />
              Upload Video (Demo)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Safety & Ethics Page Component
 * Comprehensive safety guidelines, privacy policy, and ethical considerations
 */
const SafetyPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-8 h-8 text-emerald-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Safety & Ethics</h2>
          <p className="text-slate-600 dark:text-slate-400">Important information about app usage and limitations</p>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
        <CardHeader>
          <CardTitle className="text-amber-800 dark:text-amber-200 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Important Medical Disclaimer</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-800 dark:text-amber-200 space-y-3">
          <p className="font-semibold text-lg">
            AeroSense is an educational companion and is NOT a medical device or diagnostic tool.
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>This app does not diagnose, treat, cure, or prevent any medical condition</li>
            <li>All information provided is for educational purposes only</li>
            <li>Always consult qualified healthcare professionals for medical advice</li>
            <li>In case of medical emergency, call emergency services immediately</li>
            <li>Do not change medication or treatment plans based on app recommendations</li>
          </ul>
        </CardContent>
      </Card>

      {/* When to Seek Care */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>When to Seek Immediate Medical Care</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                <strong>Call Emergency Services (911) Immediately if you experience:</strong>
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 dark:text-red-400">Severe Breathing Difficulty</h4>
                <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                  <li>• Unable to speak in full sentences</li>
                  <li>• Severe chest tightness or pain</li>
                  <li>• Bluish lips or fingernails</li>
                  <li>• Extreme difficulty breathing</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 dark:text-red-400">Emergency Signs</h4>
                <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                  <li>• Rescue inhaler not providing relief</li>
                  <li>• Severe allergic reaction (anaphylaxis)</li>
                  <li>• Loss of consciousness</li>
                  <li>• Confusion or inability to think clearly</li>
                </ul>
              </div>
            </div>

            <Alert>
              <Shield className="w-4 h-4" />
              <AlertDescription>
                <strong>Contact Your Healthcare Provider for:</strong> Worsening symptoms, 
                increased medication use, new or concerning symptoms, or questions about your treatment plan.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Privacy & Data Protection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Data Collection & Usage</h4>
            <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>• Symptom descriptions are processed for educational analysis only</li>
              <li>• Environmental data is sourced from public APIs and demo datasets</li>
              <li>• No personal health information is shared with third parties</li>
              <li>• All data is encrypted and stored securely</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Your Rights</h4>
            <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>• You can request deletion of your data at any time</li>
              <li>• You have the right to know what data is collected</li>
              <li>• You can opt out of data collection features</li>
              <li>• All processing follows healthcare data protection standards</li>
            </ul>
          </div>

          <Alert>
            <Shield className="w-4 h-4" />
            <AlertDescription>
              This app uses local processing and secure APIs. No sensitive health data 
              is permanently stored without your explicit consent.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Ethical AI Use */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Ethical AI & Technology Use</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Our AI Commitment</h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Transparency:</strong> We clearly indicate when AI is used and its limitations</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Accuracy:</strong> AI responses include confidence levels and uncertainty indicators</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Safety:</strong> All AI outputs include medical disclaimers and referral guidance</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Bias Prevention:</strong> Regular testing for demographic and clinical biases</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Technology Limitations</h4>
            <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>• AI cannot replace clinical judgment or professional assessment</li>
              <li>• Predictions are probabilistic and include uncertainty</li>
              <li>• Environmental data may have delays or inaccuracies</li>
              <li>• Individual responses to triggers vary significantly</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* App Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Responsible App Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="allowed" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="allowed">✅ Recommended Use</TabsTrigger>
              <TabsTrigger value="prohibited">❌ Not Recommended</TabsTrigger>
            </TabsList>
            
            <TabsContent value="allowed" className="space-y-3">
              <div className="space-y-2">
                {[
                  'Educational learning about asthma and allergy management',
                  'Tracking environmental conditions that may affect symptoms',
                  'Learning proper inhaler technique with healthcare provider guidance',
                  'Understanding symptom patterns for discussion with doctors',
                  'Preparing informed questions for medical appointments'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="prohibited" className="space-y-3">
              <div className="space-y-2">
                {[
                  'Self-diagnosis or replacing professional medical evaluation',
                  'Changing prescribed medications without doctor consultation',
                  'Ignoring severe symptoms or delaying emergency care',
                  'Using predictions to avoid necessary medical appointments',
                  'Sharing app analysis as medical documentation'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Contact & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Support & Feedback</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Technical Support</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                For app-related issues, bugs, or feature requests
              </p>
              <Button variant="outline" size="sm">
                Contact Technical Support
              </Button>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Medical Resources</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Links to reputable medical organizations and resources
              </p>
              <Button variant="outline" size="sm">
                View Medical Resources
              </Button>
            </div>
          </div>

          <Alert>
            <Shield className="w-4 h-4" />
            <AlertDescription>
              <strong>Version:</strong> AeroSense v1.0.0 | 
              <strong> Last Updated:</strong> {new Date().toLocaleDateString()} |
              <strong> Compliance:</strong> Educational Use Only
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Main App Component
 * Handles routing, dark mode, and overall app state management
 */
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Test backend connection on app load
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log('Backend connected:', response.data.message);
      } catch (error) {
        console.error('Backend connection error:', error);
        toast.error('Unable to connect to backend services');
      }
    };
    
    testConnection();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'symptoms':
        return <SymptomsPage />;
      case 'triggers':
        return <TriggersPage />;
      case 'risk':
        return <RiskPage />;
      case 'technique':
        return <TechniquePage />;
      case 'safety':
        return <SafetyPage />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <BrowserRouter>
          <Navigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          
          <main className="container mx-auto px-4 py-8 max-w-6xl" data-testid="main-content">
            {renderContent()}
          </main>
        </BrowserRouter>
        
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: darkMode ? '#1f2937' : '#ffffff',
              color: darkMode ? '#f9fafb' : '#111827',
              border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb'
            }
          }} 
        />
      </div>
    </div>
  );
}

export default App;