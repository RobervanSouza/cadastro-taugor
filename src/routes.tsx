import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home/home";
import Cadastrar from "./pages/CadastroUser/cadastraUser";
import Pagina404 from "./pages/pagina404/paginaErro";
import CadastrarFuncionario from "./pages/CadastroFuncionario/cadastroFuncionario";

import LoginAdmin from "./pages/LogarAdmin/loginAdm";
import PaginaPDF from "./pages/PaginaPdf/paginaPdf";




interface IProtegerRotas {
  redirectTo: string;
}

function ProtecaoRotas({ redirectTo }: IProtegerRotas) {
  const token = JSON.parse(
    localStorage.getItem(
      "firebase:authUser:AIzaSyBhs9PQnte26EUwf5kwSDKMoPL3QzwPv0U:[DEFAULT]"
    )!
  );
  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

export function Navegacao() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<LoginAdmin />} path="/login-adm" />
      <Route element={<ProtecaoRotas redirectTo="/login-adm" />}>
        <Route element={<Cadastrar />} path="/cadastrar" />
      </Route>
      <Route element={<ProtecaoRotas redirectTo="/" />}>
        <Route element={<Home />} path="/home" />
        <Route element={<CadastrarFuncionario />} path="/cadastrafuncionario" />
        <Route element={<PaginaPDF />} path="/visualizar-pdf" />
      </Route>
      <Route element={<Pagina404 />} path="*" />
    </Routes>
  );
}
