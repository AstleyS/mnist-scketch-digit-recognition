import React from 'react';
import './PredictionPanel.css';

/*
  * PredictionPanel component
  * This component displays the top predictions for the drawn digit.
  * It receives a prediction prop which is an array of objects containing digit and confidence.
*/
const PredictionPanel = ({prediction}) => {

  if (!prediction || prediction.length === 0) {
    return (
      <div className="lg:w-80 bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-orange-400 mb-4 text-center">No Predictions Yet</h2>
        <p className="text-gray-400 text-center">Draw a digit to see predictions.</p>
      </div>
    );
  }

  const maxConfidence = Math.max(...prediction.map(p => p.confidence));

  return (
    <div className="lg:w-80 bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-lg font-semibold text-orange-400 mb-4 text-center">Top Predictions</h2>
      <ul className="space-y-2">
        {prediction.map((prediction, i) => (
          <li 
          key={i}
          className={`flex justify-between items-center bg-gray-700 px-4 py-2 rounded
            ${prediction.confidence === maxConfidence
                ? 'bg-orange-500 text-white font-bold shadow'
                : 'bg-gray-700'
              }`
          }>
            <span className="text-xl font-bold">{prediction.digit}</span>
            <span className="text-sm text-gray-300">{(prediction.confidence * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionPanel;
