import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastrar from "./pages/CadastroUser";
import Pagina404 from "./pages/pagina404";

interface IProtegerRotas{
   redirectTo: string;
}

function ProtecaoRotas({redirectTo}: IProtegerRotas) {
    const token = JSON.parse(
      localStorage.getItem(
        "firebase:authUser:AIzaSyBhs9PQnte26EUwf5kwSDKMoPL3QzwPv0U:[DEFAULT]"
      )!
    );
    return token  ? <Outlet/>: <Navigate to={redirectTo} /> 
}




export function Navegacao() {
    return (
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Cadastrar />} path="/cadastrar" />
        <Route element={<ProtecaoRotas redirectTo="/" />}>
          <Route element={<Home />} path="/home" />
        </Route>
        <Route element={<Pagina404/>} path="*" />
      </Routes>
    );
}