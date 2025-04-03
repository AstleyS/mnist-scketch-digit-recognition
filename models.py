import torch.nn as nn
import torch.nn.functional as F

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, stride=1, padding=1) # Input: 1 channel (grayscale), Output: 32 channels
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1) # Input: 32 channels, Output: 64 channels
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0) # Downsampling layer from 28x28 to 14x14
        self.fc1 = nn.Linear(64 * 7 * 7, 128) # Fully connected layer 64 channels x 7x7 feature maps (from conv2) to 128 neurons
        self.fc2 = nn.Linear(128, 10) # Fully connected layer 128 neurons to 10 output classes (digits 0-9)


    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x))) # Conv1 + ReLU + MaxPool
        #print(f"Shape after conv1: {x.shape}")
        x = self.pool(F.relu(self.conv2(x))) # Conv2 + ReLU + MaxPool
        #print(f"Shape after conv2: {x.shape}")
        x = x.view(-1, 64 * 7 * 7) # Flatten the tensor
        #print(f"Shape after flattening: {x.shape}")
        x = F.relu(self.fc1(x)) # Fully connected layer + ReLU
        #print(f"Shape after fc1: {x.shape}")
        x = self.fc2(x)
        return x
    

