import CanvasArea from '../CanvasArea/CanvasArea'
import PredictionPanel from '../PredictionPanel/PredictionPanel'
import React, { useState } from 'react';

export default function DrawSection() {

    const [prediction, setPrediction] = useState(null);
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-6 p-6">
      <CanvasArea 
        setPrediction={setPrediction}
      />
      <PredictionPanel
        prediction={prediction}
      />
    </div>
  )
}
