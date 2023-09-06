import React, { createContext, useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [source] = useState(new VectorSource());

  useEffect(() => {
    const olMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: source,
        }),
      ],
      view: new View({
        center: fromLonLat([118.8186111, -1.15]),
        zoom: 5.34,
      }),
    });

    setMap(olMap);

    return () => olMap.setTarget(undefined);
  }, [source]);

  return (
    <MapContext.Provider value={{ map, source }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };