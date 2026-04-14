# ConvoShrimp — Interactive CNN Explorer

[← Back to Portfolio](../../README.md)

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-FF0050?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

</div>

## Problem Statement

Convolutional Neural Networks are among the most widely used deep learning architectures, yet their internal mechanics — convolution, pooling, feature extraction, classification — remain abstract to most learners. Existing educational resources tend to rely on static diagrams or dense academic text, making it difficult for visual and interactive learners to build genuine intuition about how CNNs process information.

## Approach and Methodology

We designed an interactive React application that maps each stage of a CNN pipeline to the biology of the mantis shrimp — an animal with 16 types of photoreceptors (vs. 3 in humans), making it a natural metaphor for multi-channel visual processing. The app uses scroll-driven animation to walk users through convolution, pooling, feature maps, and classification, with embedded PyTorch code examples and a historical timeline of CNN evolution (LeNet → EfficientNet).

**Design decisions:**
- **React 19 + Vite 7** for fast iteration and component-driven architecture
- **Framer Motion** for scroll-triggered animations that reveal content progressively
- **Prism.js** for syntax-highlighted PyTorch code blocks
- **@react-pdf/renderer + html2pdf.js** for one-click PDF export of the full presentation

## Results and Evaluation

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

## Requirements or Dependencies

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

## Sample Data Access

This application is primarily a frontend visualization tool and uses predefined data structures (e.g., in `src/data/anatomyData.js`) to drive the interactive components and PyTorch code snippets. No external dataset download is required.

## Learning Outcomes

**CNN Architecture — layer by layer:**
- **Convolution layers** apply learnable kernels (3×3) that slide across the input computing dot products. The first layer detects edges and gradients; deeper layers combine those into textures (layer 2, 64 filters) and object parts (layer 3, 128 filters). I learned that each filter learns a different feature detector through backpropagation.
- **ReLU activation** (`f(x) = max(0, x)`) introduces non-linearity between layers. Without it, stacking linear layers collapses to a single linear transformation — the network could only learn straight-line relationships. ReLU solves the vanishing gradient problem for positive values because its derivative is always 1.
- **Max pooling** (`MaxPool2d(2,2)`) reduces spatial dimensions by half, keeping only the strongest activation in each 2×2 region. This provides translation invariance (a feature detected slightly left or right still survives pooling) and reduces computation.
- **Batch normalization** (`BatchNorm2d`) normalizes activations to zero mean and unit variance between layers, which stabilizes training and allows higher learning rates.
- **Dropout** (`Dropout(0.5)`) randomly zeros half the neurons during training, forcing the network to not rely on any single neuron — this is a regularization technique that reduces overfitting.
- **Flatten → Dense layers** — Converting 3D feature maps (128 × 4 × 4 = 2,048 values) into a 1D vector, then passing through fully connected layers (512 → 256 → num_classes) where every neuron connects to every neuron in the previous layer.
- **Softmax output** converts raw scores (logits) into probabilities that sum to 1 for multi-class classification.

**Training pipeline (PyTorch):**
- Defined a CNN class inheriting from `nn.Module` with `__init__` (architecture) and `forward` (data flow) methods.
- Used `CrossEntropyLoss` for multi-class classification and `Adam` optimizer with `StepLR` learning rate scheduler.
- Applied data augmentation (`RandomHorizontalFlip`, `RandomCrop`) and normalization to CIFAR-10 (60K images, 10 classes).
- Implemented train/eval mode switching and `torch.no_grad()` for inference.

**CNN history:**
- Studied the evolution from LeNet (1989, 60K params, digit recognition) → AlexNet (2012, 60M params, introduced ReLU and GPU training, won ImageNet) → VGGNet (2014, showed depth matters with 3×3 filters) → GoogLeNet (2014, Inception modules, 1×1 convolutions for efficiency) → ResNet (2015, skip connections enabling 152+ layers) → EfficientNet (2019, compound scaling for optimal width/depth/resolution).

**Frontend skills:**
- React 19 component architecture, Framer Motion scroll-driven animation, Prism.js syntax highlighting, client-side PDF generation with @react-pdf/renderer and html2pdf.js.
- Collaborated in a 4-person team using Git for version control.

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
