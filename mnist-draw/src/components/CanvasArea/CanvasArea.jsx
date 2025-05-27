import React, { useEffect, useState, useRef } from 'react';
import './CanvasArea.css';

import { DIMENSIONS, DRAWING_STYLES, HARDCODED_PREDICTION } from '../../const';

import useDigitModel from '../../hooks/useDigitModel';


/*
  * CanvasArea component
  * This component is responsible for rendering the canvas area.
  * It does not receive any props.
*/
const CanvasArea = ({
  setPrediction
}) => {

  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const { isModelLoaded, predictDigit } = useDigitModel();

  // It initializes the canvas and sets the context for drawing.  
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = DIMENSIONS.canvasWidth;
    canvas.height = DIMENSIONS.canvasHeight;

    // Set the canvas background and drawing styles
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = DRAWING_STYLES.fillStyle
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = DRAWING_STYLES.strokeStyle
    ctx.lineWidth = DRAWING_STYLES.lineWidth
    ctx.lineCap = DRAWING_STYLES.lineCap
    setContext(ctx)
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    
    // rect and CanvasRef.current is the reference to the canvas element
    const rect = canvasRef.current.getBoundingClientRect();
    // e.client[coordinate] is the coordinate of the mouse pointer and rect.[direction] is the [direction] edge of the canvas
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;

    // Start drawing by moving the context to the current mouse position
    context.beginPath()
    context.moveTo(x, y) 

  }
  const stopDrawing = () => {
    setIsDrawing(false);
    context.closePath(); // Close the path when the mouse is released
  }
  
  const draw = (e) => {
    if (!isDrawing) return;

    // rect and CanvasRef.current is the reference to the canvas element
    const rect = canvasRef.current.getBoundingClientRect();
    // e.client[coordinate] is the coordinate of the mouse pointer and rect.[direction] is the [direction] edge of the canvas
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;

    context.lineTo(x, y)
    context.stroke()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    context.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
  }

  const handlePrediction = async () => {

    if (!isModelLoaded) return alert('Model is not loaded yet. Please wait.');

    const prediction = await predictDigit(canvasRef.current);
    setPrediction(prediction);
   
  }

  return (
    <>
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        className="border border-gray-600 rounded shadow-md cursor-crosshair bg-black"
      />
      
      <div className="mt-4 flex gap-4">
        <button
          className="!bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={clearCanvas}
        >
          
          Clear

        </button>
        <button
          className="!bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handlePrediction}
        >

          Predict

        </button>
      </div>
    </div>
    </>
  )
}


export default CanvasArea;
