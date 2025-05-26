import CanvasArea from '../CanvasArea/CanvasArea'
import PredictionPanel from '../PredictionPanel/PredictionPanel'

export default function DrawSection() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-6 p-6">
      <CanvasArea />
      <PredictionPanel />
    </div>
  )
}
