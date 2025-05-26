import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';


const MNISTSketchRecognition = () => {
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white p-4 gap-6">
      {/* Drawing Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Sketch-to-Digit Recognition
          </h1>
          <p className="text-center text-gray-400 mb-6 text-sm">
            CNN Architecture
          </p>
          
          <div className="relative">
            <p> Canvas </p>
          </div>
          
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors duration-200"
            >
              Clear Canvas
            </button>
          </div>
          
          <p className="text-center mt-4 text-gray-400 text-sm">
            Draw a digit (0-9) • Model runs inference on pen lift
          </p>
        </div>
      </div>

      {/* PyTorch-style Predictions Panel */}
      <div className="lg:w-80 bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center text-orange-400">
          Model Output (Softmax)
        </h2>
        
        {/* Model Info */}
        <div className="mb-6 p-3 bg-gray-700 rounded-lg text-xs">
          <div className="font-mono text-orange-300">torch.nn.Sequential(</div>
          <div className="ml-2 text-gray-300">
            <p> Model Info </p>
          </div>
          <div className="font-mono text-orange-300">)</div>
        </div>
        
        <div className="space-y-3">
            <p> Prediction </p>
          ))
        </div>
        
        {/* Prediction Result */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg border-l-4 border-orange-500">
         <p> Prediction Result </p>
        </div>
        
        {/* PyTorch Info */}
        <div className="mt-4 p-3 bg-gray-900 rounded-lg">
          <p> Pytorch info </p>
        </div>
      </div>
    </div>
  );
};

export default MNISTSketchRecognition;