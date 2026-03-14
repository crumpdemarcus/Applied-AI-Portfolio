# Neural Network Squad — Interactive Web Comic

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Problem Statement

Neural networks are foundational to modern AI, but their core mechanics — weights, biases, activation functions — are often introduced through dense mathematical notation that creates an unnecessarily high barrier for beginners. There is a need for educational tools that make these concepts intuitive without sacrificing technical accuracy.

## Approach & Methodology

We built a browser-based interactive comic that personifies each neural network concept as an original illustrated character. Rather than relying on abstract equations, the project uses character-driven storytelling and live JavaScript demonstrations to let users *interact* with the math — adjusting weight sliders, watching bias offsets shift outputs, and seeing how ReLU, Sigmoid, and Tanh shape neuron activations in real time.

**Design decisions:**
- **Zero dependencies** — Pure HTML/CSS/JS ensures the project runs in any browser without Node.js, npm, or a build step
- **Character-driven pedagogy** — Each concept (weights, biases, ReLU, Sigmoid, Tanh) is represented by a named character with a visual identity
- **Interactive demos** — Live sliders let users manipulate values and see immediate output changes
- **Responsive layout** — Works across desktop, tablet, and mobile without a CSS framework

## Results & Evaluation

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

## Requirements & Dependencies

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

## Learning Outcomes

- Gained deeper understanding of neural network fundamentals by designing explanations for each concept
- Developed skills in interactive front-end development without framework dependencies
- Practiced designing accessible UX for complex technical content
- Created original visual assets and learned to communicate AI concepts through illustration and storytelling

## License

MIT — see `LICENSE` for details.
