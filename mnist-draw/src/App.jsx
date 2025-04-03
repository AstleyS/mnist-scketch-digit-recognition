import { useRef, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white"; // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas
  }, []);

  const startDrawing = (event) => {
    const { offsetX, offsetY } = getCoordinates(event);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(event);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = "black"; // Drawing color
    ctx.lineWidth = 10; // Thickness
    ctx.lineCap = "round"; // Smooth edges
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    sendToBackend();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPredictions(null);
  };

  const sendToBackend = async () => {
    const canvas = canvasRef.current;
  
    // Check if there was any drawing on the canvas, else use the default image
    const imageBlob = canvas.toBlob ? canvas.toBlob : null;
  
    if (!imageBlob) {
      // Load the default image (if no drawing is done)
      const defaultImage = await fetch("/default_digit.png");
      const blob = await defaultImage.blob();
      const formData = new FormData();
      formData.append("file", blob, "digit.png");
  
      try {
        const response = await axios.get("http://localhost:8000/predict/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        setPredictions(response.data.probabilities);
      } catch (error) {
        console.error("Error sending image:", error);
      }
    } else {
      // If there is drawing on canvas, send the canvas image as before
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, "digit.png");
  
        try {
          const response = await axios.post("http://localhost:8000/predict/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
  
          setPredictions(response.data.probabilities);
        } catch (error) {
          console.error("Error sending image:", error);
        }
      }, "image/png");
    }
  };
  
  

  const getCoordinates = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    return { offsetX: clientX - rect.left, offsetY: clientY - rect.top };
  };

  return (
    <div className="container">
      <h1>Draw a Digit</h1>
      <div className="digit">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="canvas"
        />
      </div>
      <button onClick={clearCanvas}>Clear</button>

      {predictions && (
        <div className="predictions">
          <h3>Predictions:</h3>
          <ul>
            {predictions.map((p, index) => (
              <li key={index}>
                {index}: {Math.round(p * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
