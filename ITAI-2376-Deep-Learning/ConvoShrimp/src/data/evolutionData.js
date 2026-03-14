export const evolutionData = [
  {
    year: 1989,
    name: "LeNet",
    title: "The Ancestor",
    creator: "Yann LeCun",
    color: "#4ECDC4",
    parameters: "~60,000",
    layers: 2,
    highlights: [
      "First successful CNN application",
      "Used for digit recognition (MNIST)",
      "Proved convolution works for vision",
      "Introduced convolution + pooling pattern"
    ],
    significance: "The founding architecture that demonstrated CNNs could learn visual features from raw pixels.",
    isBreakthrough: false
  },
  {
    year: 1998,
    name: "LeNet-5",
    title: "The Refined One",
    creator: "Yann LeCun et al.",
    color: "#9B5DE5",
    parameters: "~60,000",
    layers: 7,
    highlights: [
      "7 trainable layers",
      "Used by banks for check recognition",
      "Gradient-based learning",
      "First practical commercial CNN"
    ],
    significance: "The refined version that proved CNNs could work in real-world production systems.",
    isBreakthrough: false
  },
  {
    year: 2012,
    name: "AlexNet",
    title: "The Revolution",
    creator: "Alex Krizhevsky",
    color: "#FF1493",
    parameters: "~60 million",
    layers: 8,
    highlights: [
      "Won ImageNet by 10%+ margin",
      "Introduced ReLU activation",
      "First to use GPU training",
      "Dropout for regularization",
      "STARTED THE DEEP LEARNING BOOM"
    ],
    significance: "The breakthrough that proved deep learning was superior to hand-crafted features, launching the modern AI era.",
    isBreakthrough: true
  },
  {
    year: 2014,
    name: "VGGNet",
    title: "The Deep One",
    creator: "Oxford VGG Group",
    color: "#F7DC6F",
    parameters: "~138 million",
    layers: 19,
    highlights: [
      "16-19 layers deep",
      "Showed that depth matters",
      "Uniform 3x3 filters throughout",
      "Simple, elegant architecture",
      "Still used as feature extractor"
    ],
    significance: "Demonstrated that network depth is crucial, establishing the pattern of using small (3x3) filters consistently.",
    isBreakthrough: false
  },
  {
    year: 2014,
    name: "GoogLeNet",
    title: "The Efficient One",
    creator: "Google Research",
    color: "#00D4FF",
    parameters: "~5 million",
    layers: 22,
    highlights: [
      "Inception modules (parallel filters)",
      "22 layers but only 5M parameters",
      "1x1 convolutions for efficiency",
      "Multiple auxiliary classifiers",
      "12x fewer parameters than AlexNet"
    ],
    significance: "Proved that clever architecture design could achieve great results with fewer parameters.",
    isBreakthrough: false
  },
  {
    year: 2015,
    name: "ResNet",
    title: "The Skip Master",
    creator: "Microsoft Research",
    color: "#FF6B6B",
    parameters: "~25-60 million",
    layers: 152,
    highlights: [
      "Skip/residual connections",
      "Enabled 152+ layer networks",
      "Solved vanishing gradient problem",
      "Won ImageNet 2015",
      "Still widely used as backbone"
    ],
    significance: "The innovation of residual connections enabled training extremely deep networks and remains influential today.",
    isBreakthrough: true
  },
  {
    year: 2019,
    name: "EfficientNet",
    title: "The Balanced One",
    creator: "Google Brain",
    color: "#9B5DE5",
    parameters: "5-66 million",
    layers: "varies",
    highlights: [
      "Compound scaling method",
      "Optimal width/depth/resolution",
      "State-of-the-art efficiency",
      "Neural architecture search designed",
      "Best accuracy per FLOP"
    ],
    significance: "Showed that systematically scaling network dimensions achieves optimal efficiency.",
    isBreakthrough: false
  }
];
