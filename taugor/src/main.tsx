import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Navegacao } from "./routes";

ReactDOM.render(
  <BrowserRouter>
    <Navegacao />
  </BrowserRouter>,
  document.getElementById("root")
);
