export const codeSnippets = {
  full: `"""
============================================================
CONVOSHRIMP: CNN MANTIS SHRIMP
Complete Training Example for Google Colab
============================================================

Run this in Google Colab to train the CNN on CIFAR-10!
GPU recommended: Runtime > Change runtime type > GPU
"""

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
from tqdm import tqdm

# Check for GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")


class ConvoShrimp(nn.Module):
    """
    The legendary CNN Mantis Shrimp.
    
    Architecture:
        Input --> Conv Blocks --> Pooling --> Dense --> Output
        (Eyes)    (Midband)     (Ganglia)   (Brain)   (Strike)
    """
    
    def __init__(self, num_classes: int = 10):
        super(ConvoShrimp, self).__init__()
        
        # COMPOUND EYES: Input Processing
        self.eyes = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2)
        )
        
        # MIDBAND: Feature Extraction
        self.midband_1 = nn.Sequential(
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2)
        )
        
        self.midband_2 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2)
        )
        
        # OPTICAL GANGLIA: Global Processing
        self.ganglia = nn.AdaptiveAvgPool2d((4, 4))
        
        # BRAIN: Decision Making
        self.brain = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(512, 256),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
        )
        
        # STRIKE: Classification Output
        self.strike = nn.Linear(256, num_classes)
    
    def forward(self, x):
        x = self.eyes(x)
        x = self.midband_1(x)
        x = self.midband_2(x)
        x = self.ganglia(x)
        x = self.brain(x)
        x = self.strike(x)
        return x


# ============================================================
# DATA: Loading CIFAR-10
# ============================================================

transform_train = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomCrop(32, padding=4),
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465), 
                         (0.2023, 0.1994, 0.2010))
])

transform_test = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465), 
                         (0.2023, 0.1994, 0.2010))
])

print("Downloading CIFAR-10 dataset...")
train_dataset = datasets.CIFAR10(
    root='./data', train=True, download=True, transform=transform_train
)
test_dataset = datasets.CIFAR10(
    root='./data', train=False, download=True, transform=transform_test
)

train_loader = DataLoader(train_dataset, batch_size=128, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=128, shuffle=False)

# CIFAR-10 classes
classes = ['plane', 'car', 'bird', 'cat', 'deer', 
           'dog', 'frog', 'horse', 'ship', 'truck']


# ============================================================
# TRAINING: Teaching ConvoShrimp to Hunt
# ============================================================

model = ConvoShrimp(num_classes=10).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.5)

print(f"\\nConvoShrimp initialized!")
print(f"Total parameters: {sum(p.numel() for p in model.parameters()):,}")
print("\\nStarting training...\\n")

num_epochs = 10  # Increase for better accuracy

for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    pbar = tqdm(train_loader, desc=f"Epoch {epoch+1}/{num_epochs}")
    for images, labels in pbar:
        images, labels = images.to(device), labels.to(device)
        
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()
        
        pbar.set_postfix({
            'loss': f'{running_loss/total:.4f}',
            'acc': f'{100.*correct/total:.2f}%'
        })
    
    scheduler.step()
    
    # Evaluate on test set
    model.eval()
    test_correct = 0
    test_total = 0
    with torch.no_grad():
        for images, labels in test_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            _, predicted = outputs.max(1)
            test_total += labels.size(0)
            test_correct += predicted.eq(labels).sum().item()
    
    print(f"Test Accuracy: {100.*test_correct/test_total:.2f}%\\n")

print("ConvoShrimp training complete!")
print(f"Final Test Accuracy: {100.*test_correct/test_total:.2f}%")`
};
