import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ModalContentProvider } from "./providers/ModalProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalContentProvider>
      <App />
    </ModalContentProvider>
  </React.StrictMode>
);
