# AI Usage Log - PPE Detection Project
**Team**: DeMarcus Crump & Chloe Tu  
**Course**: ITAI 1378 - Final Project  
**Date**: October - November 2025

---

## Overview

This log documents how we used AI tools (ChatGPT-4, Claude, GitHub Copilot) throughout our project. We used AI as a **research assistant and learning tool**, not to replace our thinking or decision-making.

**Key Principle**: We researched → AI explained → We decided → AI helped implement

---

## Log Entries

### 1. Researching Real-World CV Applications

**Date**: October 21, 2025 | **Tool**: ChatGPT-4

**Our Question:**
> "What are real-world problems that can be solved with computer vision?"

**Context:**
We needed to choose a project topic. We wanted something impactful, not just a basic classification model.

**What AI Explained:**
Listed several applications: healthcare (disease detection), manufacturing (defect detection), workplace safety (PPE detection), retail, agriculture. Explained that workplace safety was a significant problem where CV could save lives.

**What We Learned:**
- Computer vision has many practical applications
- Workplace safety consistently mentioned as high-impact area
- PPE detection could prevent injuries/deaths on construction sites

**Our Decision:**
✓ **Chose construction site safety** - This felt like a serious matter that could genuinely help people  
✓ Picked this over other options because of real-world impact potential

---

### 2. Finding the Right Dataset

**Date**: October 23, 2025 | **Tool**: ChatGPT-4

**Our Question:**
> "Where can we find construction site PPE datasets for YOLO?"

**Context:**
We knew we needed labeled data but didn't know where to find quality datasets or what to look for.

**What AI Explained:**
- Recommended Kaggle as starting point for pre-labeled datasets
- Explained YOLO format (`.txt` files with bounding box coordinates)
- Suggested minimum 500-1000 images per class
- Mentioned Roboflow Universe as alternative

**Our Search:**
We searched Kaggle for "construction site safety PPE" and found several options. We reviewed:
- Class distributions
- Image quality
- Annotation format
- Dataset size

**Dataset We Selected:**
**Construction Site Safety Image Dataset (Roboflow)**  
Source: https://www.kaggle.com/datasets/snehilsanyal/construction-site-safety-image-dataset-roboflow

Why we chose it:
- 2,800+ images with YOLO format annotations
- 10 balanced classes (Hardhat, NO-Hardhat, Safety Vest, NO-Safety Vest, Person, Mask, NO-Mask, Safety Cone, Machinery, Vehicle)
- Professional quality images
- Already had train/val/test split (though we later changed this)

**Our Decision:**
✓ Selected this specific dataset after comparing options  
✓ Verified it had the classes we needed for comprehensive PPE detection

---

### 3. Understanding Dataset Splits

**Date**: October 28, 2025 | **Tool**: ChatGPT-4

**Our Question:**
> "The dataset is already split, but the ratio seems off. Can we re-split it? Will that affect accuracy?"

**Context:**
The original split wasn't ideal (not stratified, uneven distribution). We wanted to know if re-splitting professionally prepared data was okay.

**What AI Explained:**
- Standard split ratios: 70% train / 15% validation / 15% test
- **Stratified splitting** important to maintain class balance across all splits
- Re-splitting is fine and actually better if original split isn't stratified
- Explained how to implement stratified split in Python

**What We Learned:**
- Train/val/test splits should maintain class proportions
- Re-splitting doesn't hurt accuracy if done correctly
- Stratification prevents some classes being over-represented in certain splits

**Our Decision:**
✓ Re-split the dataset ourselves using stratified sampling  
✓ Used 70/15/15 ratio for better class balance

---

### 4. Setting Up Kaggle API & Google Colab

**Date**: October 29, 2025 | **Tool**: ChatGPT-4 + GitHub Copilot

**Our Questions:**
> "How do we download Kaggle datasets in Google Colab?"  
> "Where do we get the Kaggle API credentials?"

**Context:**
We needed to download our dataset into Colab but didn't know the workflow.

**What AI Explained:**
- Need to create Kaggle API token (kaggle.json) from Kaggle account settings
- Upload token to Colab and set permissions
- Use `kaggle datasets download` command
- Explained the security importance of 600 permissions on credentials

**Code AI Generated:**
```python
!pip install -q kaggle
!mkdir -p ~/.kaggle
!cp kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json
!kaggle datasets download -d snehilsanyal/construction-site-safety-image-dataset-roboflow
```

**What We Did:**
1. Created Kaggle API token ourselves
2. Uploaded kaggle.json to Colab
3. Used AI-generated code to download dataset
4. Verified download was successful

---

### 5. Google Drive Persistence Issue

**Date**: November 4, 2025 | **Tool**: Claude

**Problem We Discovered:**
After closing Colab and reopening, our dataset was gone! Everything in `/content/` disappeared.

**Our Question:**
> "Why does my dataset disappear every time I restart Colab? How do I save it permanently?"

**What AI Explained:**
- `/content/` is ephemeral storage - gets wiped when session ends
- Need to use Google Drive for persistence across sessions
- Showed how to mount Drive and update all paths
- Explained this is critical for notebooks to work together

**Solution AI Provided:**
```python
from google.colab import drive
drive.mount('/content/drive')
```

Updated all paths to:
- Dataset: `/content/drive/MyDrive/PPE_Project/dataset_resplit/`
- Models: `/content/drive/MyDrive/PPE_Project/runs/detect/`
- YAML: `/content/drive/MyDrive/PPE_Project/dataset.yaml`

**What We Learned:**
- Colab sessions are temporary
- Google Drive integration essential for multi-notebook projects
- ALL notebooks need to mount Drive at the start

**Our Decision:**
✓ Re-ran Notebook 1 to save dataset to Google Drive  
✓ Added Drive mounting to all notebooks  
✓ Created persistent folder structure

---

### 6. Choosing YOLO Model Version

**Date**: November 7, 2025 | **Tool**: ChatGPT-4

**Our Question:**
> "Which YOLO model should we use? What's the difference between YOLOv8n, s, m, l, x?"

**Context:**
We knew we wanted YOLOv8 (latest version) but didn't understand the variants.

**What AI Explained:**
Model variants from smallest to largest:
- **YOLOv8n (Nano)**: 3M parameters, fastest, ~70-75% accuracy
- **YOLOv8s (Small)**: 11M parameters, good balance, ~75-80% accuracy
- **YOLOv8m (Medium)**: 25M parameters, high accuracy, ~80-85% accuracy
- **YOLOv8l/x**: Largest, best accuracy but slow

Trade-offs:
- Smaller = faster inference but lower accuracy
- Larger = better accuracy but slower + more training time

**What We Learned:**
- Model choice depends on deployment needs (speed vs accuracy)
- For learning/testing, start with smaller model
- Can always upgrade later if needed

**Our Decision:**
✓ Started with YOLOv8n for fast initial testing  
✓ Later upgraded to YOLOv8s for better accuracy (after seeing baseline results)

---

### 7. Understanding Training Hyperparameters

**Date**: November 10, 2025 | **Tool**: ChatGPT-4

**Our Question:**
> "What do all these training parameters mean? epochs, batch, lr0, patience, etc.?"

**Context:**
Looking at YOLO training config, we saw tons of parameters and didn't know what they did.

**What AI Explained:**
Key parameters:
- **epochs**: Complete passes through dataset (more = better learning, but can overfit)
- **batch**: Images processed together (limited by GPU memory)
- **patience**: Early stopping if no improvement (prevents overfitting)
- **lr0/lrf**: Learning rates (how fast model learns)
- **mosaic, degrees, mixup**: Data augmentation techniques

**What We Learned:**
- Don't need to understand EVERY parameter perfectly
- Some parameters more important than others
- Data augmentation helps model generalize better

**Our Decisions:**
✓ Used 100 epochs initially (AI recommended starting point)  
✓ Later increased to 200 epochs for higher accuracy  
✓ Kept recommended augmentation settings

---

### 8. Debugging: Results Mismatch

**Date**: November 14, 2025 | **Tool**: GitHub Copilot

**Critical Problem:**
We trained YOLOv8s for 200 epochs and got 80.5% mAP@50. But Notebook 2 was showing 71% and 3M parameters (YOLOv8n) instead of 11M!

**Our Question:**
> "I trained for 2 hours but the notebook is loading the wrong model. Why is it showing 3 million parameters instead of 11 million?"

**What AI Discovered:**
YOLO creates numbered folders for each training run:
- `ppe_detection` (our first 100-epoch run)
- `ppe_detection2`, `ppe_detection3`
- `ppe_detection4` (our latest 200-epoch run)

Problem: Code was hardcoded to load from `ppe_detection` (the FIRST run), not the latest!

**Solution AI Provided:**
```python
import glob
run_folders = glob.glob('/content/drive/.../ppe_detection*')
latest_run = max(run_folders, key=os.path.getmtime)  # Get most recent
best_model = YOLO(f'{latest_run}/weights/best.pt')
```

**What We Learned:**
- ALWAYS verify which model is actually loading
- Dynamic path finding better than hardcoding
- Check parameter count to verify correct model

**Our Decision:**
✓ Updated ALL notebooks (2, 3, 4) to use dynamic latest_run detection  
✓ Added model path display to confirm correct loading  
✓ Verified 11M parameters after fix

---

### 9. Code Generation for Visualizations

**Date**: November 18, 2025 | **Tool**: GitHub Copilot

**Our Question:**
> "How do I create visualizations showing detection results with bounding boxes and labels?"

**Context:**
Needed to display model predictions visually for the demo notebook.

**What AI Generated:**
Complete visualization function with:
- Image loading and preprocessing
- Bounding box drawing
- Label and confidence score display
- Color-coded by class

**What We Modified:**
- Changed color scheme to match our project theme
- Added confidence threshold parameter
- Improved label positioning for readability
- Added legend for classes

**What We Learned:**
- Visualization code is not a CV learning objective
- AI-generated boilerplate saved time for non-core tasks
- We still understood and modified the generated code

**Why This Was Okay:**
Visualization is a utility function, not the main learning goal. We focused our learning on YOLO architecture, training, and evaluation metrics instead.

---

### 10. Understanding Evaluation Metrics

**Date**: November 25, 2025 | **Tool**: ChatGPT-4

**Our Question:**
> "What's the difference between mAP@50 and mAP@50-95? Which one should we care about?"

**Context:**
Model validation returned multiple metrics, and we didn't know which to prioritize.

**What AI Explained:**
- **mAP@50**: Mean Average Precision at 50% IoU threshold (standard metric)
- **mAP@50-95**: Average of mAP at IoU from 50% to 95% (stricter)
- **Precision**: How many detections were correct (few false positives)
- **Recall**: How many actual objects were found (few missed objects)

Industry standards:
- mAP@50 most commonly reported
- 75%+ is good for real-world deployment
- Precision vs recall depends on use case

**What We Learned:**
- mAP@50 is our primary metric (industry standard)
- Our 77.1% is solid performance for this application
- High precision (88.94%) means reliable detections

**Our Decision:**
✓ Accepted 77.1% mAP@50 as final accuracy  
✓ Understood this was good enough for deployment  
✓ Decided not to pursue further optimization (diminishing returns)

---

## Summary Statistics

### Total AI Interactions
- **Major research questions**: ~15-20 documented
- **Code generation requests**: ~30-40 (mostly boilerplate)
- **Debugging sessions**: ~5-7 critical issues
- **Explanation requests**: ~20-25 concepts

### AI Tools Used
- **ChatGPT-4**: Research, explanations, hyperparameter guidance (60%)
- **Claude**: Debugging, problem diagnosis (20%)
- **GitHub Copilot**: Code generation, visualizations (20%)

### Code Attribution
**What AI Generated:**
- Data loading and preprocessing: ~70% AI-assisted
- Visualization functions: ~90% AI-generated (modified by us)
- Training pipeline setup: ~50% AI-assisted
- Evaluation metrics: ~60% AI-generated

**What We Wrote:**
- Dataset selection and validation: 100% our decisions
- Model configuration choices: 100% our decisions
- Results interpretation: 100% our analysis
- Project documentation: ~70% our writing (AI helped format)

**Overall**: ~30-40% of code AI-generated, but 100% understood and modified by us

---

## Key Takeaways

### What Worked Well
✓  **Using AI for research** - Quickly understood complex concepts (YOLO architecture, mAP metrics)  
✓  **Using AI for debugging** - Saved hours on path issues and model loading bugs  
✓  **Using AI for boilerplate** - Visualization code, data loading, etc.  
✓  **Iterative learning** - Asked follow-up questions to deepen understanding

### What We Were Careful About
- **Never blindly copied code** - Always reviewed and understood before using  
- **Made all major decisions ourselves** - Topic, dataset, model, acceptance criteria  
- **Verified AI explanations** - Cross-referenced with documentation when critical  
- **Focused on learning** - Used AI to accelerate, not replace learning

### What We'd Do Differently
- Could have experimented more before asking AI for solutions
- Sometimes relied on AI when documentation would have been better practice
- Should have explored alternative approaches more before accepting AI's first suggestion

### Honest Reflection
We used AI as a **learning accelerator and productivity tool**, not as a replacement for understanding. Every piece of AI-generated code was reviewed, understood, and often modified. We can explain all aspects of our project and made all critical decisions ourselves.

---

## Bottom Line

**Final Model**: YOLOv8s, 11M parameters, 77.1% mAP@50, 88.94% precision

We used AI to learn faster and get help with code, but we made all the important decisions and understood everything we built.

---

## Academic Integrity Statement

This project represents a collaboration between human students (DeMarcus Crump & Chloe Tu) and AI assistant (GitHub Copilot). 

**AI was used for:**
- Research and technical explanations
- Code generation and debugging
- Documentation formatting
- Visualization creation

**Students were responsible for:**
- Project conceptualization and goals
- Dataset selection and validation
- Design decisions and trade-offs
- Code execution and testing
- Results interpretation
- Quality assurance
- Final approval of all outputs

**Learning Verification:**
- Both students can explain all code in the project
- Students understand the mathematical concepts (mAP, IoU, loss functions)
- Students can modify and extend the code independently
- Students made critical decisions throughout the project

This log documents our honest use of AI as a learning and development tool while maintaining academic integrity and genuine learning outcomes.

---

## Final Performance Summary

**Model**: YOLOv8s (Small)  
**Parameters**: 11,129,454  
**Training**: 200 epochs, AdamW optimizer, advanced augmentation  
**Training Time**: 1.3 hours on Google Colab GPU  

**Performance Metrics:**
- **mAP@50**: 77.10% (Primary metric - solid performance)
- **mAP@50-95**: 50.06% (Strict metric - respectable)
- **Precision**: 88.94% (Very high - reliable detections)
- **Recall**: 68.87% (Acceptable - catches most objects)

**Deliverables:**
- ✓ 4 fully functional Jupyter notebooks
- ✓ Trained YOLOv8s model (best.pt)
- ✓ Comprehensive evaluation report
- ✓ Interactive demo system
- ✓ Deployment-ready exports (ONNX, TorchScript, TFLite)
- ✓ Complete documentation

**Project Status**:  ✓ COMPLETE

---
