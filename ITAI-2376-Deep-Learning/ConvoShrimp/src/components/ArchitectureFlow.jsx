import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image, Grid3x3, Waves, Zap, Maximize2, 
  GitBranch, Target, ArrowRight, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { layerData, flowSteps } from '../data/layerData';

const iconMap = {
  Image, Grid3x3, Waves, Zap, Maximize2, GitBranch, Target
};

export default function ArchitectureFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(null);

  const currentFlow = flowSteps[currentStep];
  const currentLayerData = layerData[currentFlow.id] || layerData.conv1;

  return (
    <section id="flow" className="section pdf-section">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            CNN Architecture Flow
          </h2>
          <p className="text-text-secondary">How ConvoShrimp processes visual data</p>
        </motion.div>

        {/* Flow Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card-surface rounded-2xl p-6 mb-8 overflow-x-auto"
        >
          <div className="flex items-center justify-between min-w-max gap-2 md:gap-4 py-4">
            {flowSteps.map((step, index) => {
              const Icon = iconMap[layerData[step.id]?.icon] || Grid3x3;
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`flex flex-col items-center cursor-pointer transition-all ${
                      index === currentStep ? 'scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setCurrentStep(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all ${
                        index === currentStep 
                          ? 'ring-2 ring-offset-2 ring-offset-card-surface'
                          : ''
                      }`}
                      style={{ 
                        backgroundColor: `${step.color}20`,
                        borderColor: step.color,
                        ringColor: step.color
                      }}
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: step.color }} />
                    </div>
                    <span className="text-xs mt-2 font-medium" style={{ color: step.color }}>
                      {step.label}
                    </span>
                    {layerData[step.id]?.dimensions && (
                      <span className="text-[10px] text-text-secondary mt-1 font-mono">
                        {layerData[step.id].dimensions.split('→')[0].trim()}
                      </span>
                    )}
                  </motion.div>
                  {index < flowSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-text-secondary mx-1 md:mx-2 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Step Navigation */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="p-2 rounded-lg bg-card-surface hover:bg-shrimp-teal/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-shrimp-teal" />
          </button>
          
          <div className="flex gap-2">
            {flowSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentStep ? 'bg-shrimp-teal scale-125' : 'bg-text-secondary/30 hover:bg-text-secondary/50'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setCurrentStep(Math.min(flowSteps.length - 1, currentStep + 1))}
            disabled={currentStep === flowSteps.length - 1}
            className="p-2 rounded-lg bg-card-surface hover:bg-shrimp-teal/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-shrimp-teal" />
          </button>
        </div>

        {/* Current Layer Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFlow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card-surface rounded-2xl p-6 card-glow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${currentFlow.color}20` }}
              >
                {(() => {
                  const Icon = iconMap[currentLayerData.icon] || Grid3x3;
                  return <Icon className="w-6 h-6" style={{ color: currentFlow.color }} />;
                })()}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold" style={{ color: currentFlow.color }}>
                  {currentLayerData.title}
                </h3>
                {currentLayerData.dimensions && (
                  <p className="text-sm font-mono text-text-secondary">{currentLayerData.dimensions}</p>
                )}
              </div>
            </div>

            <p className="text-text-secondary mb-4">{currentLayerData.details}</p>

            {/* Operation Details for specific layers */}
            {currentLayerData.operation && (
              <div className="mt-4 p-4 bg-deep-ocean/50 rounded-xl border border-white/10">
                <h4 className="font-display text-sm text-shrimp-teal mb-3">{currentLayerData.operation.title}</h4>
                
                {currentLayerData.operation.formula && (
                  <div className="mb-3 p-3 bg-shrimp-purple/10 rounded-lg">
                    <code className="text-sm font-mono text-shrimp-purple">
                      {currentLayerData.operation.formula}
                    </code>
                  </div>
                )}

                {currentLayerData.operation.explanation && (
                  <p className="text-sm text-text-secondary mb-3">{currentLayerData.operation.explanation}</p>
                )}

                {currentLayerData.operation.example && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-shrimp-coral/10 rounded-lg">
                      <span className="text-xs text-shrimp-coral block mb-1">Input:</span>
                      <code className="text-xs font-mono text-text-secondary">
                        {JSON.stringify(currentLayerData.operation.example.input || currentLayerData.operation.example.logits)}
                      </code>
                    </div>
                    <div className="p-3 bg-shrimp-teal/10 rounded-lg">
                      <span className="text-xs text-shrimp-teal block mb-1">Output:</span>
                      <code className="text-xs font-mono text-text-secondary">
                        {JSON.stringify(currentLayerData.operation.example.output || currentLayerData.operation.example.probabilities)}
                      </code>
                    </div>
                  </div>
                )}

                {currentLayerData.operation.purpose && (
                  <p className="text-xs text-shrimp-yellow mt-3 italic">
                    Purpose: {currentLayerData.operation.purpose}
                  </p>
                )}
              </div>
            )}

            {/* Additional Info */}
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {currentLayerData.filters && (
                <div className="p-3 bg-shrimp-purple/10 rounded-lg text-center">
                  <span className="text-xs text-text-secondary block">Filters</span>
                  <span className="font-display font-bold text-shrimp-purple">{currentLayerData.filters}</span>
                </div>
              )}
              {currentLayerData.kernelSize && (
                <div className="p-3 bg-shrimp-teal/10 rounded-lg text-center">
                  <span className="text-xs text-text-secondary block">Kernel</span>
                  <span className="font-display font-bold text-shrimp-teal">{currentLayerData.kernelSize}</span>
                </div>
              )}
              {currentLayerData.poolSize && (
                <div className="p-3 bg-shrimp-coral/10 rounded-lg text-center">
                  <span className="text-xs text-text-secondary block">Pool Size</span>
                  <span className="font-display font-bold text-shrimp-coral">{currentLayerData.poolSize}</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
