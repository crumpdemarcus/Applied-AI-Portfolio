import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import SymptomCheck from "./SymptomCheck";

import Safety from "./Safety";

import InhalerTechnique from "./InhalerTechnique";

import RiskForecast from "./RiskForecast";

import Triggers from "./Triggers";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    SymptomCheck: SymptomCheck,
    
    Safety: Safety,
    
    InhalerTechnique: InhalerTechnique,
    
    RiskForecast: RiskForecast,
    
    Triggers: Triggers,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/SymptomCheck" element={<SymptomCheck />} />
                
                <Route path="/Safety" element={<Safety />} />
                
                <Route path="/InhalerTechnique" element={<InhalerTechnique />} />
                
                <Route path="/RiskForecast" element={<RiskForecast />} />
                
                <Route path="/Triggers" element={<Triggers />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}