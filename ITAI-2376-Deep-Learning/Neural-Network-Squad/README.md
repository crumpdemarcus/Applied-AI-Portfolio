# Neural Network Squad — Interactive Web Comic

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Problem Statement

Neural networks are foundational to modern AI, but their core mechanics — weights, biases, activation functions — are often introduced through dense mathematical notation that creates an unnecessarily high barrier for beginners. There is a need for educational tools that make these concepts intuitive without sacrificing technical accuracy.

## Approach and Methodology

We built a browser-based interactive comic that personifies each neural network concept as an original illustrated character. Rather than relying on abstract equations, the project uses character-driven storytelling and live JavaScript demonstrations to let users *interact* with the math — adjusting weight sliders, watching bias offsets shift outputs, and seeing how ReLU, Sigmoid, and Tanh shape neuron activations in real time.

**Design decisions:**
- **Zero dependencies** — Pure HTML/CSS/JS ensures the project runs in any browser without Node.js, npm, or a build step
- **Character-driven pedagogy** — Each concept (weights, biases, ReLU, Sigmoid, Tanh) is represented by a named character with a visual identity
- **Interactive demos** — Live sliders let users manipulate values and see immediate output changes
- **Responsive layout** — Works across desktop, tablet, and mobile without a CSS framework

## Results and Evaluation

- Runs in any modern browser with zero setup or installation
- Fully responsive across desktop, tablet, and mobile viewports
- Interactive demos successfully illustrate how changing weights and biases affect neuron output
- Peer feedback confirmed the character-driven approach made concepts more memorable and accessible than static diagrams

## Key Features

- **Character-Driven Explainers** — Five original characters each represent a neural network concept
- **Interactive Weight & Bias Demos** — Live sliders that adjust values and show outputs in real time
- **Activation Function Visualizations** — ReLU, Sigmoid, and Tanh illustrated through character abilities
- **Zero Dependencies** — Pure HTML/CSS/JS; no npm, no build step, no server required
- **Fully Responsive** — Works across desktop, tablet, and mobile viewports

## The Cast

| Character | Represents | Teaches |
|---|---|---|
| **Wally Weight** | Weights | How input signals are scaled |
| **Bella Bias** | Biases | How baseline offsets shift activation thresholds |
| **Siggy Sigmoid** | Sigmoid | Squashing values to (0, 1) for probability |
| **Tanya Tanh** | Tanh | Centering outputs around zero for balanced gradients |
| **Rex ReLU** | ReLU | Gating negative values to zero for sparse activation |

## Requirements or Dependencies

No installation required. Open `index.html` in any modern browser.

```bash
open index.html
```

## Project Structure

```
Neural-Network-Squad/
├── index.html          # Main entry point
├── images/             # Character illustrations and diagrams
├── screenshots/        # Project screenshots
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

## Sample Data Access

This interactive web comic does not process static datasets. It relies on user input via HTML sliders to dynamically generate output values and visualizations in real-time.

## Learning Outcomes

**How a single neuron computes:**
- A neuron takes multiple inputs, multiplies each by a **weight** (which controls how important that input is), sums them, adds a **bias** (a constant offset that shifts the activation threshold), and passes the result through an **activation function**: `output = activation(Σ(wᵢ · xᵢ) + b)`. I built interactive sliders that let users adjust weight and bias values and watch the output change in real time.

**Weights:**
- Weights are learnable parameters that scale input signals. A weight of 2.0 doubles the input's influence; a weight of 0.5 halves it; a negative weight inverts the signal. During training, backpropagation adjusts weights to minimize the loss function. The network "learns" by finding the right weight values.

**Biases:**
- Bias is an additive constant that shifts the activation function's threshold. Without bias, a neuron with all-zero inputs always outputs zero regardless of weights. Bias gives the network flexibility to activate even when inputs are weak — like giving a neuron a "head start."

**Activation functions — why they matter:**
- Without activation functions, stacking layers of `w·x + b` collapses into a single linear transformation. Activation functions introduce **non-linearity**, which is what allows neural networks to learn complex, curved decision boundaries instead of only straight lines.
- **ReLU** `f(x) = max(0, x)` — Passes positive values unchanged, blocks negatives. Fast to compute, avoids vanishing gradients for positive inputs. Most common in hidden layers.
- **Sigmoid** `σ(x) = 1/(1+e^(-x))` — Squashes output to (0, 1). Useful for binary classification where the output represents a probability. Suffers from vanishing gradients for very large/small inputs.
- **Tanh** `tanh(x)` — Outputs between -1 and +1, centered at zero. Better gradient flow than sigmoid because outputs are zero-centered, which helps in hidden layers.

**Forward propagation:**
- Data flows through the network layer by layer: `Input → (× Weights) → (+ Bias) → Activation → next layer → ... → Output`. This is the "forward pass." During training, the output is compared to the true label using a loss function, and gradients flow backward (backpropagation) to update weights.

**Deep learning = many layers of neurons:**
- A single neuron can only learn simple patterns. When millions of neurons are stacked in layers — each transforming and passing signals forward — the network can learn hierarchical features: edges → textures → parts → objects. This depth is why it's called "deep" learning.

**Web development skills:**
- Built a fully interactive educational comic in pure HTML/CSS/JS with zero dependencies — no Node.js, no build step, no npm. Designed character-driven pedagogy, responsive layouts, and live interactive demos using DOM manipulation and event listeners.

## License

MIT — see `LICENSE` for details.
