import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BookingProvider } from "./context/BookingCtx";

ReactDOM.createRoot(document.getElementById("root") !).render(
  <React.StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </React.StrictMode>
);