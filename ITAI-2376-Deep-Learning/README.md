# Deep Learning — Project Showcase

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-Deep%20Learning-orange.svg)](https://pytorch.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg)](https://vitejs.dev/)

## Overview

Three projects and four lab notebooks built during my Deep Learning coursework (ITAI-2376), each tackling a different way to communicate neural network concepts through software. The work ranges from a feature-complete React application to a hand-illustrated interactive web comic — demonstrating both technical depth in deep learning and the ability to translate complex ideas into polished, user-facing products.

## Projects

### 1. [ConvoShrimp](./ConvoShrimp/) — Interactive CNN Explorer

A React + Vite application that visualizes Convolutional Neural Network architecture through a biological analogy with the mantis shrimp visual system. Users walk through convolution, pooling, feature extraction, and classification via an animated, scroll-driven interface.

| | |
|---|---|
| **Stack** | React 19, Vite 7, TailwindCSS, Framer Motion, PyTorch |
| **Highlights** | CNN architecture visualization · biological-to-neural mapping · embedded PyTorch code examples · responsive animated UI · PDF export |
| **Build** | `npm install && npm run dev` — production build verified ✓ |

---

### 2. [Neural Network Squad](./Neural-Network-Squad/) — Interactive Web Comic

A hand-designed, browser-based comic that teaches weights, biases, and activation functions through illustrated characters and live JavaScript demos. Built entirely with vanilla HTML/CSS/JS for zero-dependency portability.

| | |
|---|---|
| **Stack** | HTML5, CSS3, JavaScript, Google Fonts |
| **Highlights** | Character-driven explainers for ReLU, Sigmoid, Tanh · interactive weight/bias sliders · fully responsive · no build step required |
| **Run** | Open `index.html` in any browser |

---

### 3. [Arrival](./Arrival/) — Research Presentation & Report

Formal deep learning deliverables exploring an *Arrival*-inspired theme — a final presentation deck and a technical lab report analyzing heptapod language processing through a neural network lens.

| | |
|---|---|
| **Format** | PDF presentations and reports |
| **Artifacts** | `Arrival_Final_Presentation_ITAI_2376.pdf` · `Arrival_Heptapod_Lab_Report.pdf` |

---

## Lab Notebooks

| Notebook | Topics Covered |
|---|---|
| [Lab 02 — Neural Network Foundations](./Lab-02-Neural-Network-Foundations.ipynb) | PyTorch vs. TensorFlow comparison, building neural networks from scratch, environment setup, data preparation, framework-based model training |
| [Lab 03 — CNN Image Classification](./Lab-03-CNN-Image-Classification.ipynb) | Convolutional Neural Networks, image classification (Puppy vs. Bagel), convolutional/pooling layers, fully connected layers, transfer learning, data augmentation |
| [Lab 05 — RNNs, Transformers & ViT](./Lab-05-RNNs-Transformers-ViT.ipynb) | Recurrent Neural Networks (LSTM & GRU), Transformer architecture, Vision Transformers (ViT), sequence-to-sequence models, attention mechanisms |
| [Lab 08 — Diffusion Models](./Lab-08-Diffusion-Models.pdf) | Denoising diffusion probabilistic models (DDPMs), forward/reverse diffusion process, noise scheduling, U-Net architecture for denoising, image generation from random noise |

---

## What I Learned in This Course

This course covered the theory and practice of deep learning from the ground up. Below are the specific concepts I studied and applied across these three projects.

### Neural Network Fundamentals
- **Neurons, weights, and biases** — How a single artificial neuron computes a weighted sum of its inputs, adds a bias term, and passes the result through an activation function: `output = activation(W·x + b)`. I built interactive sliders in *Neural Network Squad* that let users manipulate these values and see the output change in real time.
- **Activation functions** — Why networks need non-linearity and how different functions serve different purposes:
  - **ReLU** `f(x) = max(0, x)` — Fast, sparse activations; used in most hidden layers. Solves the vanishing gradient problem for positive values.
  - **Sigmoid** `σ(x) = 1/(1+e^(-x))` — Squashes output to (0, 1); useful for binary classification and probability outputs.
  - **Tanh** `tanh(x)` — Outputs centered around zero (-1 to +1); better gradient flow than sigmoid for hidden layers.
- **Forward propagation** — How data flows through layers: input → weighted sum → bias → activation → next layer → output.
- **Loss functions and backpropagation** — How `CrossEntropyLoss` measures prediction error, and how gradients are computed backward through the network to update weights via `loss.backward()`.
- **Optimizers and learning rate scheduling** — Used `Adam` optimizer and `StepLR` scheduler in ConvoShrimp's PyTorch training code. Learned why adaptive learning rates converge faster than vanilla SGD.

### Convolutional Neural Networks (CNNs)
- **Convolution operation** — How a small kernel (e.g., 3×3) slides across an input image computing dot products to produce feature maps. First layers detect edges and gradients; deeper layers detect textures, object parts, and full objects.
- **Pooling** — `MaxPool2d(2, 2)` reduces spatial dimensions by half while keeping the strongest activations. Provides translation invariance and reduces computation.
- **Batch normalization** — `BatchNorm2d` normalizes activations between layers to stabilize training and allow higher learning rates.
- **Dropout** — `Dropout(0.5)` randomly zeros 50% of neurons during training to prevent overfitting.
- **Flatten → Fully connected layers** — Converting 3D feature maps (e.g., 128 × 4 × 4) into a 1D vector, then passing through dense layers for classification.
- **Softmax** — Converts raw logits into a probability distribution where all outputs sum to 1, enabling multi-class classification.
- **CNN architecture evolution** — Studied the progression from LeNet (1989, ~60K params) → AlexNet (2012, 60M params, ReLU + GPU training) → VGGNet (2014, depth matters, 3×3 filters) → GoogLeNet (2014, Inception modules, 1×1 convolutions) → ResNet (2015, skip connections, 152 layers) → EfficientNet (2019, compound scaling).

### Sequence Models & Language Representation (Arrival Project)
- **Sequence-to-sequence architectures** — How encoder-decoder models process variable-length input sequences and generate output sequences, applied to the heptapod language processing scenario.
- **Attention mechanisms** — How attention allows models to focus on relevant parts of an input sequence rather than compressing everything into a fixed-length vector.
- **Neural approaches to language understanding** — Explored how deep learning represents and processes language differently from rule-based systems.

### Generative Models — Diffusion (Lab 08)
- **Denoising Diffusion Probabilistic Models (DDPMs)** — Learned how diffusion models generate images by learning to reverse a gradual noising process. The forward process adds Gaussian noise step-by-step until the image becomes pure noise; the reverse process trains a neural network to denoise one step at a time, recovering the original image.
- **Noise scheduling** — How a variance schedule (β₁, β₂, ..., βₜ) controls how much noise is added at each timestep, and why the schedule matters for training stability and sample quality.
- **U-Net architecture for denoising** — How a U-Net with skip connections serves as the backbone that predicts the noise to remove at each step, using timestep embeddings to condition the prediction.
- **Image generation from noise** — Starting from pure random noise and iteratively denoising to produce realistic images — the core inference loop of diffusion models.

### PyTorch Implementation
- Defined a complete CNN class (`ConvoShrimp`) inheriting from `nn.Module` with `__init__` and `forward` methods.
- Built a full training loop: data loading with `DataLoader`, data augmentation with `transforms`, GPU acceleration with `torch.device("cuda")`, training/evaluation mode switching (`model.train()` / `model.eval()`), and `torch.no_grad()` for inference.
- Trained on CIFAR-10 (60,000 images, 10 classes) with batch size 128.

---

## Skills Demonstrated

| Category | Details |
|---|---|
| **Deep Learning Theory** | Neurons, weights, biases, activation functions (ReLU, Sigmoid, Tanh), forward propagation, backpropagation, loss functions, gradient descent, regularization (dropout, batch normalization) |
| **CNN Architecture** | Convolution, pooling, feature extraction, flatten, fully connected layers, softmax classification, architecture evolution (LeNet → EfficientNet) |
| **Generative Models** | Denoising diffusion probabilistic models (DDPMs), noise scheduling, U-Net denoising, image generation from noise |
| **Sequence Models** | Encoder-decoder architecture, attention mechanisms, neural language representation |
| **PyTorch** | `nn.Module` subclassing, training loops, data augmentation, GPU acceleration, optimizer/scheduler configuration |
| **Frontend Engineering** | React 19, Vite, TailwindCSS, Framer Motion, responsive design, scroll-driven animation, PDF generation |
| **Web Development** | Vanilla HTML/CSS/JS, interactive DOM manipulation, zero-dependency static sites |
| **Technical Communication** | Translating ML theory into visual products, educational UX design, academic presentation |

---

## Repository Structure

```
ITAI-2376-Deep-Learning/
├── README.md
├── Lab-02-Neural-Network-Foundations.ipynb         # Lab 02: PyTorch vs. TensorFlow
├── Lab-03-CNN-Image-Classification.ipynb           # Lab 03: CNNs (Puppy or Bagel)
├── Lab-05-RNNs-Transformers-ViT.ipynb             # Lab 05: RNNs, Transformers, ViT
├── Lab-08-Diffusion-Models.pdf                     # Lab 08: Diffusion Models
├── ConvoShrimp/                                    # React/Vite CNN visualization app
│   ├── src/
│   ├── public/
│   └── package.json
├── Neural-Network-Squad/                           # Interactive educational web comic
│   ├── index.html
│   ├── images/
│   └── screenshots/
└── Arrival/                                        # Presentation & report PDFs
    ├── Arrival_Final_Presentation_ITAI_2376.pdf
    └── Arrival_Heptapod_Lab_Report.pdf
```

---

**Course:** ITAI-2376 · Deep Learning  
**Program:** Artificial Intelligence, A.A.S. — Houston City College