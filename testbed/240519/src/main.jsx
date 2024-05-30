import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> // console.log가 2번 출력되는걸 방지
  <App />
  // </React.StrictMode>,
);
