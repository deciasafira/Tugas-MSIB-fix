import React, { useEffect, useState } from "react";
import Draw from "ol/interaction/Draw";
import { Point } from "ol/geom";
import Overlay from "ol/Overlay";

function PointDrawing({ map, source }) {
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    if (map && source) {
      const newDraw = new Draw({
        source: source,
        type: "Point",
      });
      newDraw.on("drawend", (event) => {
        const coordinates = event.feature.getGeometry().getCoordinates();
        showPopup(coordinates);
      });
      map.addInteraction(newDraw);
      setDraw(newDraw);
    }

    return () => {
      if (map && draw) {
        map.removeInteraction(draw);
      }
    };
  }, [map, source]);

  const showPopup = (coordinates) => {
    const popupElement = document.createElement("div");
    popupElement.className = "popup";
    popupElement.innerHTML = `Koordinat: ${coordinates.toString()}`;

    const popupOverlay = new Overlay({
      element: popupElement,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -20],
    });

    map.addOverlay(popupOverlay);

    popupOverlay.setPosition(coordinates);

    setTimeout(() => {
      map.removeOverlay(popupOverlay);
    }, 3000);
  };

  return null;
}

export default PointDrawing;