import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

// Находим root-элемент в index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
