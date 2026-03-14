export const layerData = {
  input: {
    title: "Input Layer",
    icon: "Image",
    dimensions: "224 × 224 × 3",
    description: "Raw image data in RGB format",
    details: "The input layer receives the raw pixel values of an image. Each pixel has 3 color channels (Red, Green, Blue), each with values from 0-255."
  },
  
  conv1: {
    title: "Convolution Layer 1",
    icon: "Grid3x3",
    dimensions: "224 × 224 × 32",
    filters: 32,
    kernelSize: "3×3",
    description: "Edge and gradient detection",
    details: "The first convolutional layer detects low-level features like edges, corners, and simple gradients. Each of the 32 filters learns to detect a different type of pattern.",
    operation: {
      title: "Convolution Operation",
      explanation: "A small kernel (filter) slides across the input image, computing dot products at each position to create a feature map.",
      formula: "output[i,j] = Σ(input[i+m, j+n] × kernel[m,n])",
      visualization: "kernel_slide"
    }
  },
  
  pool1: {
    title: "Max Pooling",
    icon: "Waves",
    dimensions: "112 × 112 × 32",
    poolSize: "2×2",
    description: "Spatial dimension reduction",
    details: "Max pooling takes the maximum value in each 2×2 region, reducing the spatial dimensions by half while keeping the most prominent features.",
    operation: {
      title: "Max Pooling Operation",
      explanation: "Take the maximum value from each region to downsample the feature map.",
      example: {
        input: [[1, 3, 2, 1], [4, 6, 8, 2], [3, 2, 1, 0], [1, 1, 4, 2]],
        output: [[6, 8], [3, 4]]
      }
    }
  },
  
  conv2: {
    title: "Convolution Layer 2",
    icon: "Grid3x3",
    dimensions: "112 × 112 × 64",
    filters: 64,
    kernelSize: "3×3",
    description: "Texture and pattern detection",
    details: "The second layer combines edges to detect textures and more complex patterns like fur, scales, or fabric weaves."
  },
  
  conv3: {
    title: "Convolution Layer 3",
    icon: "Grid3x3",
    dimensions: "56 × 56 × 128",
    filters: 128,
    kernelSize: "3×3",
    description: "Object part detection",
    details: "Deeper layers detect high-level features like eyes, ears, wheels, or specific object parts."
  },
  
  relu: {
    title: "ReLU Activation",
    icon: "Zap",
    description: "Non-linear activation function",
    details: "ReLU (Rectified Linear Unit) introduces non-linearity by setting all negative values to zero. This allows the network to learn complex patterns.",
    operation: {
      title: "ReLU Function",
      formula: "f(x) = max(0, x)",
      example: {
        input: [-2, 5, -1, 3, -4, 7],
        output: [0, 5, 0, 3, 0, 7]
      },
      purpose: "Introduces non-linearity and helps with gradient flow during training"
    }
  },
  
  flatten: {
    title: "Flatten",
    icon: "Maximize2",
    dimensions: "7 × 7 × 256 → 12,544",
    description: "Convert 3D feature maps to 1D vector",
    details: "The flatten operation converts the 3D feature maps into a 1D vector that can be fed into fully connected layers."
  },
  
  dense: {
    title: "Fully Connected Layers",
    icon: "GitBranch",
    dimensions: "512 → 256",
    description: "High-level feature integration",
    details: "Fully connected (dense) layers integrate all the features extracted by convolutional layers. Each neuron is connected to every neuron in the previous layer."
  },
  
  softmax: {
    title: "Softmax Output",
    icon: "Target",
    dimensions: "num_classes",
    description: "Probability distribution for classification",
    details: "The softmax function converts raw scores (logits) into a probability distribution where all outputs sum to 1.",
    operation: {
      title: "Softmax Function",
      formula: "softmax(x_i) = exp(x_i) / Σexp(x_j)",
      example: {
        logits: [2.0, 1.0, 0.1],
        probabilities: [0.659, 0.242, 0.099]
      },
      purpose: "Provides interpretable probabilities for each class"
    }
  }
};

export const flowSteps = [
  { id: "input", label: "Input", color: "#4ECDC4" },
  { id: "conv1", label: "Conv 1", color: "#9B5DE5" },
  { id: "pool1", label: "Pool", color: "#FF6B6B" },
  { id: "conv2", label: "Conv 2", color: "#9B5DE5" },
  { id: "conv3", label: "Conv 3", color: "#9B5DE5" },
  { id: "flatten", label: "Flatten", color: "#F7DC6F" },
  { id: "dense", label: "Dense", color: "#FF1493" },
  { id: "softmax", label: "Output", color: "#00D4FF" }
];
