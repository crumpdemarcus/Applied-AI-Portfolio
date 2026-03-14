# Dataset Documentation

## Overview

This directory contains the dataset used for training and evaluating the **Workplace Safety PPE Detection System**. The full dataset is not included in this repository due to size constraints, but sample images are provided for demonstration purposes.

## Dataset Information

**Name**: Construction Site Safety Image Dataset  
**Source**: [Kaggle - Roboflow Construction Site Safety](https://www.kaggle.com/datasets/snehilsanyal/construction-site-safety-image-dataset-roboflow)  
**Size**: 2,801 images  
**Format**: YOLO format (images + text annotations)  
**License**: Public dataset (check Kaggle for specific license terms)

## `data/` Directory Structure

```
data/
├── raw/                    # Original downloaded dataset (not in repo)
│   ├── train/
│   ├── valid/
│   └── test/
├── processed/              # Preprocessed dataset with stratified split (not in repo)
│   ├── train/             # 70% - 1,955 images
│   ├── valid/             # 15% - 423 images
│   └── test/              # 15% - 423 images
└── sample/                 # Sample images for demo (included in repo)
    ├── sample_prediction_1.jpg
    ├── sample_prediction_2.jpg
    ├── sample_prediction_3.jpg
    └── sample_training_batch.jpg
```

## Classes

The dataset contains 10 object classes for PPE detection:

| Class ID | Class Name | Description |
|----------|------------|-------------|
| 0 | Hardhat | Worker wearing hardhat (compliance) |
| 1 | NO-Hardhat | Worker without hardhat (violation) |
| 2 | Safety Vest | Worker wearing safety vest (compliance) |
| 3 | NO-Safety Vest | Worker without safety vest (violation) |
| 4 | Mask | Worker wearing mask (compliance) |
| 5 | NO-Mask | Worker without mask (violation) |
| 6 | Person | Person detected in scene |
| 7 | Safety Cone | Traffic/safety cone |
| 8 | Machinery | Construction machinery/equipment |
| 9 | Vehicle | Construction vehicle |

## Dataset Statistics

| Metric | Value |
|--------|-------|
| Total Images | 2,801 |
| Training Images | 1,955 (70%) |
| Validation Images | 423 (15%) |
| Test Images | 423 (15%) |
| Total Annotations | ~21,000+ |
| Average Objects per Image | 7-8 |
| Image Resolution | Varies (resized to 640x640 for training) |

## Data Collection

The original dataset was collected from:
- Construction site surveillance footage
- Worker safety monitoring cameras
- Public construction site images
- Annotated by Roboflow community

## Preprocessing Steps

1. **Stratified Split**: Dataset split into 70/15/15 train/val/test maintaining class distribution
2. **Image Resizing**: All images resized to 640x640 pixels
3. **Format Conversion**: Annotations in YOLO format (class x_center y_center width height)
4. **Quality Control**: Removed images with poor quality or incorrect annotations

## Data Augmentation

During training, the following augmentations were applied:
- Mosaic augmentation (combines 4 images)
- Rotation: ±20 degrees
- Mixup: 0.1 (blends two images)
- Copy-paste: 0.1 (pastes objects from one image to another)
- HSV color jittering: H=0.015, S=0.7, V=0.4
- Translation: ±10%
- Scale: ±50%
- Horizontal flip: 50% probability

## Download Instructions

### Option 1: Kaggle API (Recommended)

1. Install Kaggle API:
```bash
pip install kaggle
```

2. Get your Kaggle API credentials:
   - Go to https://www.kaggle.com/account
   - Click "Create New API Token"
   - Download `kaggle.json`

3. Configure credentials (on local machine):
```bash
mkdir -p ~/.kaggle
mv kaggle.json ~/.kaggle/
chmod 600 ~/.kaggle/kaggle.json
```

4. Download dataset:
```bash
kaggle datasets download -d snehilsanyal/construction-site-safety-image-dataset-roboflow
unzip construction-site-safety-image-dataset-roboflow.zip -d data/raw/
```

### Option 2: Manual Download

1. Visit: https://www.kaggle.com/datasets/snehilsanyal/construction-site-safety-image-dataset-roboflow
2. Click "Download" button
3. Extract to `data/raw/` folder

### Option 3: Google Colab (Used in this project)

See `notebooks/01_data_exploration.ipynb` for complete download and setup code using Kaggle API in Colab.

## Citation

If you use this dataset, please cite:

```
@dataset{construction_site_safety_2023,
  title={Construction Site Safety Image Dataset},
  author={Roboflow Universe},
  year={2023},
  publisher={Kaggle},
  url={https://www.kaggle.com/datasets/snehilsanyal/construction-site-safety-image-dataset-roboflow}
}
```

## Notes

- Full dataset (~1.5 GB) is NOT included in this GitHub repository
- Only sample images are included in `data/sample/` for demonstration
- Large dataset files are excluded via `.gitignore`
- Download the full dataset using instructions above to reproduce training results
