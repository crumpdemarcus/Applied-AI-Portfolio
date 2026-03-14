# Notebooks Overview Guide

This directory contains the four core Jupyter notebooks that make up the end-to-end pipeline for the **Workplace Safety PPE Detection System**. These notebooks handle everything from downloading the raw data to running the final safety demo.

## `notebooks/` Directory Structure

```
notebooks/
├── 01_data_exploration.ipynb  # Dataset download, EDA, stratified split
├── 02_model_training.ipynb    # YOLOv8 training (200 epochs)
├── 03_evaluation.ipynb        # Metrics, confusion matrix, failure analysis
├── 04_demo.ipynb              # Interactive demo, model export
└── README.md                  # Notebooks Overview Guide documentation
```

---

## Quick Start: How to Run

You have three options to run this project depending on your hardware and goals.

### **System Requirements**
* **Python**: 3.8 or higher
* **RAM**: 8GB minimum (16GB recommended)
* **GPU**: Strongly recommended for training (NVIDIA Tesla T4 or better)
* **Disk Space**: ~2GB free

### **Dataset Info**
* **Source**: Construction Site Safety (Roboflow/Kaggle)
* **Size**: 2,801 images
* **Classes**: 10 (Hardhat, NO-Hardhat, Safety Vest, NO-Safety Vest, Mask, NO-Mask, Person, Safety Cone, Machinery, Vehicle)

---

### Option A: Run Demo Only (Fastest - 5 mins)
*Use this if you just want to see the model in action without training.*

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd PPE-2
    ```
2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Download the trained model**:
    * Download `best.pt` from the project Google Drive.
    * Place the file in `models/trained/best.pt`.
4.  **Open the demo notebook**:
    ```bash
    jupyter notebook notebooks/04_demo.ipynb
    ```
5.  **Run all cells**:
    * Click "Kernel" > "Restart & Run All".
    * Upload your own construction site images to test or use provided samples.

---

### Option B: Run Full Pipeline (2-3 hours)
*Use this if you want to train the model from scratch on your local machine.*

1.  **Setup**: Clone repo and install dependencies (as above).
2.  **Set up Kaggle API**:
    * Go to [kaggle.com](https://kaggle.com) > Account > Create New API Token.
    * Download `kaggle.json`.
    * Place in `~/.kaggle/kaggle.json` (Linux/Mac) or `C:\Users\<username>\.kaggle\kaggle.json` (Windows).
3.  **Execute Notebooks in Order**:
    * **Step 1**: Run `01_data_exploration.ipynb` (~10 mins).
    * **Step 2**: Run `02_model_training.ipynb` (~1.5 hrs on GPU).
    * **Step 3**: Run `03_evaluation.ipynb` (~15 mins).
    * **Step 4**: Run `04_demo.ipynb` (~10 mins).
4.  **View Results**:
    * Metrics: `results/metrics.txt`
    * Visualizations: `results/visualizations/`

---

### Option C: Run on Google Colab (Free GPU)
*Recommended for fastest training if you don't have a local GPU.*

1.  **Open Google Colab**: Go to [colab.research.google.com](https://colab.research.google.com).
2.  **Upload Notebooks**: Upload all 4 files from this folder.
3.  **Enable GPU**: Click "Runtime" > "Change runtime type" > Select "GPU" (T4).
4.  **Mount Drive**: Add this code to the top of each notebook to save progress:
    ```python
    from google.colab import drive
    drive.mount('/content/drive')
    ```
5.  **Run in Order**: Execute notebooks 01 through 04 sequentially.

---

## In-Depth Notebook Analysis

Here is a detailed technical breakdown of the logic and code within each notebook.

### **1. `01_data_exploration.ipynb` (Data Prep)**
This notebook sets the foundation for the project by handling the "Extract, Transform, Load" (ETL) process.

* **What it does:**
    * **Downloads Data:** Connects to the Kaggle API to fetch the "Construction Site Safety" dataset directly into your environment. It automatically handles unzipping and organizing files.
    * **Cleans Data:** Scans through all images and labels to find and remove corrupted files or annotations with invalid coordinates.
    * **Stratified Splitting:** Instead of randomly splitting data (which can lead to imbalance), it uses **stratified sampling**. This ensures that every class (e.g., "NO-Hardhat") is represented equally in Training (70%), Validation (15%), and Test (15%) sets.
    * **Config Generation:** Automatically creates the `dataset.yaml` file needed by YOLOv8, writing the correct absolute paths for your environment.
    * **Visualization:** Uses Matplotlib to generate bar charts of class distributions and displays sample images with bounding boxes to verify the data looks correct.

---

### **2. `02_model_training.ipynb` (The Engine)**
This is the core of the project where the AI actually learns. We use the Ultralytics YOLOv8 framework.

* **What it does:**
    * **Model Selection:** Loads the `yolov8s.pt` (Small) model. We chose "Small" because it offers a great balance—it's much more accurate than the "Nano" version but still fast enough to run in real-time on standard hardware.
    * **Transfer Learning:** We don't start from scratch. We use "pre-trained weights" (from the COCO dataset), so the model already knows what basic shapes look like. We then "fine-tune" it to recognize PPE specifically.
    * **Hyperparameters:**
        * `epochs=200`: We train for a long time to ensure maximum accuracy.
        * `patience=50`: If the model stops improving for 50 epochs, training stops early to save time (Early Stopping).
        * `batch=16`: Optimized to fill the memory of a standard GPU (16GB) without crashing.
        * `imgsz=640`: The standard resolution for YOLO models.
    * **Data Augmentation:** To make the model smarter, we apply random transformations during training:
        * **Mosaic:** Stitches 4 images together into one. This forces the model to find small objects in complex scenes.
        * **Mixup:** Blends two images together to help the model handle overlapping objects.
    * **Saving:** Automatically saves the best performing model as `best.pt`.

---

### **3. `03_evaluation.ipynb` (Performance Audit)**
This notebook acts as a strict quality control test. It benchmarks the trained model against fresh data it has never seen before (the Test set).

* **What it does:**
    * **Metrics Calculation:** Runs the official validation script to compute:
        * **mAP@50 (Mean Average Precision):** The most important score. It measures how accurate the boxes are. A score over 70% is generally considered good for this task.
        * **Precision vs. Recall:** Checks if the model is too sensitive (too many false alarms) or not sensitive enough (misses real danger).
    * **Confusion Matrix:** Creates a grid chart showing where the model gets confused (e.g., does it mistake a "Person" for a "Safety Vest"?).
    * **Confidence Analysis:** Tests the model at different confidence levels (25%, 50%, 75%) to find the "sweet spot" for deployment.
    * **Per-Class Report:** Generates a table showing exactly how well it detects *each* item. (e.g., "Hardhat detection is 95% accurate, but Gloves are only 60%").

---

### **4. `04_demo.ipynb` (Real-World Test)**
This is the deployment simulation. It takes the trained model and applies it to new, raw images to simulate a real security camera feed.

* **What it does:**
    * **Inference Pipeline:** Defines a function `run_inference()` that standardizes settings like intersection-over-union (IoU) to prevent duplicate boxes.
    * **Safety Logic:** This is the "business logic" layer. It doesn't just detect objects; it interprets them:
        * If it sees `NO-Hardhat`, it triggers a **"Safety Violation"** alert.
        * If it sees `Person` but no PPE, it flags it for review.
    * **Visualizer:** Uses OpenCV to draw professional bounding boxes.
        * **Green Boxes:** Safe/Compliant (e.g., "Hardhat", "Vest").
        * **Red Boxes:** Danger/Violation (e.g., "NO-Hardhat", "NO-Mask").
    * **Batch Processing:** Shows how to process an entire folder of images at once and generate a final safety report summary.
* **Bonus: Generalization Test**:
    * The notebook includes a special section that downloads random construction images from the internet (not from Kaggle).
    * **Result**: It proves the model isn't just "memorizing" the test answers but works on completely new, real-world construction sites.

---

## Where to Find Results & Models

### **Results Folder (`results/`)**
After running the notebooks, all data is saved here.
* **`metrics.txt`**: Final report card (77.1% mAP).
* **`visualizations/`**: Training graphs and Confusion Matrices.
* **`demo_inference/`**: The **External Testing** images from Notebook 04, showing the model working on unseen data.

### **Models Folder (`models/`)**
* **`trained/best.pt`**: The final, intelligent model file (not included in repo due to size).
* **`pretrained/yolov8s.pt`**: The base model downloaded by Notebook 02.
