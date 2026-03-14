import { Zap, ArrowRight } from 'lucide-react';

const comparisons = [
  {
    shrimp: "16 Photoreceptors",
    cnn: "Input Channels",
    function: "Capture different aspects of visual data",
    color: "#4ECDC4"
  },
  {
    shrimp: "Compound Eye Facets",
    cnn: "Kernels / Filters",
    function: "Local receptive fields for pattern detection",
    color: "#FF1493"
  },
  {
    shrimp: "Midband Region",
    cnn: "Convolutional Layers",
    function: "Specialized feature extraction",
    color: "#9B5DE5"
  },
  {
    shrimp: "Optical Ganglia",
    cnn: "Pooling Layers",
    function: "Compress while preserving key signals",
    color: "#F7DC6F"
  },
  {
    shrimp: "Brain",
    cnn: "Fully Connected Layers",
    function: "Integrate all features for reasoning",
    color: "#00D4FF"
  },
  {
    shrimp: "Strike",
    cnn: "Softmax Output",
    function: "Final classification decision",
    color: "#FF6B6B"
  }
];

export default function QuickReference() {
  return (
    <section id="reference" className="section pdf-section py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            <Zap className="inline w-8 h-8 mr-2" />
            Why Mantis Shrimp = CNN
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            The mantis shrimp has the most complex visual system in nature. 
            Here is how each biological component maps directly to CNN architecture.
          </p>
        </div>

        {/* Comparison Image */}
        <div className="mb-12 rounded-2xl overflow-hidden card-glow">
          <img 
            src="/cnn-shrimp-comparison.png" 
            alt="Mantis Shrimp to CNN Architecture Comparison"
            className="w-full h-auto"
          />
        </div>

        {/* Quick Reference Table */}
        <div className="bg-card-surface rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-deep-ocean/50 border-b border-white/10 text-sm font-display font-semibold">
            <div className="text-shrimp-coral">Mantis Shrimp</div>
            <div className="text-center text-text-secondary/50"></div>
            <div className="text-shrimp-teal">CNN Layer</div>
            <div className="text-shrimp-purple">Shared Function</div>
          </div>
          
          {comparisons.map((item, index) => (
            <div 
              key={index}
              className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors"
            >
              <div className="font-medium" style={{ color: item.color }}>
                {item.shrimp}
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-text-secondary/30" />
              </div>
              <div className="font-medium" style={{ color: item.color }}>
                {item.cnn}
              </div>
              <div className="text-sm text-text-secondary">
                {item.function}
              </div>
            </div>
          ))}
        </div>

        {/* Key Insight */}
        <div className="mt-8 p-6 bg-gradient-to-r from-shrimp-purple/10 to-shrimp-teal/10 rounded-2xl border border-shrimp-purple/20">
          <p className="text-center text-text-secondary">
            <span className="text-shrimp-yellow font-semibold">Key Insight:</span>{" "}
            Both systems evolved for the same purpose: extracting meaningful patterns from visual data 
            through hierarchical, parallel processing. Nature solved computer vision millions of years before we did.
          </p>
        </div>

        {/* Scientific Disclaimer */}
        <div className="mt-6 p-4 bg-deep-ocean/50 rounded-xl border border-white/5">
          <p className="text-center text-text-secondary/70 text-xs italic">
            Note: This comparison is illustrative. While both systems share conceptual parallels in visual processing, 
            biological neural networks operate through fundamentally different mechanisms than artificial ones. 
            CNNs were originally inspired by Hubel & Wiesel's research on cat visual cortex (1962).
          </p>
        </div>
      </div>
    </section>
  );
}
