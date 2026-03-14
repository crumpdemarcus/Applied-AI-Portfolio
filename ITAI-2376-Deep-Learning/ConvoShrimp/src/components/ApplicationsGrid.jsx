import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, Car, Smartphone, Shield, Palette, 
  Satellite, Globe, ChevronDown 
} from 'lucide-react';
import { applicationsData } from '../data/applicationsData';

const iconMap = {
  Stethoscope, Car, Smartphone, Shield, Palette, Satellite
};

export default function ApplicationsGrid() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="applications" className="section pdf-section">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            <Globe className="inline w-8 h-8 mr-2" />
            ConvoShrimp Hunting Grounds
          </h2>
          <p className="text-text-secondary">Where CNNs Dominate in the Wild</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicationsData.map((app, index) => {
            const Icon = iconMap[app.icon];
            const isExpanded = expandedId === app.id;

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card-surface rounded-2xl overflow-hidden cursor-pointer transition-all ${
                  isExpanded ? 'ring-2' : 'hover:ring-1'
                }`}
                style={{ 
                  ringColor: app.color,
                  '--ring-color': app.color 
                }}
                onClick={() => setExpandedId(isExpanded ? null : app.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${app.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: app.color }} />
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    </motion.div>
                  </div>

                  <h3 
                    className="font-display font-bold text-lg mb-2"
                    style={{ color: app.color }}
                  >
                    {app.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {app.items.slice(0, 3).map((item, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${app.color}15`,
                          color: app.color 
                        }}
                      >
                        {item}
                      </span>
                    ))}
                    {!isExpanded && app.items.length > 3 && (
                      <span className="text-xs text-text-secondary">+{app.items.length - 3} more</span>
                    )}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-wrap gap-2 mb-4">
                          {app.items.slice(3).map((item, i) => (
                            <span 
                              key={i}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ 
                                backgroundColor: `${app.color}15`,
                                color: app.color 
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {app.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div 
                  className="h-1 w-full"
                  style={{ backgroundColor: app.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
