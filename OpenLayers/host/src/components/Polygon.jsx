import React, { useState } from "react";
import PolygonDrawing from "./PolygonDrawing";

const Polygon = ({ drawing }) => { // Terima prop "drawing" dari Peta.jsx
  const [click, setClick] = useState(false);
  const [draw, setDraw] = useState(null);

  const unDraw = () => {
    if (draw) {
      draw.setActive(false);
      setDraw(null);
    }
  };

  const undoDraw = () => {
    const features = source.getFeatures();

    for (let i = features.length - 1; i >= 0; i--) {
      if (features[i].getGeometry().getType() === "Polygon") {
        source.removeFeature(features[i]);
        break;
      }
    }
  };

  return (
    <div className="flex relative">
      {/* ... */}
      {click && (
        <div>
          {/* ... */}
          <PolygonDrawing onDrawStart={(drawInteraction) => setDraw(drawInteraction)} />
          <button onClick={unDraw}>Undraw</button>
          <button onClick={undoDraw}>Undo draw</button>
        </div>
      )}
    </div>
  );
};

export default Polygon;