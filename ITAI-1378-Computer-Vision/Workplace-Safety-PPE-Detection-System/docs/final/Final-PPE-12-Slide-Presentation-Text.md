# Workplace Safety PPE Detection System - Slide Content
---

## SLIDE 1: TITLE

**Title**
Workplace Safety PPE Detection System 

**Subtitle:**
Automated Real-Time Safety Compliance Using YOLOv8

**Team Members:**
- DeMarcus Crump
- Chloe Tu

**Project Details:**
- Tier 2 Project
- ITAI 1378 - Computer Vision
- December 3, 2025

---

## SLIDE 2: PROBLEM & MOTIVATION

**Subtitle:** The Problem: Construction Safety

**Bullet Points:**
- **20% of workplace fatalities** occur in construction
- Main cause: PPE non-compliance (workers not wearing safety equipment)
- Manual safety inspections are:
  - Slow and inconsistent
  - Cannot monitor all workers continuously
  - Reactive (catch violations after incidents)
- Result: Preventable injuries and deaths

---

## SLIDE 3: SOLUTION OVERVIEW

**Subtitle:**
AI-powered computer vision system for automated PPE detection

**How It Works:**
1. **Input:** Image from construction site camera
2. **Processing:** YOLOv8 model analyzes image
3. **Detection:** Identifies PPE items and violations
4. **Output:** Bounding boxes + compliance alerts
5. **Speed:** Real-time (66 FPS)

**Key Capabilities:**
- Detects: Hardhats, Safety Vests, Masks
- Flags violations: NO-Hardhat, NO-Safety Vest, NO-Mask
- Continuous 24/7 monitoring
- Immediate violation alerts

---

## SLIDE 4: TECHNICAL APPROACH - Model

**Model Choice:**
- **Architecture:** YOLOv8s (You Only Look Once v8 Small)
- **Task:** Object Detection
- **Parameters:** 11.2 million
- **Pre-training:** COCO dataset (80 classes)
- **Fine-tuning:** Construction site images

**Why YOLOv8s?**
- ✓ Real-time performance (66 FPS)
- ✓ Balance of speed and accuracy
- ✓ Single-pass detection (efficient)
- ✓ Production-ready

**Comparison:**
| Model | Speed | Accuracy | Choice |
|-------|-------|----------|--------|
| YOLOv8n | 120 FPS | 75% | Too simple |
| **YOLOv8s** | **66 FPS** | **77%** | **✓ Selected** |
| YOLOv8m | 35 FPS | 81% | Too slow |

---

## SLIDE 5: TECHNICAL APPROACH - Architecture

**Architecture Diagram:**
```
┌─────────────────┐
│  Input Image    │
│   (640x640)     │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Preprocessing   │
│ - Resize        │
│ - Normalize     │
└────────┬────────┘
         ↓
┌─────────────────┐
│  YOLOv8 Model   │
│                 │
│ ┌─────────────┐ │
│ │  Backbone   │ │ ← Feature extraction
│ │ CSPDarknet  │ │
│ └──────┬──────┘ │
│        ↓        │
│ ┌─────────────┐ │
│ │   Neck      │ │ ← Multi-scale fusion
│ │    PAN      │ │
│ └──────┬──────┘ │
│        ↓        │
│ ┌─────────────┐ │
│ │    Head     │ │ ← Bounding boxes
│ │  Detection  │ │    + Classes
│ └─────────────┘ │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Post-Processing │
│ - NMS           │
│ - Confidence    │
│   Filtering     │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Safety Analysis │
│ - PPE check     │
│ - Violations    │
│ - Alerts        │
└────────┬────────┘
         ↓
┌─────────────────┐
│     Output      │
│ Annotated Image │
│ + Compliance    │
└─────────────────┘
```


---

## SLIDE 6: DATASET & PREPROCESSING

**Data Source:**
- **Name:** Construction Site Safety Image Dataset
- **Source:** Roboflow (via Kaggle)
- **Size:** 2,801 images
- **Format:** YOLO annotations (bounding boxes)

**Classes (10 total):**

| PPE Items | Violations | Context |
|-----------|------------|---------|
| Hardhat | NO-Hardhat | Person |
| Safety Vest | NO-Safety Vest | Safety Cone |
| Mask | NO-Mask | Machinery, Vehicle |

**Data Split (Stratified):**
- Training: 1,955 images (70%)
- Validation: 423 images (15%)
- Test: 423 images (15%)

**Preprocessing Steps:**
1. **Stratified Splitting** - Maintain class balance
2. **Data Augmentation:**
   - Mosaic (combine 4 images)
   - Mixup (blend images)
   - Copy-paste (add objects)
   - Rotation (±20°)
3. **Image Resizing** - All images → 640x640 pixels

---

## SLIDE 7: RESULTS - Metrics

**Overall Metrics (Test Set):**

| Metric | Value | What It Means |
|--------|-------|---------------|
| **mAP@50** | **77.1%** | Primary accuracy metric |
| **Precision** | **88.9%** | Low false alarms (reliable) |
| **Recall** | **68.9%** | Catches most violations |
| **Inference Time** | **15ms** | Real-time capable |
| **FPS** | **66** | Processes video smoothly |

**Per-Class Performance:**
- Best: Safety Cone (84.1%), Hardhat (85.2%)
- Good: Safety Vest (82.7%), Vehicle (81.0%)
- Challenging: NO-Mask (68.9%), NO-Safety Vest (71.3%)

**Comparison:**

| Method | Speed | Accuracy | Availability |
|--------|-------|----------|--------------|
| Manual Inspection | 20 sec/person | ~65% | Business hours |
| **Our System** | **0.015 sec** | **77.1%** | **24/7** |
| **Improvement** | **2000x faster** | **+12%** | **Continuous** |

---

## SLIDE 8: RESULTS - Success/Failure Cases

**Success Cases:**

✓ **Works Well:**
- High accuracy on Hardhats (85%)
- High accuracy on Safety Vests (83%)
- Various lighting conditions
- Multiple workers simultaneously
- Context objects (cones, machinery)

**Right Side - Failure Cases:**

✗ **Challenges:**
- Small objects (distant masks < 32x32 px)
- Occlusion (workers blocked by machinery)
- Crowded scenes (10+ workers)
- Unusual poses/angles

---

## SLIDE 9: KEY LEARNINGS

**What Worked Well:**
- ✓ **Stratified Splitting** - Balanced class distribution prevented overfitting
- ✓ **Advanced Augmentation** - Mixup & copy-paste improved robustness by ~5%
- ✓ **YOLOv8s Choice** - Perfect speed/accuracy balance for real-time use

**Challenges Overcome:**
- ⚠ **Class Imbalance** - Violation classes underrepresented
  - Solution: Weighted sampling → improved from 65% to 72%
  
- ⚠ **Small Object Detection** - Masks on distant workers
  - Solution: Tried 800x800 resolution (40% slower) → kept 640x640 for speed
  
- ⚠ **Colab Session Limits** - Training disconnections
  - Solution: Checkpoint saving every 10 epochs

**What We'd Do Differently:**
- Collect 50% more violation examples (NO-Hardhat, NO-Safety Vest)
- Test YOLOv8m for accuracy-critical deployments (sacrifice some speed)
- Implement active learning (collect real-world deployment data iteratively)

---

## SLIDE 10: FUTURE WORK

**Subtitle:** Future Improvements

**1. Expand Dataset with Site-Specific Data**
- Collect 1,000+ images from target deployment sites
- Focus on violation classes and edge cases
- Include poor lighting, rain, fog conditions
- **Expected improvement:** +5-7% mAP

**2. Implement Multi-Model Ensemble**
- YOLOv8s for real-time video (66 FPS)
- YOLOv8m for critical batch analysis (35 FPS, +4% accuracy)
- Ensemble voting to reduce false negatives

**3. Deploy Complete Monitoring System**
- Integrate with surveillance cameras
- Temporal tracking (follow workers across frames)
- Web dashboard for safety officers
- Automated SMS/email alerts
- Deploy on edge devices (NVIDIA Jetson)

---

## SLIDE 11: ACKNOWLEDGMENTS

**Course & Instruction:**
- Professor Patricia McManus - ITAI 1378: Computer Vision
- Houston City College - Fall 2025

**Data & Tools:**
- Roboflow & Kaggle - Construction Site Safety Dataset
- Ultralytics - YOLOv8 framework
- Google Colab - Free GPU access (Tesla T4)
- PyTorch - Deep learning infrastructure

**AI Assistance (~40% of code):**
- ChatGPT-4 - Research and debugging
- Claude - Documentation and code review
- GitHub Copilot - Code completion

**Thank You!**

---

## SLIDE 12: LIVE DEMO

**Subtitle:** 
Running 04_demo.ipynb: Testing on External Construction site Images


**Demo Plan:**
1. Load trained model
2. Test Case 1: Workers with proper PPE
3. Test Case 2: Safety violation (NO-Hardhat)
4. Test Case 3: Multiple workers (crowded scene)


---
