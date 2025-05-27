import React from 'react';
import './PredictionPanel.css';

/*
  * PredictionPanel component
  * This component displays the top predictions for the drawn digit.
  * It receives a prediction prop which is an array of objects containing digit and confidence.
*/
const PredictionPanel = ({ prediction }) => {
  if (!prediction || prediction.length === 0) {
    return (
      <div className="lg:w-80 bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-orange-400 mb-4 text-center">No Predictions Yet</h2>
        <p className="text-gray-400 text-center">Draw a digit to see predictions.</p>
      </div>
    );
  }

  // Find the top 3 predictions by confidence
  const top3 = [...prediction]
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3)
    .map(p => p.digit);

  return (
    <div className="lg:w-80 bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-lg font-semibold text-orange-400 mb-4 text-center">Top Predictions (Random predictions, i.e, no model loaded yet)</h2>
      <ul className="space-y-2">
        {prediction.map((pred, i) => {
          const isTop = top3.includes(pred.digit);
          const barWidth = `${Math.round(pred.confidence * 100)}%`;
          return (
            <li
              key={i}
              className={`flex items-center px-2 py-2 rounded relative transition-all
                ${isTop ? 'bg-orange-500/30 font-bold shadow' : 'bg-gray-700'}
              `}
            >
              <span className="text-xl font-bold w-6 text-center z-10">{pred.digit}</span>
              <div
                className={`absolute left-0 top-0 h-full rounded transition-all duration-300
                  ${isTop ? 'bg-orange-500' : 'bg-gray-600'}
                `}
                style={{
                  width: barWidth,
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />
              <span className="ml-auto text-sm text-gray-300 z-10">{(pred.confidence * 100).toFixed(1)}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PredictionPanel;
