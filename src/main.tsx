import "./styles/index.scss";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
