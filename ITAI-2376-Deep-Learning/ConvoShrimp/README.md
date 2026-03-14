# ConvoShrimp — Interactive CNN Explorer

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-FF0050?style=flat-square)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## Problem Statement

Convolutional Neural Networks are among the most widely used deep learning architectures, yet their internal mechanics — convolution, pooling, feature extraction, classification — remain abstract to most learners. Existing educational resources tend to rely on static diagrams or dense academic text, making it difficult for visual and interactive learners to build genuine intuition about how CNNs process information.

## Approach & Methodology

We designed an interactive React application that maps each stage of a CNN pipeline to the biology of the mantis shrimp — an animal with 16 types of photoreceptors (vs. 3 in humans), making it a natural metaphor for multi-channel visual processing. The app uses scroll-driven animation to walk users through convolution, pooling, feature maps, and classification, with embedded PyTorch code examples and a historical timeline of CNN evolution (LeNet → EfficientNet).

**Design decisions:**
- **React 19 + Vite 7** for fast iteration and component-driven architecture
- **Framer Motion** for scroll-triggered animations that reveal content progressively
- **Prism.js** for syntax-highlighted PyTorch code blocks
- **@react-pdf/renderer + html2pdf.js** for one-click PDF export of the full presentation

## Results & Evaluation

- Production build compiles successfully (Vite, 2365 modules, 2.98s build time)
- Fully responsive across desktop and mobile viewports
- PDF export generates a shareable presentation from the live app
- Peer and instructor feedback confirmed the biological analogy made CNN stages significantly more intuitive

## Key Features

- **CNN Architecture Walkthrough** — Animated sections break down convolution, pooling, feature maps, and classification
- **Biology-to-Neural Mapping** — Side-by-side comparisons of mantis shrimp photoreceptors and CNN filter layers
- **Embedded PyTorch Examples** — Syntax-highlighted code snippets showing real CNN layer definitions
- **Timeline of CNN Evolution** — Interactive history from LeNet to EfficientNet
- **PDF Export** — One-click generation of a shareable presentation PDF

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19.2, Vite 7.2 |
| **Styling** | TailwindCSS 3.4, Framer Motion 12 |
| **Code Display** | Prism.js (syntax highlighting) |
| **PDF Generation** | @react-pdf/renderer, html2pdf.js |
| **Deep Learning** | PyTorch-based example code |

## Requirements & Dependencies

- Node.js 18+
- npm

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build
npm run preview
```

## Project Structure

```
ConvoShrimp/
├── src/
│   ├── components/     # Section-based UI components
│   ├── data/           # CNN and biology content data
│   ├── utils/          # PDF export and helpers
│   ├── App.jsx         # Root layout
│   └── main.jsx        # Entry point
├── public/             # Shrimp imagery and CNN diagrams
├── package.json
└── vite.config.js
```

## Learning Outcomes

- Deepened understanding of CNN internals by building visual explanations for each layer type
- Gained hands-on experience with React component architecture, animation libraries, and client-side PDF generation
- Practiced translating technical deep learning concepts into accessible, interactive formats
- Collaborated in a 4-person team using Git for version control and task coordination

## Team

DeMarcus Crump · Chloe Tu · Matthew · Franck

## References

1. LeCun et al. (1998) — *Gradient-based learning applied to document recognition*
2. Krizhevsky et al. (2012) — *ImageNet classification with deep convolutional neural networks*
3. He et al. (2016) — *Deep residual learning for image recognition*
4. Simonyan & Zisserman (2014) — *Very deep convolutional networks for large-scale image recognition*
5. Tan & Le (2019) — *EfficientNet: Rethinking model scaling for convolutional neural networks*
6. Marshall (1999) — *The colourful world of the mantis shrimp*

## License

MIT — see `LICENSE` for details.
