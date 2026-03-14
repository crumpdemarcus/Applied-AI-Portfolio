import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shell, ChevronDown, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import IntroSection from './components/IntroSection';
import CreatureCard from './components/CreatureCard';
import AnatomyDiagram from './components/AnatomyDiagram';
import ArchitectureFlow from './components/ArchitectureFlow';
import ApplicationsGrid from './components/ApplicationsGrid';
import EvolutionTimeline from './components/EvolutionTimeline';
import CodeSpecimen from './components/CodeSpecimen';
import TeamSection from './components/TeamSection';
import QuickReference from './components/QuickReference';
import './index.css';

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-shrimp-purple/10 via-transparent to-shrimp-teal/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCA2MCBNIDQwIDAgTCAwIDQwIE0gMjAgMCBMIDAgMjAgTSA2MCAyMCBMIDIwIDYwIE0gNjAgNDAgTCA0MCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNEVDREM0IiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-shrimp-teal/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shell className="w-24 h-24 md:w-32 md:h-32 text-shrimp-teal" />
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-shrimp-hot-pink animate-pulse" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
        >
          <span className="gradient-text">CONVOSHRIMP</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl text-text-secondary mb-2"
        >
          Convolutional Neural Network
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-sm md:text-base text-shrimp-purple mb-8"
        >
          Neural Network Zoo Collection
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['16 Spectral Channels', 'Parallel Processing', 'Feature Extraction', 'Pattern Recognition'].map((tag, i) => (
            <span 
              key={i}
              className="px-4 py-2 rounded-full bg-card-surface text-text-secondary text-sm border border-shrimp-teal/20"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Project Context */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="max-w-2xl mx-auto text-text-secondary text-sm md:text-base mb-8 leading-relaxed"
        >
          A Neural Network Zoo project exploring how <span className="text-shrimp-teal">Convolutional Neural Networks</span> mirror 
          the incredible visual system of the <span className="text-shrimp-coral">Mantis Shrimp</span>. Nature&apos;s most advanced eyes 
          meet deep learning&apos;s most powerful vision architecture.
        </motion.p>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-xs text-text-secondary/60 mb-4"
        >
          Scroll to explore • Click elements to learn more
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-shrimp-teal mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Shell className="w-6 h-6 text-shrimp-teal" />
          <span className="font-display font-bold text-lg gradient-text">CONVOSHRIMP</span>
        </div>
        <p className="text-text-secondary text-sm mb-2">
          CNN Mantis Shrimp - Neural Network Zoo
        </p>
        <p className="text-text-secondary/50 text-xs">
          Deep Learning Lookbook | Est. 2026
        </p>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e) => {
      const sections = ['intro', 'card', 'anatomy', 'flow', 'applications', 'history', 'code'];
      const currentSection = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });
      const currentIndex = sections.indexOf(currentSection);

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const nextSection = sections[currentIndex + 1];
        if (nextSection) {
          document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prevSection = sections[currentIndex - 1];
        if (prevSection) {
          document.getElementById(prevSection)?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentIndex === 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="lookbook-content" className="min-h-screen bg-deep-ocean">
      <Navbar />
      <Hero />
      <IntroSection />
      <QuickReference />
      <AnatomyDiagram />
      <CreatureCard />
      <ArchitectureFlow />
      <ApplicationsGrid />
      <EvolutionTimeline />
      <CodeSpecimen />
      <TeamSection />
      <Footer />
    </div>
  );
}

export default App;
