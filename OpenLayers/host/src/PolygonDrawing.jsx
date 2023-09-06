import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Fill, Stroke } from "ol/style";

const PolygonDrawing = () => {
  const { map, source } = useContext(MapContext) || {};
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    if (!map) return;

    const vectorLayer = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.2)",
        }),
        stroke: new Stroke({
          color: "red",
          width: 2,
        }),
      }),
    });

    map.addLayer(vectorLayer);
  }, [map, source]);

  const startDrawingPolygon = () => {
    if (draw) {
      map.removeInteraction(draw);
    }

    const newDraw = new Draw({
      source: source,
      type: "Polygon",
    });

    newDraw.on("drawend", (event) => {
      const feature = event.feature;
      feature.getGeometry().transform("EPSG:3857", "EPSG:4326");
      source.addFeature(feature);
    });

    map.addInteraction(newDraw);
    setDraw(newDraw);
  };

  const stopDrawing = () => {
    if (draw) {
      map.removeInteraction(draw);
      setDraw(null);
    }
  };

  return (
    <div>
      <button onClick={startDrawingPolygon}></button>
      <button onClick={stopDrawing}></button>
    </div>
  );
};

export default PolygonDrawing;