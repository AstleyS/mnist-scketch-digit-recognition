from models import SimpleCNN
import torch
import torch.nn.functional as F
import io
import numpy as np
from PIL import Image
from fastapi import FastAPI, UploadFile, File
import os

# Load the trained model
model = SimpleCNN()
model.load_state_dict(torch.load("saved_models/mnist_model.pth", weights_only=True))
model.eval()

app = FastAPI()

def preprocess_image(image):
    image = image.convert("L").resize((28, 28))  # Convert to grayscale, resize to 28x28
    image = np.array(image) / 255.0  # Normalize
    image = torch.tensor(image, dtype=torch.float32).unsqueeze(0).unsqueeze(0)  # Shape (1,1,28,28)
    return image

@app.get("/predict/")
async def predict(file: UploadFile = File(None)):  # Make file optional
    try:
        if file is None or file.filename == "":  # No file uploaded
            image_path = "default_digit.png"
            if not os.path.exists(image_path):  # Check if the file exists
                return {"error": "Default image not found."}
            image = Image.open(image_path)  # Load the default image
        else:
            image = Image.open(io.BytesIO(await file.read()))  # Load the uploaded image

        # Preprocess image before passing to model
        image_tensor = preprocess_image(image)
        
        # Run the model
        with torch.no_grad():
            output = model(image_tensor)
            probabilities = torch.softmax(output, dim=1).numpy().tolist()[0]
            prediction = torch.argmax(output, dim=1).item()

        print(f"Prediction: {prediction}, Probabilities: {probabilities}")
        return {"probabilities": probabilities, "prediction": prediction}
    
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
