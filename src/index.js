import React from "react";
import ReactDOM from "react-dom";
import "./index.css";  // Si tienes archivo de estilos, sino puedes crear uno nuevo
import App from "./App"; // El componente principal de tu app

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
