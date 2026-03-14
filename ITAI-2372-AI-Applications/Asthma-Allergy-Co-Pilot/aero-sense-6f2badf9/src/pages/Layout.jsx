

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Activity, 
  CloudRain, 
  TrendingUp, 
  Video, 
  Shield,
  Home,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * AeroSense Layout Component
 * This component provides the main structure for all pages in the app.
 * It includes a persistent medical disclaimer, a header with navigation,
 * and a footer. It ensures a consistent look and feel across the application.
 */
export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  // State to manage the visibility of the navigation menu on mobile devices.
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Defines the navigation links, their corresponding page paths, and icons.
  // This array drives the navigation menu in both desktop and mobile views.
  const navigationItems = [
    { name: "Home", path: "Dashboard", icon: Home },
    { name: "Symptom Check", path: "SymptomCheck", icon: Activity },
    { name: "Triggers", path: "Triggers", icon: CloudRain }, 
    { name: "Risk", path: "RiskForecast", icon: TrendingUp },
    { name: "Technique", path: "InhalerTechnique", icon: Video },
    { name: "Safety", path: "Safety", icon: Shield }
  ];

  // Helper function to determine if a navigation link is the currently active page.
  const isActivePage = (path) => location.pathname === createPageUrl(path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 
        A persistent, always-visible medical disclaimer banner at the top of the app.
        This is a critical safety feature to remind users of the app's educational nature.
      */}
      <div className="bg-teal-600 text-white px-4 py-2 text-center text-sm font-medium">
        <Shield className="w-4 h-4 inline mr-2" />
        Educational companion only. Not a substitute for professional medical advice.
      </div>

      {/* Header section containing the app logo and navigation. */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">AeroSense</h1>
                <p className="text-xs text-slate-500">AI Health Companion</p>
              </div>
            </div>

            {/* Desktop Navigation: Hidden on smaller screens. */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActivePage(item.path)
                      ? "bg-teal-100 text-teal-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button: Toggles the mobile navigation visibility. */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu: Conditionally rendered based on mobileMenuOpen state. */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActivePage(item.path)
                      ? "bg-teal-100 text-teal-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area: Renders the content of the current page. */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer section with a summary disclaimer and app info. */}
      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Activity className="w-5 h-5 text-teal-600" />
              <span className="font-semibold text-slate-900">AeroSense</span>
              <span className="text-slate-500">|</span>
              <span className="text-sm text-slate-500">AI Health Companion</span>
            </div>
            <div className="text-xs text-slate-500 text-center md:text-right">
              Always consult healthcare professionals for medical decisions.<br/>
              This app provides educational information only.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

