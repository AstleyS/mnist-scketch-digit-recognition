import CanvasArea from '../CanvasArea/CanvasArea'
import PredictionPanel from '../PredictionPanel/PredictionPanel'
import React, { useState } from 'react';

/*
  * DrawSection component
  * This component combines the CanvasArea and PredictionPanel components.
  * It manages the prediction state and passes it to the PredictionPanel.
*/
export default function DrawSection() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 p-6">
      <CanvasArea setPrediction={setPrediction} />
      <PredictionPanel prediction={prediction} />
    </div>
  );
}