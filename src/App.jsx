import React, { useRef, useState, useEffect } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPredictionDefault, setIsPredictionDefault] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = getCoordinates(e);
    
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const getCoordinates = (e) => {
    if (e.touches) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    }
    return {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY
    };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setConfidence(null);
    setIsPredictionDefault(false);
  };

  const predictDigit = async () => {
    setIsLoading(true);
    setIsPredictionDefault(false);
    
    try {
      const canvas = canvasRef.current;
      
      // Scale down to 28x28 (MNIST size)
      const imageData = canvas.toDataURL('image/png');
      
      // Make API call to your backend
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: imageData,
          modelPath: '../../saved_models/mnist_model.pth'
        }),
      });
      
      const result = await response.json();
      
      if (result.error || result.prediction === undefined) {
        // Handle prediction failure with default prediction
        console.error('Prediction failed:', result.error || 'Unknown error');
        setPrediction(null); // Default prediction of 5
        setConfidence(null); // Low confidence
        setIsPredictionDefault(true);
      } else {
        // Normal prediction case
        setPrediction(result.prediction);
        setConfidence(result.confidence);
        setIsPredictionDefault(false);
      }
    } catch (error) {
      console.error('Error predicting digit:', error);
      // Set default prediction on error
      setPrediction(null); // Default prediction of 5
      setConfidence(null); // Low confidence
      setIsPredictionDefault(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">MNIST Digit Classifier</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="border border-gray-300 rounded cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear
          </button>
          <button
            onClick={predictDigit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isLoading ? 'Predicting...' : 'Predict'}
          </button>
        </div>
        
        {prediction !== null && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              Prediction: {prediction}
            </h2>
            <p className="text-gray-600">Confidence: {(confidence * 100).toFixed(2)}%</p>
          </div>
        )}
        {isPredictionDefault && (
              <p className="text-sm text-red-500 mt-2">
                Unable to predict digit accurately. Try again!
              </p>
            )}
      </div>
      
      <p className="mt-6 text-sm text-gray-500">
        Draw a digit (0-9) in the canvas above and click "Predict"
      </p>
    </div>
  );
};

export default App;