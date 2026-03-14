# Project Documentation & Resources

This directory contains the official documentation, presentation slides, download video, and transparency logs for the **Workplace Safety PPE Detection System**. 

## `docs/` Directory Structure

The documentation is organized into two primary folders to separate the Midterm progress from the Final deliverables.

```
 docs/ 
 ├── Final/
 │   ├── Final_DemarcusCrump_ChloeTu__ITAI1378.pdf   # Final sildes PDF version
 │   ├── Final_DemarcusCrump_ChloeTu__ITAI1378.pptx  # Final sildes Powerpoint pptx version
 │   ├── Final-PPE-12-Slide-Presentation-Text.md  # Text word format Final Presentation slides
 │   └── PPE-Demo-Video.mp4
 │
 ├── Midterm/
 │   ├── MD_DemarcusCrump_ChloeTu-ITAI1378.pdf  # Midterm sildes PDF version
 │   ├── MD_DemarcusCrump_ChloeTu__ITAI1378.pptx # Midterm sildes Powerpoint pptx version
 │   └── MD-PPE-10-Slide-Presentation-Text.md   # Text word format Midterm Presentation slides
 │
 ├── README.md                   # Presentation & Files Project Documentation
 └── AI_USAGE_LOG.md             # Detailed AI assistance log
```

---

## Presentation video 

**Video Link**: https://drive.google.com/file/d/1YPWR3AU4nUncAwEaot6_WY_KOfKmFsEL/view?usp=sharing

**Contents** (12 minutes):
- **Problem Statement & Motivation:** Overview of construction safety risks and the necessity for automated PPE monitoring.
- **Technical Architecture:** Explanation of the YOLOv8 Small model structure, including CSPDarknet backbone and PAN neck architecture.
- **Data Strategy:** Breakdown of dataset preprocessing, class balancing, and advanced augmentation techniques like mosaic and mixup.
- **Performance Metrics:** Analysis of key results, including 77.1% mAP@50, 88.9% precision, and 66 FPS real-time processing speed.
- **Success & Failure Analysis:** Evaluation of model performance on specific classes (e.g., masks) and limitations regarding small objects and occlusion.
  
## Demo Video

**Video Link**: https://drive.google.com/file/d/1QHEQ7IYajlBU72rhOfs_92o6vn67VkYZ/view?usp=sharing

**Contents** (10 minutes):
- **Pipeline Setup:** Demonstration of mounting the drive, loading the model, and initializing utility functions for inference.
- **Batch Processing:** Execution of batch inference on 423 test images to demonstrate large-scale processing capabilities.
- **Interactive Inference:** Live single-image testing showing side-by-side visualizations of compliant workers vs. safety violations.
- **Real-World Generalization:** Bonus testing on external construction site images not found in the training data to prove deployment readiness.
- **Safety Compliance Reporting:** Showcase of the automated violation summary generation and CSV reporting features.

---

## 1. Final Project Materials (/Final)

This folder serves as the central hub for the final submission deliverables, containing the presentation deck in all accessible formats (PDF, PPTX), the raw text script, and the live demonstration video.

### `Final_DemarcusCrump_ChloeTu__ITAI1378.pdf`

**File Type:** PDF Document (Portable / Read-Only)

**Description:** This is the static export of our final 12-slide presentation.

**Content:** It covers the full project lifecycle, including the Problem & Motivation (20% fatality rate in construction), Technical Approach (YOLOv8s architecture and preprocessing), Results (achieving 77.1% mAP@50 and 88.9% Precision), and Future Work (Edge deployment and dataset expansion).

**Viewing Instruction:** Please open this file directly in GitHub to view the slides. This format ensures all fonts, layouts, and diagrams (such as the architecture flow on Slide 5) render correctly in the browser without requiring a download or PowerPoint software.

---

### `Final_DemarcusCrump_ChloeTu__ITAI1378.pptx`

**File Type:** PowerPoint Presentation (Source File)

**Description:** The editable source file for the final class presentation.

**Note:** This is a distinct version from the PDF. While the content matches, the layout rendering may differ depending on your local version of PowerPoint. This file includes the original slide transitions, animations, and editable charts that are flattened in the PDF version . It is intended for presenting or editing the slide deck.

---

### `Final-PPE-12-Slide-Presentation-Text.md`

**File Type:** Markdown Script

**Description:** A raw transcript of the final presentation.

**Content:** This file contains the script, bullet points, and speaker notes for all 12 slides. It serves as the "source of truth" for the presentation content and is formatted for accessibility, allowing you to review textual data (such as the specific confusion matrix data on Slide 7) without opening the visual slide deck.

---

### `PPE-Demo-Video.mp4`

**File Type:** Video File (MP4)

**Description:** A comprehensive 10-minute video walkthrough of our interactive notebook (`04_demo.ipynb`).

**Content Includes:**
- **Model Loading:** Mounting Google Drive and initializing the YOLOv8s model (11.2M parameters).
- **Batch Inference:** Processing 423 test images in real-time to generate compliance statistics.
- **Interactive Demo:** Testing the model on external images (not in the training dataset) to prove generalization, showing bounding boxes for "Hardhat," "Vest," and "No-Mask" violations.
- **Deployment:** Exporting the model to ONNX and TorchScript formats for varying deployment environments.

---

## 2. Midterm Project Materials (/Midterm)

This folder contains the complete set of midterm proposal materials, provided in all necessary presentation formats (PDF, PPTX) along with the corresponding text transcript.

### `MD_DemarcusCrump_ChloeTu-ITAI1378.pdf`

**File Type:** PDF Document  
**Description:** Static 10-slide midterm proposal.

**Content:** This document outlines the initial project scope, including the selection of the "Construction Site Safety" dataset, the proposed system diagram, and the week-by-week development plan.

**Viewing Instruction:** Please open this file directly in GitHub for the most reliable viewing experience without formatting errors.

---

### `MD_DemarcusCrump_ChloeTu__ITAI1378.pptx`

**File Type:** PowerPoint Presentation

**Description:** The source PowerPoint file for the midterm presentation.

**Details:** Clearly marks the project as "Tier 2" (Medium Difficulty) and includes editable tables for "Success Metrics" (Slide 7) and "Challenges & Backup Plans" (Slide 9), detailing mitigation strategies like aggressive augmentation for occluded PPE .

---

### `MD-PPE-10-Slide-Presentation-Text.md`

**File Type:** Markdown Script

**Description:** The Markdown text transcript of the midterm proposal.

**Details Covered:**  
- **Problem:** $1 billion per week cost of workplace injuries  
- **Technical Stack:** Explaining the $0 cost using Google Colab and Kaggle  
- **Risk Management:** Listing specific backup plans, such as using YOLOv8-medium if accuracy targets were missed .

---

## AI Usage & Transparency

### `AI_USAGE_LOG.md`

**File Type:** Markdown Documentation  
**Purpose:** Academic Integrity, Transparency Report & Code Attribution

**Description:** A detailed transparency log documenting our collaboration with AI tools throughout the semester.

### **The “Human First” Workflow**
The log explicitly details our workflow:**We researched → AI explained → We decided → AI helped implement**. AI was use as a learning accelerator, never to replace human decision-making.

### **Tools Used**
- **ChatGPT-4:** Researching model variants & debugging  
- **Claude:** Fixing Google Drive persistence  
- **GitHub Copilot:** Generating boilerplate visualization code.

### **Code Attribution Breakdown**
- **Dataset Preprocessing:** ~30% AI-assisted (Logic for stratified splitting).
- **Model Training:** ~40% AI-assisted (Configuration and training loops).
- **Evaluation:** ~50% AI-assisted (Confusion matrices and metrics). 
- **Documentation:** ~60% AI-assisted (Formatting and technical writing).
- **Overall:** Approximately 40% of the codebase was generated with AI assistance, while 60% was written independently by the team.

---
