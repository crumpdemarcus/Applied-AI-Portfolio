# Computer Vision — Project Showcase

[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Keras](https://img.shields.io/badge/Keras-D00000?logo=keras&logoColor=white)](https://keras.io/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-orange.svg)](https://jupyter.org/)

## Overview

One production-scale object detection system and two hands-on lab notebooks built during my Computer Vision coursework (ITAI-1378). The work covers the full CV pipeline — image preprocessing, CNN architecture design, transfer learning (VGG, ResNet, MobileNet), data augmentation, and real-time YOLOv8 object detection — applied to both standard benchmarks and a custom workplace safety dataset.

## Projects

### 1. [Workplace Safety PPE Detection System](./Workplace-Safety-PPE-Detection-System/)
**Real-Time Object Detection for Safety Compliance**

A production-ready computer vision system that detects Personal Protective Equipment (PPE) in workplace environments using a custom-trained YOLOv8 model with transfer learning. Detects 10 PPE classes including hard hats, safety vests, gloves, and goggles.

| | |
|---|---|
| **Stack** | Python, YOLOv8, OpenCV, PyTorch |
| **Highlights** | 10-class PPE detection · custom-trained YOLOv8 · transfer learning · comprehensive evaluation metrics · team project |

---

### 2. Lab Notebooks

#### [L04: Computer Vision Fundamentals](./L04_DeMarcusCrump_ITAI_1378.ipynb)

Complete CNN workflow — image preprocessing, data augmentation, custom CNN architectures, transfer learning (VGG16, ResNet50, MobileNetV2), and model evaluation with confusion matrices and accuracy/loss curves.

| | |
|---|---|
| **Tools** | TensorFlow, Keras, OpenCV, NumPy, Matplotlib, Scikit-learn |
| **Techniques** | Custom CNNs, batch normalization, dropout, transfer learning, data augmentation |
| **Outputs** | Training/validation plots, confusion matrices, sample predictions with confidence scores |

---

## Skills Demonstrated

| Category | Details |
|---|---|
| **Image Processing** | Preprocessing pipelines, normalization, color space transforms, augmentation (rotation, flip, zoom, Mixup, Cutout) |
| **Deep Learning** | Custom CNN design, transfer learning (VGG16, ResNet50, MobileNetV2), fine-tuning, batch normalization, dropout |
| **Object Detection** | YOLOv8, real-time multi-class detection, custom dataset training |
| **Model Evaluation** | Accuracy/loss curves, confusion matrices, precision/recall/F1, error analysis |
| **Tools** | TensorFlow, Keras, OpenCV, PyTorch, NumPy, Matplotlib, Scikit-learn, Jupyter |

---

## Repository Structure

```
ITAI-1378-Computer-Vision/
├── Workplace-Safety-PPE-Detection-System/   # YOLOv8 object detection project
│   ├── notebooks/
│   ├── models/
│   ├── data/
│   ├── results/
│   └── README.md
├── L04_DeMarcusCrump_ITAI_1378.ipynb       # Core CV lab
└── results/
```

---

**Course:** ITAI-1378 · Computer Vision & Artificial Intelligence  
**Program:** Artificial Intelligence, A.A.S. — Houston City College
