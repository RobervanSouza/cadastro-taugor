import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Navegacao } from "./routes";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <BrowserRouter>
    <Navegacao />
    <ToastContainer/>
  </BrowserRouter>,
  document.getElementById("root")
);
