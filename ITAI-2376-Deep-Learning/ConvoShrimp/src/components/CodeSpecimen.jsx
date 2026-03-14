import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Check, FileCode } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { codeSnippets } from '../data/codeSnippets';

export default function CodeSpecimen() {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <section id="code" className="section pdf-section">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            <FileCode className="inline w-8 h-8 mr-2" />
            CNN Code Implementation
          </h2>
          <p className="text-text-secondary mb-4">PyTorch CNN Architecture</p>
          <p className="text-sm text-text-secondary/70 max-w-2xl mx-auto">
            This working PyTorch implementation demonstrates how CNN layers map to our creature&apos;s biology: 
            from the <span className="text-shrimp-teal">eyes</span> (input) through the <span className="text-shrimp-purple">midband</span> (convolutions) 
            to the <span className="text-shrimp-coral">strike</span> (output).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card-surface rounded-2xl overflow-hidden card-glow"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-deep-ocean/50 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-shrimp-teal" />
              <span className="font-mono text-sm text-shrimp-teal">convoshrimp.py</span>
              <span className="text-xs px-2 py-0.5 rounded bg-shrimp-purple/20 text-shrimp-purple">Python</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-shrimp-teal/20 hover:bg-shrimp-teal/30 text-shrimp-teal transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code */}
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <pre className="p-4 text-sm leading-relaxed">
              <code 
                ref={codeRef}
                className="language-python"
              >
                {codeSnippets.full}
              </code>
            </pre>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-deep-ocean/50 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-text-secondary">
              <div className="flex items-center gap-4">
                <span>Lines: ~170</span>
                <span>Framework: PyTorch</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-shrimp-teal rounded-full animate-pulse" />
                <span>Ready to run</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Code Highlights */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-card-surface rounded-xl"
          >
            <h4 className="font-display text-shrimp-coral mb-2">Eyes Layer</h4>
            <p className="text-sm text-text-secondary">
              Initial conv layer expands 3 RGB channels to 32 feature detectors, 
              like the mantis shrimp&apos;s photoreceptors.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-card-surface rounded-xl"
          >
            <h4 className="font-display text-shrimp-teal mb-2">Midband Layers</h4>
            <p className="text-sm text-text-secondary">
              Three sequential conv blocks extract increasingly complex features: 
              edges → textures → object parts.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-card-surface rounded-xl"
          >
            <h4 className="font-display text-shrimp-purple mb-2">Brain + Strike</h4>
            <p className="text-sm text-text-secondary">
              Fully connected layers integrate features, dropout prevents overfitting, 
              and the strike layer makes the classification.
            </p>
          </motion.div>
        </div>

        {/* References */}
        <div className="mt-8 p-4 bg-card-surface rounded-xl">
          <h4 className="font-display text-shrimp-teal mb-3">References</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>
              <span className="text-shrimp-coral">[1]</span> Marshall, N.J. & Oberwinkler, J. (1999). "The colourful world of the mantis shrimp." <em>Nature</em>, 401, 873-874.
            </li>
            <li>
              <span className="text-shrimp-coral">[2]</span> LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). "Gradient-based learning applied to document recognition." <em>Proceedings of the IEEE</em>, 86(11), 2278-2324.
            </li>
            <li>
              <span className="text-shrimp-coral">[3]</span> Krizhevsky, A., Sutskever, I., & Hinton, G.E. (2012). "ImageNet classification with deep convolutional neural networks." <em>NeurIPS</em>, 25, 1097-1105.
            </li>
            <li>
              <span className="text-shrimp-coral">[4]</span> Simonyan, K. & Zisserman, A. (2014). "Very deep convolutional networks for large-scale image recognition." <em>arXiv:1409.1556</em>.
            </li>
            <li>
              <span className="text-shrimp-coral">[5]</span> Szegedy, C., et al. (2015). "Going deeper with convolutions." <em>CVPR</em>, 1-9.
            </li>
            <li>
              <span className="text-shrimp-coral">[6]</span> He, K., Zhang, X., Ren, S., & Sun, J. (2016). "Deep residual learning for image recognition." <em>CVPR</em>, 770-778.
            </li>
            <li>
              <span className="text-shrimp-coral">[7]</span> Tan, M. & Le, Q.V. (2019). "EfficientNet: Rethinking model scaling for convolutional neural networks." <em>ICML</em>, 6105-6114.
            </li>
            <li>
              <span className="text-shrimp-coral">[8]</span> PyTorch Documentation. <span className="text-shrimp-electric-blue">pytorch.org/docs</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
