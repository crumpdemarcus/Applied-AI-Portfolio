# Model Results & Performance Analysis

This directory contains the comprehensive performance data, evaluation metrics, and visual images by the **Workplace Safety PPE Detection System**. The results confirm that the **YOLOv8s (Small)** model is production-ready, achieving a **77.1% mAP@50** with highly reliable precision for safety-critical monitoring.

---

## `results/` Directory Structure

* **`metrics.txt`**: A concise summary of top-level KPIs (Key Performance Indicators).
* **`evaluation_report_comprehensive.txt`**: A deep-dive textual analysis including per-class breakdowns and deployment recommendations.
* **`training_metrics.csv`**: This raw CSV file contains the second-by-second history of the training run (rows and columns).
* **`visualizations/`**: Generated charts and plots (Confusion Matrix, PR Curves) created during training and evaluation.
* **`images/`**: Sample predictions showing the model detecting PPE on unseen test images.
* **`External Images (Unseen Data)/`**: Test the model's generalization ability by running it on completely new construction site images that were NOT part of our training, validation, or test sets. 

```
results/
├── README.md                   # Model Results & Performance Analysis documentation
├── metrics.txt                 # Performance metrics
├── evaluation_report_comprehensive.txt  # Detailed evaluation
├── training_metrics.csv        # Training history
├── external images(unseen data)/  # Testing the model on Unseen Data not from the kaggle set
│   ├── external_test_1.jpg
│   ├── external_test_1.jpg
│   └── external_test_1.jpg        
├── images/                     # Training visualization images
│   ├── train_batch0.jpg
│   └── val_batch0_pred.jpg         
├── Visulaizations/             # Evaluation charts
    ├── BoxF1_curve.png
    ├── BoxPR_curve.png
    ├── BoxP_curve.png
    ├── BoxR_curve.png
    ├── confusion_matrix.png
    ├── confusion_matrix_normalized.png
    └──  results.png
```

---

## Key Performance Metrics

The following statistics are sourced directly from `metrics.txt` and represent the model's performance on the unseen Test Set (15% of total data).

### **Overall Performance**
| Metric | Score | Interpretation |
| :--- | :--- | :--- |
| **mAP@50** | **77.10%** | **(Primary Metric)** The model's overall accuracy is strong for this task. |
| **Precision** | **88.94%** | The model rarely raises false alarms. If it says a worker is unsafe, they probably are. |
| **Recall** | **68.87%** | The model detects most objects but may miss some in difficult lighting or occlusion. |
| **mAP@50-95**| **50.06%** | A strict metric showing the bounding boxes are very tight and accurate to the object shapes.

### **Speed & Efficiency**
* **Inference Speed**: ~15ms per image (on T4 GPU).
* **Throughput**: ~66 Frames Per Second (FPS).
* **Conclusion**: The system is fully capable of **real-time video processing**.

---

## Per-Class Analysis

Detailed breakdown of how well the model detects specific items, sourced from `evaluation_report_comprehensive.txt`.

| Class | Accuracy (mAP@50) | Status | Analysis |
| :--- | :--- | :--- | :--- |
| **Hardhat** | **85.2%** | Excellent | Primary safety gear is detected very reliably. |
| **Safety Vest** | **82.7%** | Excellent | High visibility makes vests easy to spot. |
| **Vehicle** | **81.0%** | Excellent | Large machinery/trucks are detected accurately. |
| **Mask** | **79.8%** | Good | Small objects, but the model handles them well. |
| **NO-Hardhat** | **72.4%** | Moderate | Detecting the *absence* of a hat is harder than detecting the hat itself. |
| **NO-Vest** | **71.3%** | Moderate | Often confused with generic "Person" detections. |

---

## Visualizations Explained

This section explains the charts generated in the `visualizations/` subfolder.

### **1. Confusion Matrix**
`visualizations/confusion_matrix.png`
* **What it is:** A grid showing where the model gets confused.
* **Key Insight:** You will likely see some confusion between **"Person"** and **"NO-Safety Vest"**. This is expected because a person without a vest looks very similar to a generic person class.
* **Why it matters:** It tells us where we need more training data (e.g., more images of workers wearing regular clothes).

### **2. Precision-Recall Curve**
`visualizations/PR_curve.png`
* **What it is:** A graph showing the trade-off between Precision (fewer false alarms) and Recall (fewer missed items).
* **Key Insight:** Our curve (mAP@50 = 77.1%) is pushed towards the top-right, indicating a high-performing model.

### **3. Sample Predictions (Test Set)**
`images/val_batch0_pred.jpg`
* **What it is:** Actual images from the internal test set with bounding boxes drawn by the AI.
* **Look for:**
    * **Green Boxes:** Compliant PPE (Hardhat, Vest).
    * **Red/Orange Boxes:** Violations (NO-Hardhat, NO-Mask).
    * **High Confidence:** Scores above 0.80 indicate the model is very sure of itself.

---

## External Testing (Unseen Data)

This section showcases results from **Notebook 04 (Demo)**, where we tested the model on images sourced from the internet that were **not** part of the Kaggle dataset. This tests the model's **"Generalization"**—its ability to work in the real world, not just on the test quiz.

### **The Generalization Test**
* **Source:** Interactive Demo (Bonus Section)
* **Assessment:** **STRONG**. The model successfully generalized to new environments.
* **Confidence Levels:** Maintained high confidence (>70%) even on images with different lighting and camera angles.

### **Demo Gallery**
*These predictions demonstrate the model's robustness in real-world scenarios.*

**1. Compliance Detection**
`images/external_test_1.jpg`
* **Scenario:** Worker walking with full gear.
* **Result:** Successfully Detected **Hardhat** and **Safety Vest** correctly with high confidence.

**2. Violation Detection**
`images/external_test_2.jpg`
* **Scenario:** Worker without a helmet.
* **Result:** Detected **NO-Hardhat** (Violation Alert Triggered). This proves the model can catch safety breaches.

**3. Complex Scene**
`images/external_test_3.jpg`
* **Scenario:** Multiple workers and heavy machinery in a busy environment.
* **Result:** Successfully separated **Machinery** from **Person** detections, proving it handles crowded backgrounds well.

---

## Deployment Recommendation

Based on the `evaluation_report_comprehensive.txt`, here is how to best use this model in the real world.

1.  **Confidence Threshold**: Set the detection threshold to **0.35 - 0.40**. This filters out weak predictions while catching most safety violations.
2.  **Video Verification**: Since video has many frames, use "multi-frame verification" (e.g., only trigger an alert if a violation is seen in 3 consecutive frames) to stop flickering alerts.
3.  **Human-in-the-Loop**: The 88.9% precision is high, but for critical safety, a human safety manager should verify alerts.

---

*For raw data, please refer to `metrics.txt` and `evaluation_report_comprehensive.txt` in this folder.*
