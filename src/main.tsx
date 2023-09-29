
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Navegacao } from "./routes";
import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navegacao />
      <ToastContainer />
    </BrowserRouter>
    ,
  </React.StrictMode>
);
