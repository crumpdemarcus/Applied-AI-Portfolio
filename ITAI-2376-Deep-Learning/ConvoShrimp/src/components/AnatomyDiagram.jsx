import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Cpu, Layers, Brain, Target, ArrowDown, X } from 'lucide-react';
import { anatomyData, mappingTable } from '../data/anatomyData';

export default function AnatomyDiagram() {
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <section id="anatomy" className="section pdf-section">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            ConvoShrimp Anatomy
          </h2>
          <p className="text-text-secondary">Biological to Computational Mapping</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Illustration with Hotspots */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-card-surface rounded-2xl p-8 card-glow"
          >
            <h3 className="font-display text-lg text-shrimp-teal mb-6 text-center">
              <Eye className="inline w-5 h-5 mr-2" />
              Mantis Shrimp Neural Architecture
            </h3>

            {/* Visual Flow Diagram */}
            <div className="space-y-4">
              {anatomyData.map((part, index) => (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedPart?.id === part.id 
                      ? 'bg-shrimp-teal/20 border-2 border-shrimp-teal' 
                      : 'bg-deep-ocean/50 hover:bg-shrimp-purple/10 border-2 border-transparent'
                  }`}
                  onClick={() => setSelectedPart(selectedPart?.id === part.id ? null : part)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-shrimp-purple/20 flex items-center justify-center">
                        {index === 0 && <Eye className="w-5 h-5 text-shrimp-purple" />}
                        {index === 1 && <Cpu className="w-5 h-5 text-shrimp-teal" />}
                        {index === 2 && <Layers className="w-5 h-5 text-shrimp-coral" />}
                        {index === 3 && <Layers className="w-5 h-5 text-shrimp-yellow" />}
                        {index === 4 && <Brain className="w-5 h-5 text-shrimp-hot-pink" />}
                        {index === 5 && <Target className="w-5 h-5 text-shrimp-electric-blue" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{part.label}</h4>
                        <p className="text-xs text-text-secondary">{part.biological.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-shrimp-teal">{part.cnn.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Flow Arrows */}
              {anatomyData.slice(0, -1).map((_, i) => (
                <div key={i} className="flex justify-center -my-2">
                  <ArrowDown className="w-5 h-5 text-shrimp-teal/50" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detail Panel & Table */}
          <div className="space-y-6">
            {/* Selected Part Detail */}
            <AnimatePresence mode="wait">
              {selectedPart ? (
                <motion.div
                  key={selectedPart.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card-surface rounded-2xl p-6 card-glow relative"
                >
                  <button
                    onClick={() => setSelectedPart(null)}
                    className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-text-secondary" />
                  </button>

                  <h3 className="font-display text-xl text-shrimp-teal mb-4">{selectedPart.label}</h3>
                  
                  <div className="grid gap-4">
                    <div className="p-4 bg-shrimp-coral/10 rounded-xl border border-shrimp-coral/20">
                      <h4 className="text-sm text-shrimp-coral font-medium mb-2">
                        Biological: {selectedPart.biological.title}
                      </h4>
                      <p className="text-sm text-text-secondary">{selectedPart.biological.description}</p>
                    </div>
                    
                    <div className="p-4 bg-shrimp-teal/10 rounded-xl border border-shrimp-teal/20">
                      <h4 className="text-sm text-shrimp-teal font-medium mb-2">
                        CNN: {selectedPart.cnn.title}
                      </h4>
                      <p className="text-sm text-text-secondary">{selectedPart.cnn.description}</p>
                    </div>
                    
                    <div className="p-3 bg-shrimp-purple/10 rounded-xl border border-shrimp-purple/20 text-center">
                      <span className="text-xs text-text-secondary">Shared Function: </span>
                      <span className="text-sm text-shrimp-purple font-medium">{selectedPart.sharedFunction}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card-surface rounded-2xl p-6 text-center"
                >
                  <Eye className="w-12 h-12 text-shrimp-purple/30 mx-auto mb-3" />
                  <p className="text-text-secondary">Click a body part to see the detailed mapping</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mapping Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card-surface rounded-2xl p-6 overflow-x-auto"
            >
              <h3 className="font-display text-lg text-shrimp-teal mb-4">
                <Cpu className="inline w-5 h-5 mr-2" />
                Complete Mapping Table
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 px-3 text-left text-shrimp-coral">Biology</th>
                    <th className="py-2 px-3 text-left text-shrimp-teal">CNN</th>
                    <th className="py-2 px-3 text-left text-shrimp-purple">Function</th>
                  </tr>
                </thead>
                <tbody>
                  {mappingTable.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-2 px-3 text-text-secondary">{row.biology}</td>
                      <td className="py-2 px-3 text-text-secondary">{row.cnn}</td>
                      <td className="py-2 px-3 text-text-secondary">{row.function}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
