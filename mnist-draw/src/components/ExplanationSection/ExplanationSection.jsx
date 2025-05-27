const ExplanationSection = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-orange-400">Understanding Handwritten Digit Recognition</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">What is Machine Learning and Deep Learning?</h3>
            <p className="text-gray-300 mb-4">
              <span className="font-semibold text-orange-300">Machine learning</span> is a way for computers to learn patterns from data, rather than being explicitly programmed for every task. <span className="font-semibold text-orange-300">Deep learning</span> is a special type of machine learning that uses structures called <span className="font-semibold text-blue-300">neural networks</span>, which are inspired by the human brain. These networks are made up of layers of connected "neurons" that can learn to recognize complex patterns in images, sounds, and more.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg text-sm text-gray-400">
              <p>
                <span className="text-orange-400 font-mono">Neural Network:</span> A system of layers that transforms input data step by step, learning useful features at each stage.
              </p>
              <p>
                <span className="text-orange-400 font-mono">Deep Learning:</span> Uses many layers (hence "deep") to learn more abstract and powerful representations.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">How Does the "Black Box" Work?</h3>
            <p className="text-gray-300 mb-4">
              Deep learning models are often called <span className="font-semibold text-yellow-300">"black boxes"</span> because it's hard to see exactly how they make decisions. However, we know that each layer in the network transforms the input data—like your drawing—by detecting simple features (such as edges or curves) in early layers, and combining them into more complex shapes (like loops or straight lines) in deeper layers. By the end, the network has built up a detailed understanding of what makes each digit unique.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg text-sm text-gray-400">
              <p>
                <span className="text-orange-400 font-mono">Input:</span> The canvas you draw on is converted into numbers (pixel values).
              </p>
              <p>
                <span className="text-orange-400 font-mono">Layers:</span> Each layer checks for different patterns—first simple, then more complex.
              </p>
              <p>
                <span className="text-orange-400 font-mono">Output:</span> The model predicts which digit you drew, showing its confidence for each possibility.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Real-Time Prediction: A Window Into the Model</h3>
            <p className="text-gray-300 mb-4">
              When you draw a digit, the model instantly analyzes the placement, shape, and thickness of your strokes. Each time you add or change a line, the model updates its prediction. This real-time feedback gives you a glimpse into how the neural network processes information: it’s constantly checking the arrangement of pixels and comparing them to patterns it has learned from thousands of examples.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg text-sm text-gray-400">
              <p>
                <span className="text-orange-400 font-mono">Live Feedback:</span> As you draw, the model’s confidence in each digit changes, reflecting how closely your drawing matches what it has seen before.
              </p>
              <p>
                <span className="text-orange-400 font-mono">Why is this useful?</span> It helps us understand that the model is not just memorizing images, but learning to recognize patterns and features—just like people do when reading handwriting.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Dataset and Image Basics</h3>
            <p className="text-gray-300 mb-4">
              The MNIST and Digits datasets are collections of grayscale images of handwritten digits (0–9). Each image in MNIST is 28×28 pixels. Each pixel represents the intensity of handwriting, and these pixel values are used as input for the model.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg text-sm text-gray-400">
              <p><span className="text-orange-400 font-mono">MNIST:</span> 60,000 training and 10,000 testing images</p>
              <p><span className="text-orange-400 font-mono">Digits:</span> Around 1,800 training and 900 testing images</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">How CNNs Process Images</h3>
            <p className="text-gray-300 mb-4">
              Convolutional Neural Networks (CNNs) learn to extract spatial hierarchies of features. Early layers detect edges and textures, while deeper layers recognize more complex structures like shapes and digits.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <span className="text-orange-400 font-mono">Conv1 (1→32):</span> Detects edges and corners
              </div>
              <div>
                <span className="text-orange-400 font-mono">Conv2 (32→64):</span> Combines basic shapes into digit-like structures
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Pooling and Regularization</h3>
            <p className="text-gray-300 mb-4">
              MaxPooling layers reduce image dimensions while preserving important features, making the model faster and more robust. Dropout layers help prevent overfitting by randomly deactivating neurons during training.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg text-sm">
              <span className="text-green-400 font-mono">28×28 → 26×26 → 24×24 → 12×12</span>
              <p className="text-gray-400 mt-1">Gradual reduction in spatial dimensions</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Fully Connected Layers</h3>
            <p className="text-gray-300 mb-4">
              After convolution and pooling, the data is flattened and passed through dense layers. These layers combine all learned features to classify the digit. The final layer outputs a probability for each class (0–9).
            </p>
            <div className="bg-gray-900 p-4 rounded-lg text-sm">
              <span className="text-purple-400 font-mono">9216 → 128 → 10</span>
              <p className="text-gray-400 mt-1">From flattened features to digit classification</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Real-time Prediction Interface</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Confidence Display</h4>
                <p className="text-sm text-gray-300">
                  A bar chart shows the model’s confidence in each digit. The higher the bar, the more confident the model is about that prediction.
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Live Feedback</h4>
                <p className="text-sm text-gray-300">
                  As you draw or input data, the system continuously updates its prediction based on current strokes and pixel distribution.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Applications and Impact</h3>
            <p className="text-gray-200">
              Recognizing handwritten digits is a foundational computer vision task. The principles used here—convolution, pooling, and classification—apply to a wide range of real-world problems, including facial recognition, license plate detection, medical imaging, and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;