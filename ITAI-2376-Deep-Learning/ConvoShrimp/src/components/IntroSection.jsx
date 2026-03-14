import { motion } from 'framer-motion';
import { Brain, Network, Layers, ArrowRight, Sparkles } from 'lucide-react';

const concepts = [
  {
    icon: Brain,
    title: 'What is a Neuron?',
    description: 'A neuron is the basic unit of a neural network. It receives inputs, applies weights, adds a bias, and passes the result through an activation function to produce an output.',
  },
  {
    icon: Network,
    title: 'How Neurons Connect',
    description: 'Neurons are organized in layers. Each neuron in one layer connects to neurons in the next layer, creating a web of connections that can learn complex patterns.',
  },
  {
    icon: Layers,
    title: 'Network Layers',
    description: 'A neural network has an input layer (receives data), hidden layers (process features), and an output layer (makes predictions). More layers = "deeper" learning.',
  },
];

export default function IntroSection() {
  return (
    <section id="intro" className="section pdf-section py-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-shrimp-purple/20 to-shrimp-teal/20 border border-shrimp-purple/30">
              <Brain className="w-12 h-12 text-shrimp-purple" />
            </div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Introduction to Neural Networks</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Before we meet our CNN Mantis Shrimp, let&apos;s understand the basics of how neural networks work.
          </p>
        </motion.div>

        {/* Concept Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card-surface/50 border border-shrimp-teal/20 hover:border-shrimp-teal/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-shrimp-teal/10">
                  <concept.icon className="w-6 h-6 text-shrimp-teal" />
                </div>
                <h3 className="font-display font-semibold text-lg">{concept.title}</h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {concept.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Simple Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-br from-card-surface to-bioluminescent border border-shrimp-purple/20"
        >
          <h3 className="font-display text-xl font-semibold text-center mb-8">
            <Sparkles className="inline w-5 h-5 mr-2 text-shrimp-yellow" />
            How a Neural Network Learns
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Step 1: Input */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-shrimp-electric-blue/20 border-2 border-shrimp-electric-blue flex items-center justify-center">
                <span className="font-display font-bold text-xl text-shrimp-electric-blue">IN</span>
              </div>
              <p className="text-sm text-text-secondary">Input Data</p>
              <p className="text-xs text-text-secondary/60">(e.g., image pixels)</p>
            </div>

            <ArrowRight className="w-8 h-8 text-shrimp-teal/50 rotate-90 md:rotate-0" />

            {/* Step 2: Hidden Layers */}
            <div className="text-center">
              <div className="flex gap-2 justify-center mb-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-16 rounded-lg bg-shrimp-purple/20 border border-shrimp-purple flex items-center justify-center"
                  >
                    <div className="flex flex-col gap-1">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="w-2 h-2 rounded-full bg-shrimp-purple" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-secondary">Hidden Layers</p>
              <p className="text-xs text-text-secondary/60">(learn patterns)</p>
            </div>

            <ArrowRight className="w-8 h-8 text-shrimp-teal/50 rotate-90 md:rotate-0" />

            {/* Step 3: Output */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-shrimp-hot-pink/20 border-2 border-shrimp-hot-pink flex items-center justify-center">
                <span className="font-display font-bold text-xl text-shrimp-hot-pink">OUT</span>
              </div>
              <p className="text-sm text-text-secondary">Prediction</p>
              <p className="text-xs text-text-secondary/60">(e.g., "cat" 97%)</p>
            </div>
          </div>

          <p className="text-center text-text-secondary text-sm mt-8 max-w-xl mx-auto">
            The network adjusts its weights through <span className="text-shrimp-teal font-medium">backpropagation</span>, 
            learning from mistakes to improve predictions over time.
          </p>
        </motion.div>

        {/* Transition to CNN */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-2">
            Now let&apos;s meet a specialized neural network designed for visual data...
          </p>
          <p className="font-display text-2xl gradient-text font-bold">
            The Convolutional Neural Network
          </p>
        </motion.div>
      </div>
    </section>
  );
}
