import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, Zap, Grid3x3, Waves, Target, Clock, 
  Image, Gem, Sword, Shield, Sparkles
} from 'lucide-react';
import { cardData } from '../data/cardData';

const iconMap = {
  Eye, Zap, Grid3x3, Waves, Target, Clock, Image, Gem, Sword, Shield
};

const IconComponent = ({ name, className }) => {
  const Icon = iconMap[name];
  return Icon ? <Icon className={className} /> : null;
};

export default function CreatureCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="card" className="section pdf-section flex items-center justify-center">
      <div className="max-w-lg w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            Creature Card
          </h2>
          <p className="text-text-secondary">Click the card to flip</p>
        </motion.div>

        <motion.div
          className="card-container cursor-pointer animate-float"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="relative w-full aspect-[2.5/3.5]"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card Front */}
            <div 
              className="absolute inset-0 rounded-2xl p-1 holographic card-glow"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="w-full h-full bg-card-surface rounded-xl p-4 flex flex-col">
                {/* Creature Image Area */}
                <div className="relative h-40 rounded-lg mb-3 overflow-hidden">
                  <img 
                    src="/convoshrimp-creature.png" 
                    alt="ConvoShrimp - CNN Mantis Shrimp" 
                    className="w-full h-full object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card-surface/80 to-transparent" />
                </div>

                {/* Name and HP */}
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-shrimp-teal">{cardData.name}</h3>
                    <p className="text-xs text-text-secondary">{cardData.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-text-secondary">HP</span>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-2 bg-deep-ocean rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-shrimp-coral to-shrimp-hot-pink w-full" />
                      </div>
                      <span className="font-display font-bold text-shrimp-coral">{cardData.hp}</span>
                    </div>
                  </div>
                </div>

                {/* Types */}
                <div className="flex gap-2 mb-3">
                  {cardData.types.map((type, i) => (
                    <div key={i} className="flex items-center gap-1 px-2 py-1 bg-shrimp-purple/20 rounded-full text-xs">
                      <IconComponent name={type.icon} className="w-3 h-3 text-shrimp-purple" />
                      <span className="text-shrimp-purple">{type.label}</span>
                    </div>
                  ))}
                </div>

                {/* Abilities */}
                <div className="flex-1 space-y-2 overflow-y-auto">
                  <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">
                    <Sword className="w-3 h-3" />
                    <span>ABILITIES</span>
                  </div>
                  {cardData.abilities.map((ability, i) => (
                    <div key={i} className={`p-2 rounded-lg text-xs ${ability.isUltimate ? 'bg-shrimp-hot-pink/20 border border-shrimp-hot-pink/30' : 'bg-deep-ocean/50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1">
                          <IconComponent name={ability.icon} className={`w-3 h-3 ${ability.isUltimate ? 'text-shrimp-hot-pink' : 'text-shrimp-teal'}`} />
                          <span className="font-medium">{ability.name}</span>
                          {ability.isUltimate && <span className="text-[10px] text-shrimp-hot-pink">ULTIMATE</span>}
                        </div>
                        <span className={`font-display font-bold ${ability.isUltimate ? 'text-shrimp-hot-pink' : 'text-shrimp-yellow'}`}>{ability.damage}</span>
                      </div>
                      <p className="text-text-secondary leading-tight">{ability.description}</p>
                    </div>
                  ))}
                </div>

                {/* Weakness/Strength */}
                <div className="flex gap-2 mt-2 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-1">
                    <IconComponent name={cardData.weakness.icon} className="w-3 h-3 text-shrimp-coral" />
                    <span className="text-text-secondary">Weak:</span>
                    <span className="text-shrimp-coral">{cardData.weakness.label}</span>
                  </div>
                </div>

                {/* Set Info */}
                <div className="flex justify-between items-center mt-2 text-[10px] text-text-secondary">
                  <span>{cardData.setInfo.name}</span>
                  <span>{cardData.setInfo.number}</span>
                  <div className="flex items-center gap-1">
                    <Gem className="w-3 h-3 text-shrimp-purple" />
                    <span className="text-shrimp-purple">{cardData.setInfo.rarity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Back */}
            <div 
              className="absolute inset-0 rounded-2xl p-1 holographic card-glow"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="w-full h-full bg-card-surface rounded-xl p-4 flex flex-col">
                <div className="text-center mb-3">
                  <div className="flex justify-center gap-2 items-center mb-1">
                    <Gem className="w-4 h-4 text-shrimp-purple" />
                    <span className="font-display text-sm text-shrimp-purple">SPECIES DOCUMENTATION</span>
                    <Gem className="w-4 h-4 text-shrimp-purple" />
                  </div>
                </div>

                {/* Classification */}
                <div className="space-y-1 mb-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">CLASSIFICATION:</span>
                    <span className="font-mono text-shrimp-teal">{cardData.lore.classification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">DISCOVERED:</span>
                    <span className="font-mono text-shrimp-yellow">{cardData.lore.discovered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">HABITAT:</span>
                    <span className="font-mono text-shrimp-coral">{cardData.lore.habitat}</span>
                  </div>
                </div>

                {/* Lore */}
                <div className="flex-1 p-3 bg-deep-ocean/50 rounded-lg mb-3">
                  <h4 className="font-display text-xs text-shrimp-teal mb-2">LORE</h4>
                  <p className="text-xs text-text-secondary leading-relaxed italic whitespace-pre-line">
                    {cardData.lore.story}
                  </p>
                </div>

                {/* Technical Specs */}
                <div className="p-3 bg-deep-ocean/50 rounded-lg">
                  <h4 className="font-display text-xs text-shrimp-teal mb-2">TECHNICAL SPECIFICATIONS</h4>
                  <div className="space-y-1">
                    {cardData.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-text-secondary">{spec.param}</span>
                        <span className="font-mono text-shrimp-electric-blue">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-3 text-[10px] text-text-secondary">
                  Neural Network Zoo | Est. 2026
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
