import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Navegacao } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <Navegacao/>
  </BrowserRouter>
);
