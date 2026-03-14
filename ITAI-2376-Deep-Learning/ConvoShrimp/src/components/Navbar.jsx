import { useState } from 'react';
import { Menu, X, Shell } from 'lucide-react';
import PDFDownloadButton from './PDFDownloadButton';

const navItems = [
  { id: 'reference', label: 'Why' },
  { id: 'intro', label: 'Intro' },
  { id: 'card', label: 'Card' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'flow', label: 'Flow' },
  { id: 'applications', label: 'Apps' },
  { id: 'history', label: 'History' },
  { id: 'code', label: 'Code' },
  { id: 'team', label: 'Team' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-ocean/90 backdrop-blur-md border-b border-shrimp-teal/20 no-print">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Shell className="w-8 h-8 text-shrimp-teal" />
            <span className="font-display font-bold text-xl gradient-text">CONVOSHRIMP</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-text-secondary hover:text-shrimp-teal transition-colors"
              >
                {item.label}
              </button>
            ))}
            <PDFDownloadButton />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-shrimp-teal"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-shrimp-teal/20">
            <div className="flex flex-col gap-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="py-2 px-4 text-left text-text-secondary hover:text-shrimp-teal hover:bg-shrimp-teal/10 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <PDFDownloadButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
