# MNIST Handwritten Sketch Recognition

This is a Handwritten Digit Recognition app built with TensorFlow.js and HTML5 Canvas. It allows users to draw digits directly in the browser and see real-time predictions using a Convolutional Neural Network trained on the MNIST dataset.

## Key Features

### Interactive Canvas:
- Draw digits (0–9) using your mouse or touch input
- "Clear" button to reset the canvas and draw a new digit

### Real-Time Digit Prediction:
- The model predicts the digit as soon as you stop drawing
- Displays the top predicted digit along with the confidence score

### Machine Learning Model:
- Trained on the MNIST dataset using a CNN architecture
- Deployed using TensorFlow.js for in-browser inference

### Lightweight and Fast:
- Runs entirely in the browser with no need for server-side computation
- Quick and responsive predictions optimized for modern devices

## How to Use

1. Draw a digit from 0 to 9 in the provided canvas area.
2. Wait briefly for the model to process your sketch.
3. View the predicted digit and confidence score.
4. Click "Clear" to reset the canvas and try again.

This tool demonstrates how deep learning can be integrated with front-end technologies to create interactive and intelligent applications entirely in the browser.

## Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/mnist-sketch-recognition.git
cd mnist-sketch-recognition

# Install dependencies
npm install

# Start development server
npm run dev
