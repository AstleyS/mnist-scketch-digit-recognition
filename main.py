from models import SimpleCNN

from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import base64
import io
import os
import numpy as np
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware to allow requests from your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    image: str
    modelPath: str

# Load your trained model
def load_model(model_path):
    try:
        # Check if model exists
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")
        
        model = SimpleCNN()
        model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
        model.eval()
        return model
    except Exception as e:
        # Log the error
        print(f"Error loading model: {str(e)}")
        return None

# Image preprocessing
def preprocess_image(image_data):
    try:
        # Remove the data URL prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode the base64 image
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes)).convert('L')  # Convert to grayscale
        
        # Resize to 28x28 pixels
        image = image.resize((28, 28))
        
        # Apply transformations similar to what was used during training
        transform = transforms.Compose([
            transforms.ToTensor(),  # Convert to tensor and scale to [0, 1]
            transforms.Normalize((0.1307,), (0.3081,))  # Standard MNIST normalization
        ])
        
        # Apply transformations and add batch dimension
        tensor = transform(image).unsqueeze(0)
        return tensor
    except Exception as e:
        # Log the error
        print(f"Error preprocessing image: {str(e)}")
        return None

@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        # Load the model
        model = load_model(request.modelPath)
        if model is None:
            return {"error": "Failed to load model"}
        
        # Preprocess the image
        tensor = preprocess_image(request.image)
        if tensor is None:
            return {"error": "Failed to preprocess image"}
        
        # Check if tensor has valid content
        if torch.isnan(tensor).any() or torch.sum(tensor != 0).item() < 10:
            return {"error": "Invalid image content"}
        
        # Make prediction
        try:
            with torch.no_grad():
                outputs = model(tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
                prediction = torch.argmax(probabilities).item()
                confidence = probabilities[prediction].item()
            
            return {"prediction": int(prediction), "confidence": float(confidence)}
        except Exception as e:
            print(f"Error during prediction: {str(e)}")
            return {"error": f"Prediction failed: {str(e)}"}
    
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)