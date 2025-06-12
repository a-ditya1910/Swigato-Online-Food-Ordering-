import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"; // Note the curly braces
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StoreContextProvider } from "./context/StoreContext.js"; // Note the curly braces

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
