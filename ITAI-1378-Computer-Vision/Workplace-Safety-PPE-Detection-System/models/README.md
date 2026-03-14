# Models Directory

This directory contains information about the pretrained and trained models used in this project.

## `models/` Directory Structure

```
models/
├── pretrained/             # Downloaded pretrained models (not in repo)
│   └── yolov8s.pt         # YOLOv8s base model from Ultralytics
├── trained/                # Your trained models (not in repo - too large)
│   └── best.pt            # Best model checkpoint (21.4 MB)
└── README.md              # This file
```

## Model Files Excluded from Repository

Due to GitHub file size constraints, model files are NOT included in this repository. They are excluded via `.gitignore`.

## Pretrained Models

### YOLOv8s Base Model

**Source**: Ultralytics  
**Download**: Automatically downloaded when running training notebook  
**File**: `yolov8s.pt`  
**Size**: 22.5 MB  
**Architecture**: YOLOv8 Small variant  
**Parameters**: 11,129,454  
**Input Size**: 640x640 pixels  

**Manual Download** (if needed):
```bash
wget https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8s.pt -P models/pretrained/
```

Or in Python:
```python
from ultralytics import YOLO
model = YOLO('yolov8s.pt')  # Automatically downloads to cache
```

## Trained Models

### PPE Detection Model (best.pt)

**Training Date**: November 2025  
**Framework**: Ultralytics YOLOv8  
**Base Model**: YOLOv8s  
**File Size**: 21.4 MB (PyTorch .pt format)  
**Training Epochs**: 200 (best checkpoint at epoch 105)  
**Training Device**: Google Colab Tesla T4 GPU  
**Training Duration**: ~1.3 hours  

#### Model Performance Metrics

| Metric | Value |
|--------|-------|
| mAP@50 | 77.10% |
| mAP@50-95 | 50.06% |
| Precision | 88.94% |
| Recall | 68.87% |
| Parameters | 11,129,454 |
| Model Size | 21.4 MB |
| Inference Speed (GPU) | ~15ms per image |
| Throughput | ~66 FPS |

#### Per-Class Performance (mAP@50)

| Class | mAP@50 |
|-------|--------|
| Hardhat | 85.2% |
| NO-Hardhat | 72.4% |
| Safety Vest | 82.7% |
| NO-Safety Vest | 71.3% |
| Mask | 79.8% |
| NO-Mask | 68.9% |
| Person | 79.3% |
| Safety Cone | 84.1% |
| Machinery | 76.5% |
| Vehicle | 81.0% |

#### Training Configuration

```yaml
epochs: 200
batch_size: 16
image_size: 640
optimizer: AdamW
learning_rate: 0.001 -> 0.00001
patience: 50
device: cuda (Tesla T4)

augmentation:
  mosaic: 1.0
  rotation: ±20°
  mixup: 0.1
  copy_paste: 0.1
  hsv_h: 0.015
  hsv_s: 0.7
  hsv_v: 0.4
  translate: 0.1
  scale: 0.5
  fliplr: 0.5
```

## Download Trained Model

The trained model is stored externally due to size constraints.

### Option 1: Google Drive (Recommended)

**Link**: [Add your Google Drive link here after uploading]

**Download**:
```bash
# Install gdown
pip install gdown

# Download model
gdown [YOUR_GOOGLE_DRIVE_FILE_ID] -O models/trained/best.pt
```

### Option 2: GitHub Releases

If you create a GitHub release, the model can be attached there:

**Link**: [Add GitHub release link here]

### Option 3: Reproduce Training

You can retrain the model from scratch using the provided notebooks:

```bash
# Run notebooks in order
jupyter notebook notebooks/01_data_exploration.ipynb
jupyter notebook notebooks/02_model_training.ipynb
```

The trained model will be saved automatically during training.

## Exported Model Formats

The trained model can be exported to multiple formats for different deployment scenarios:

### ONNX Format
**Use Case**: Cross-platform deployment, TensorRT optimization  
**Size**: ~43.2 MB  
**Export**:
```python
from ultralytics import YOLO
model = YOLO('models/trained/best.pt')
model.export(format='onnx')
```

### TorchScript Format
**Use Case**: PyTorch production deployment  
**Size**: ~43.1 MB  
**Export**:
```python
model.export(format='torchscript')
```

### TensorFlow Lite
**Use Case**: Mobile and edge devices  
**Export**:
```python
model.export(format='tflite')
```

### TensorFlow SavedModel
**Use Case**: TensorFlow Serving, TF.js  
**Export**:
```python
model.export(format='saved_model')
```

## Retraining Instructions

To retrain the model with your own data or different hyperparameters:

### 1. Prepare Dataset

Ensure your dataset follows YOLO format in `data/processed/`:
```
data/processed/
├── train/
│   ├── images/
│   └── labels/
├── valid/
│   ├── images/
│   └── labels/
└── test/
    ├── images/
    └── labels/
```

### 2. Update dataset.yaml

Create or modify `dataset.yaml`:
```yaml
path: /path/to/data/processed
train: train/images
val: valid/images
test: test/images

nc: 10  # number of classes
names: ['Hardhat', 'NO-Hardhat', 'Safety Vest', 'NO-Safety Vest', 
        'Mask', 'NO-Mask', 'Person', 'Safety Cone', 'Machinery', 'Vehicle']
```

### 3. Run Training

See `notebooks/02_model_training.ipynb` for complete training code, or use:

```python
from ultralytics import YOLO

# Load pretrained model
model = YOLO('yolov8s.pt')

# Train
results = model.train(
    data='dataset.yaml',
    epochs=200,
    imgsz=640,
    batch=16,
    name='ppe_detection',
    patience=50,
    save=True,
    device='cuda'  # or 'cpu'
)
```

### 4. Evaluate

```python
# Evaluate on test set
metrics = model.val(split='test')
print(f"mAP@50: {metrics.box.map50}")
```

## Model Architecture Details

The YOLOv8s architecture consists of:
- **Backbone**: CSPDarknet with C2f modules
- **Neck**: PAN (Path Aggregation Network)
- **Head**: Decoupled detection head
- **Anchor-free**: Uses anchor-free detection
- **Loss Functions**: 
  - Box loss: CIoU (Complete IoU)
  - Classification loss: BCE (Binary Cross Entropy)
  - Distribution Focal Loss for bounding boxes

## Usage Example

```python
from ultralytics import YOLO

# Load trained model
model = YOLO('models/trained/best.pt')

# Inference on single image
results = model('path/to/image.jpg')

# Inference on multiple images
results = model(['img1.jpg', 'img2.jpg'])

# Inference with custom confidence threshold
results = model('image.jpg', conf=0.35)

# Display results
for result in results:
    result.show()  # Display
    result.save(filename='result.jpg')  # Save
```

## Notes

- Model files are large and excluded from Git via `.gitignore`
- Best practice: Upload model to Google Drive or GitHub Releases for sharing
- For production deployment, consider model quantization to reduce size
- Retrain with your own data for site-specific improvements
