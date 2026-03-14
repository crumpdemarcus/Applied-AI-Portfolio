export const anatomyData = [
  {
    id: "eyes",
    label: "Compound Eyes",
    position: { top: "10%", left: "50%" },
    biological: {
      title: "16 Photoreceptor Types",
      description: "Unlike humans with only 3 color receptors, the mantis shrimp has 16 different photoreceptor types, enabling it to see UV, infrared, and polarized light."
    },
    cnn: {
      title: "Input Layer",
      description: "The input layer receives raw pixel data, typically in RGB format (3 channels). Like the shrimp's eyes, it captures the initial visual information."
    },
    sharedFunction: "Capture different aspects of input data"
  },
  {
    id: "facets",
    label: "Eye Facets",
    position: { top: "15%", left: "35%" },
    biological: {
      title: "Compound Eye Facets",
      description: "Each eye contains thousands of individual facets (ommatidia), each capturing a small portion of the visual field independently."
    },
    cnn: {
      title: "Kernel/Filter Windows",
      description: "Convolutional kernels slide across the image, each examining a local receptive field - a small region of the input."
    },
    sharedFunction: "Local receptive fields for pattern detection"
  },
  {
    id: "midband",
    label: "Midband Region",
    position: { top: "25%", left: "50%" },
    biological: {
      title: "Specialized Midband",
      description: "The midband is a specialized strip of photoreceptors that processes detailed color and polarization information with extreme precision."
    },
    cnn: {
      title: "Conv2D Layers",
      description: "Convolutional layers extract increasingly complex features: edges → textures → patterns → object parts."
    },
    sharedFunction: "Specialized feature extraction"
  },
  {
    id: "ganglia",
    label: "Optical Ganglia",
    position: { top: "40%", left: "50%" },
    biological: {
      title: "Optical Ganglia",
      description: "Pre-processing neural clusters that reduce and compress visual signals before sending them to the brain."
    },
    cnn: {
      title: "Pooling Layers",
      description: "MaxPool or AvgPool layers reduce spatial dimensions by taking the maximum or average value in each region."
    },
    sharedFunction: "Compress while preserving essential information"
  },
  {
    id: "brain",
    label: "Brain",
    position: { top: "55%", left: "50%" },
    biological: {
      title: "Integration Center",
      description: "The mantis shrimp's brain integrates all visual information to make decisions about prey, predators, and mates."
    },
    cnn: {
      title: "Fully Connected Layers",
      description: "Dense layers integrate all extracted features, enabling the network to make high-level decisions."
    },
    sharedFunction: "Integration and high-level reasoning"
  },
  {
    id: "appendage",
    label: "Striking Appendage",
    position: { top: "75%", left: "50%" },
    biological: {
      title: "Fastest Strike in Nature",
      description: "The mantis shrimp's strike accelerates at 10,000g, reaching speeds of 23 m/s - the fastest movement in the animal kingdom."
    },
    cnn: {
      title: "Output Layer (Softmax)",
      description: "The final layer converts processed features into class probabilities, making the decisive classification."
    },
    sharedFunction: "Final decision/classification"
  }
];

export const mappingTable = [
  { biology: "16 Photoreceptor Types", cnn: "Input Channels (RGB+)", function: "Capture different aspects of input" },
  { biology: "Compound Eye Facets", cnn: "Kernel/Filter Windows", function: "Local receptive fields" },
  { biology: "Parallel Eye Processing", cnn: "Parallel Convolutions", function: "Simultaneous feature detection" },
  { biology: "Midband Color Analysis", cnn: "Conv2D Layers", function: "Specialized feature extraction" },
  { biology: "Optical Ganglia", cnn: "Pooling Layers", function: "Compress while preserving signal" },
  { biology: "Brain Hemispheres", cnn: "Fully Connected Layers", function: "Integrate all features" },
  { biology: "Strike Decision", cnn: "Softmax Output", function: "Final classification" }
];
