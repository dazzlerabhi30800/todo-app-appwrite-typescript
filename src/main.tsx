import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TodoContextProvider from "./Store/Store.tsx";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </Router>
  </React.StrictMode>,
);
