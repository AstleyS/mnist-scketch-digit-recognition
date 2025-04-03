import os
import tqdm

from models import SimpleCNN

# Import Pytorch
import torch
import torch.nn as nn
import torch.optim as optim

# Import torchvision
from torchvision.datasets import mnist
import torchvision.transforms as transforms
from torch.utils.data import DataLoader

import matplotlib.pyplot as plt

print(f"PyTorch version: {torch.__version__}\nTorchvision version: {torchvision.__version__}")


# Transform the data. Convert to tensor and normalise to [0,1]
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# Load the MNIST dataset
train_dataset = mnist.MNIST(root='./data', train=True, download=True, transform=transform)
test_dataset = mnist.MNIST(root='./data', train=False, download=True, transform=transform)

# Create data loaders
# DataLoader is used to load the data in batches
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

print(f'Training samples: {len(train_loader.dataset)}')
print(f'Testing samples: {len(test_loader.dataset)}')


# Loading the model
model = SimpleCNN()
print(model)

# Define the loss function and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Check if GPU is available and move the model to GPU if it is
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
print(f"Using device: {device}")

# Training the model
epochs = 5
for epoch in range(epochs):
    model.train() # Set model to training mode
    loss = 0.0
    for img, label in tqdm.tqdm(train_loader):
        img, label = img.to(device), label.to(device) # Move data to GPU if available

        optimizer.zero_grad() # Zero the gradients. Clears old gradients to avoid accumulation
        
        output = model(img)
        loss = criterion(output, label) # Compute the loss based on the output and the true labels
        loss.backward() # Backpropagation
        optimizer.step() # Update the weights

        loss += loss.item() # Accumulate the loss

    print(f"Epoch [{epoch+1}/{epochs}], Loss: {loss/len(train_loader):.4f}", end='\r') # Print the loss for each epoch


# Evaluate the model
true = 0
total = 0

model.eval() # Set model to evaluation mode

with torch.no_grad(): # No need to compute gradients during evaluation
    for img, label in tqdm.tqdm(test_loader):
        img, label = img.to(device), label.to(device)

        output = model(img)
        _, predicted = torch.max(output, 1) # Get the index of the max log-probability
        total += label.size(0)
        true += (predicted == label).sum().item()

accuracy = (true / total) * 100
print(f"Test accuracy: {accuracy:.2f}%")


# Save the model
model_dir = 'saved_models'

if not os.path.exists(model_dir):
    os.makedirs(model_dir)
    

torch.save(model, f"{model_dir}/mnist_model.pth")
print("Model saved!")
