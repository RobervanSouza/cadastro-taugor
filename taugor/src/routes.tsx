import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastrar from "./pages/CadastroUser";


export function Navegacao() {
    return(
        <Routes>
            <Route element={<Login/>} path="/" />
            <Route element={<Home/>} path="/home" />
            <Route element={<Cadastrar/>} path="/cadastrar" />
        </Routes>
    )
}