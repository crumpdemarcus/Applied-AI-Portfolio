# Portfolio Presentation — Speaker Notes & Content
## Pf_DeMarcusCrump_ITAI2376

> **How to use this file:**
> 1. Open Google Slides or PowerPoint
> 2. Create 5 slides using the content below (keep slides visual — 20-30 words max per slide)
> 3. Put the longer text in **speaker notes**, not on the slide face
> 4. Export as **Pf_DeMarcusCrump_ITAI2376.pdf** and place in this `Presentation/` folder
> 5. GitHub link must appear on at least 2 slides

---

## Slide 1 — Title Slide

**On the slide:**

> **DeMarcus Crump**
> Applied AI Portfolio
>
> Artificial Intelligence, A.A.S. — Houston City College
>
> 🔗 github.com/dcthedeveloper/DeMarcus-Crump-AI-Portfolio

**Speaker notes:**
My name is DeMarcus Crump. I'm completing an Associate of Applied Science in Artificial Intelligence at Houston City College. This portfolio represents four semesters of coursework spanning computer vision, AI applications, natural language processing, and deep learning. Every project is documented and runnable from the GitHub repository linked on this slide.

---

## Slide 2 — What I Built (Featured Projects)

**On the slide** (use a 2×2 grid or card layout with project name + one-line description + tech icons):

| Project | What It Does |
|---|---|
| **ConvoShrimp** | Interactive CNN visualizer — React + PyTorch |
| **Aura Intelligence** | AI fragrance marketing — Flask + Groq LLM |
| **AgentHub** | Blockchain AI marketplace — Smart contracts + ML |
| **NuVision News** | NLP news analysis — React + Sentiment API |

**Speaker notes:**
These are four of my strongest projects across the program.

**ConvoShrimp** is a React 19 application that teaches Convolutional Neural Network architecture through a biological analogy with the mantis shrimp visual system. Users walk through convolution, pooling, feature extraction, and classification via scroll-driven animation, with embedded PyTorch code examples. The production build compiles 2,365 modules in under 3 seconds.

**Aura Intelligence** is a Flask web application that uses Groq's Llama 3.3 model to generate luxury fragrance marketing content. It has three specialized AI agents — a Storyteller for narrative content, a Curator for conversational recommendations, and a Science engine for ingredient analysis — with real-time streaming via Server-Sent Events.

**AgentHub** is a blockchain-powered marketplace for autonomous AI agents. I built a custom blockchain with SHA-256 hashing, a smart contract escrow system, and a machine learning validator that achieves 92% accuracy for automated quality enforcement.

**NuVision News** is a full-stack news analysis platform built with TypeScript, React, and Node.js. It performs real-time sentiment analysis, topic clustering, bias detection, and conversational search across 2,000+ articles.

---

## Slide 3 — What I Learned in Deep Learning (ITAI-2376)

**On the slide** (use a layered diagram or bullet icons):

> **Neural Network Fundamentals**
> Weights · Biases · ReLU / Sigmoid / Tanh · Forward & Backpropagation
>
> **CNN Architecture**
> Convolution → Pooling → BatchNorm → Dropout → Dense → Softmax
>
> **Generative Models**
> Diffusion (DDPMs) · Noise scheduling · U-Net denoising
>
> **Sequence Models**
> Encoder-decoder · Attention mechanisms

**Speaker notes:**
In this course I learned deep learning from the ground up.

For neural network fundamentals, I studied how a single neuron computes output = activation(W·x + b), why activation functions like ReLU, Sigmoid, and Tanh introduce non-linearity, and how backpropagation computes gradients to update weights through a network. I built interactive sliders in the Neural Network Squad project that let users manipulate weight and bias values and watch the output change in real time.

For CNNs, I learned each layer's role: convolutional layers slide 3×3 kernels across images to detect features (edges → textures → objects), max pooling reduces spatial dimensions while keeping the strongest activations, batch normalization stabilizes training, dropout prevents overfitting, and softmax produces class probabilities. I studied the architecture evolution from LeNet (1989) through AlexNet, VGGNet, GoogLeNet, ResNet, to EfficientNet (2019).

For generative models, I completed a lab on denoising diffusion probabilistic models — learning how the forward process adds noise step-by-step, and the reverse process trains a U-Net to denoise one step at a time, generating images from pure random noise.

For sequence models, the Arrival project explored encoder-decoder architectures and attention mechanisms for neural language processing.

In PyTorch, I defined a full CNN class inheriting from nn.Module, built training loops with DataLoader, data augmentation, Adam optimizer, learning rate scheduling, and trained on CIFAR-10 (60K images, 10 classes).

---

## Slide 4 — Technical Skills

**On the slide** (use a clean icon grid — one row per category):

| | |
|---|---|
| **Languages** | Python · JavaScript · TypeScript |
| **AI / ML** | PyTorch · TensorFlow · Keras · Scikit-learn |
| **NLP** | NLTK · spaCy · Sentiment Analysis · NER |
| **LLMs** | Groq API · OpenAI API · Prompt Engineering |
| **Frontend** | React · Vite · TailwindCSS · Framer Motion |
| **Backend** | Flask · Node.js · REST APIs · SSE |
| **Other** | Git · Blockchain · Jupyter · Google Colab |

**Speaker notes:**
My technical skills span the full AI development stack. On the ML side, I've worked with PyTorch for deep learning, TensorFlow and Keras for computer vision, and Scikit-learn for traditional ML. For NLP I've used NLTK, spaCy, and production sentiment analysis APIs. I've integrated large language models through Groq and OpenAI APIs with prompt engineering. On the engineering side, I build frontends in React with TypeScript, Vite, and TailwindCSS, and backends in Flask and Node.js. I also built a custom blockchain implementation with SHA-256 cryptographic hashing and smart contracts.

---

## Slide 5 — What I Bring & Contact

**On the slide:**

> **Full-Stack AI Development** — Frontend + Backend + ML in one developer
>
> **Ship Production-Ready Products** — Documented, buildable, deployable
>
> **Explain Complex AI Clearly** — Built interactive tools that teach CNNs and neural networks
>
> 📧 crumpdemarcus@gmail.com
> 🔗 linkedin.com/in/demarcus-crump
> 🐙 github.com/dcthedeveloper/DeMarcus-Crump-AI-Portfolio

**Speaker notes:**
What I bring to an employer is the ability to work across the full AI stack — from training models in PyTorch to building the React frontend that surfaces them. Every major project in this portfolio is buildable, runnable, and documented. I've demonstrated that I can explain complex AI concepts visually through products like ConvoShrimp and Neural Network Squad, which is valuable for teams that need to communicate technical work to stakeholders. I'm looking for roles in AI/ML engineering, full-stack AI development, or AI product development. My contact information and the full portfolio are on this slide. Thank you.

---

## Production Checklist

- [ ] Create 5 slides in Google Slides or PowerPoint
- [ ] Keep slide face to 20-30 words max; put details in speaker notes
- [ ] Font size ≥ 24pt on all slides
- [ ] Add screenshots (ConvoShrimp, Aura Intelligence, NuVision News)
- [ ] GitHub link appears on slides 1 and 5
- [ ] Export as `Pf_DeMarcusCrump_ITAI2376.pdf`
- [ ] Place PDF in `Presentation/` folder
- [ ] Test link in presentation mode
