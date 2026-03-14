# Sample Images

This folder contains a small selection of sample images from the PPE detection test set for demonstration purposes.

## Contents

- `sample_prediction_1.jpg` - Example validation prediction
- `sample_prediction_2.jpg` - Example validation prediction  
- `sample_prediction_3.jpg` - Example validation prediction
- `sample_training_batch.jpg` - Example training batch with annotations

## Full Dataset

The complete dataset used for training is available from:
- **Source**: [Kaggle - Construction Site Safety Image Dataset](https://www.kaggle.com/datasets/snehilsanyal/construction-site-safety-image-dataset-roboflow)
- **Total Images**: 2,801
- **Classes**: 10 (Hardhat, NO-Hardhat, Safety Vest, NO-Safety Vest, Mask, NO-Mask, Person, Safety Cone, Machinery, Vehicle)

## Dataset Structure

The full dataset is organized as:
```
dataset_resplit/
├── images/
│   ├── train/    (1,955 images)
│   ├── valid/    (423 images)
│   └── test/     (423 images)
└── labels/
    ├── train/
    ├── valid/
    └── test/
```

**Note**: The full dataset is NOT included in this GitHub repository due to size constraints. Download it separately from Kaggle for model training.
