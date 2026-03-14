import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Star, X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { evolutionData } from '../data/evolutionData';

export default function EvolutionTimeline() {
  const [selectedArch, setSelectedArch] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.getElementById('timeline-scroll');
    if (container) {
      const newPosition = scrollPosition + (direction === 'left' ? -300 : 300);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section id="history" className="section pdf-section">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            <Dna className="inline w-8 h-8 mr-2" />
            ConvoShrimp Lineage
          </h2>
          <p className="text-text-secondary">The Evolution of CNN Architectures</p>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-lg bg-card-surface hover:bg-shrimp-teal/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-shrimp-teal" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-lg bg-card-surface hover:bg-shrimp-teal/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-shrimp-teal" />
          </button>
        </div>

        {/* Horizontal Timeline */}
        <div 
          id="timeline-scroll"
          className="overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-shrimp-teal scrollbar-track-deep-ocean"
        >
          <div className="flex gap-3 min-w-max px-4 justify-center">
            {evolutionData.map((arch, index) => (
              <motion.div
                key={arch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col items-center cursor-pointer group ${
                  selectedArch?.name === arch.name ? 'scale-105' : ''
                }`}
                onClick={() => setSelectedArch(selectedArch?.name === arch.name ? null : arch)}
              >
                {/* Year marker */}
                <div className="text-sm font-mono text-text-secondary mb-2">{arch.year}</div>
                
                {/* Node */}
                <div 
                  className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${
                    arch.isBreakthrough ? 'ring-2 ring-offset-2 ring-offset-deep-ocean' : ''
                  }`}
                  style={{ 
                    backgroundColor: `${arch.color}20`,
                    ringColor: arch.color 
                  }}
                >
                  <Layers className="w-7 h-7" style={{ color: arch.color }} />
                  {arch.isBreakthrough && (
                    <Star 
                      className="absolute -top-1 -right-1 w-5 h-5 text-shrimp-yellow fill-shrimp-yellow" 
                    />
                  )}
                </div>
                
                {/* Name */}
                <div className="mt-2 text-center">
                  <h4 
                    className="font-display font-bold text-sm"
                    style={{ color: arch.color }}
                  >
                    {arch.name}
                  </h4>
                  <p className="text-[10px] text-text-secondary max-w-20 truncate">
                    {arch.title}
                  </p>
                </div>

                {/* Connector line */}
                {index < evolutionData.length - 1 && (
                  <div className="absolute top-10 left-full w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Architecture Detail */}
        <AnimatePresence mode="wait">
          {selectedArch ? (
            <motion.div
              key={selectedArch.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card-surface rounded-2xl p-6 card-glow relative"
            >
              <button
                onClick={() => setSelectedArch(null)}
                className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${selectedArch.color}20` }}
                >
                  <Layers className="w-8 h-8" style={{ color: selectedArch.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 
                      className="font-display text-2xl font-bold"
                      style={{ color: selectedArch.color }}
                    >
                      {selectedArch.name}
                    </h3>
                    {selectedArch.isBreakthrough && (
                      <Star className="w-5 h-5 text-shrimp-yellow fill-shrimp-yellow" />
                    )}
                  </div>
                  <p className="text-lg text-text-secondary">{selectedArch.title}</p>
                  <p className="text-sm text-shrimp-teal">{selectedArch.year} - {selectedArch.creator}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-deep-ocean/50 rounded-lg text-center">
                  <span className="text-xs text-text-secondary block">Parameters</span>
                  <span className="font-display font-bold text-shrimp-purple">{selectedArch.parameters}</span>
                </div>
                <div className="p-3 bg-deep-ocean/50 rounded-lg text-center">
                  <span className="text-xs text-text-secondary block">Layers</span>
                  <span className="font-display font-bold text-shrimp-teal">{selectedArch.layers}</span>
                </div>
                <div className="p-3 bg-deep-ocean/50 rounded-lg text-center col-span-2 md:col-span-1">
                  <span className="text-xs text-text-secondary block">Status</span>
                  <span className={`font-display font-bold ${selectedArch.isBreakthrough ? 'text-shrimp-hot-pink' : 'text-shrimp-yellow'}`}>
                    {selectedArch.isBreakthrough ? 'BREAKTHROUGH' : 'MILESTONE'}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-4">
                <h4 className="font-display text-sm text-shrimp-teal mb-2">Key Innovations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedArch.highlights.map((highlight, i) => (
                    <span 
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full bg-deep-ocean/50 text-text-secondary border border-white/10"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Significance */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: `${selectedArch.color}10` }}>
                <h4 className="font-display text-sm mb-2" style={{ color: selectedArch.color }}>
                  Historical Significance
                </h4>
                <p className="text-sm text-text-secondary">{selectedArch.significance}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card-surface rounded-2xl p-8 text-center"
            >
              <Dna className="w-12 h-12 text-shrimp-purple/30 mx-auto mb-3" />
              <p className="text-text-secondary">Click on an architecture to learn about its place in CNN history</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
