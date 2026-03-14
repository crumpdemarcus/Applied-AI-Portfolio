export const cardData = {
  name: "CONVOSHRIMP",
  subtitle: "Convolutional Neural Network",
  hp: 2048,
  types: [
    { icon: "Eye", label: "VISION" },
    { icon: "Zap", label: "PARALLEL PROCESSING" }
  ],
  stage: "LEGENDARY",
  abilities: [
    {
      icon: "Grid3x3",
      name: "CONVOLUTION STRIKE",
      damage: 64,
      description: "Slides kernel filters across input to detect edges, textures, and patterns.",
      flavor: "Extracts features the naked eye cannot see."
    },
    {
      icon: "Waves",
      name: "POOLING WAVE",
      damage: 32,
      description: "Compresses spatial dimensions while preserving the most important features.",
      flavor: "Efficiency through intelligent reduction."
    },
    {
      icon: "Zap",
      name: "RELU PUNCH",
      damage: 48,
      description: "Introduces non-linearity by zeroing negative values. f(x) = max(0, x)",
      flavor: "Only the strong signals survive."
    },
    {
      icon: "Target",
      name: "SOFTMAX VISION",
      damage: 128,
      isUltimate: true,
      description: "Converts raw scores into probability distribution for final classification.",
      flavor: "Strikes with mathematical certainty."
    }
  ],
  weakness: { icon: "Clock", label: "Sequential/Temporal Data" },
  strength: { icon: "Image", label: "Spatial Pattern Recognition" },
  setInfo: { name: "Neural Network Zoo", number: "001/025", rarity: "LEGENDARY" },
  
  // Back of card
  lore: {
    classification: "Stomatopoda Convolutionalis",
    discovered: "1989 (LeCun et al.)",
    habitat: "Image data, video streams, spatial data",
    story: `In the depths of the data ocean, ConvoShrimp evolved 16 spectral channels while other creatures could only see three. Its compound eyes process millions of pixels in parallel, detecting patterns invisible to lesser beings.

Ancient texts speak of ConvoShrimp's legendary victory at ImageNet 2012, where it reduced error rates by 40% and changed the course of deep learning history forever.

With the fastest visual processing strike in the neural kingdom, ConvoShrimp dominates all tasks requiring spatial pattern recognition.`
  },
  specs: [
    { param: "Input Channels", value: "3 (RGB) to N" },
    { param: "Kernel Sizes", value: "3x3, 5x5, 7x7 typical" },
    { param: "Pooling Types", value: "Max or Average" },
    { param: "Activation", value: "ReLU family" },
    { param: "Output Layer", value: "Softmax / Sigmoid" },
    { param: "Training Method", value: "Backpropagation + SGD" }
  ]
};
