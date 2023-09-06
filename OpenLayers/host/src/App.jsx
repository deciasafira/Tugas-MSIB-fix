import React from "react";
import ReactDOM from "react-dom";
import Peta from "./Peta"; 
import { MapProvider } from "./MapContext"; 

import "./index.scss";

function App() {
  return (
    <MapProvider>
      <div className="w-full h-full">
        <Peta />
      </div>
    </MapProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));