import { Link, useLocation } from "react-router-dom";

import styles from "./styles.module.scss";
import { Button } from "@mui/material";


function PaginaPDF() {
  const location = useLocation();
  const { usuario } = location.state;

  return (
    <div className={styles.geral}>
      <h2>Dados do Usuário</h2>
      <ul>
        <li>
          <strong>Nome:</strong> {usuario.name}
        </li>
        <li>
          <strong>Sexo:</strong> {usuario.sexo}
        </li>
        <li>
          <strong>Endereço:</strong> {usuario.endereco}
        </li>
        <li>
          <strong>Contato:</strong> {usuario.telefone}
        </li>
        <li>
          <strong>Data de Nascimento:</strong> {usuario.nascimento}
        </li>
        <li>
          <strong>Setor:</strong> {usuario.setor}
        </li>
        <li>
          <strong>Salário:</strong> {usuario.salario}
        </li>
        <li>
          <strong>Data de Admissão:</strong> {usuario.admisao}
        </li>
        <li>
          <strong>Cargo Atual:</strong> {usuario.cargo}
        </li>
      </ul>
      {usuario.cargoHistorico && usuario.cargoHistorico.length > 0 && (
        <div>
          <h2>Histórico de Cargo</h2>
          <ul>
            {usuario.cargoHistorico.map((cargo: string, index: number) => (
              <li key={index}>
                {index + 1}° Cargo: {cargo}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button type="button" variant="contained" color="primary">
        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
          Voltar para home
        </Link>
      </Button>
    </div>
  );
}

export default PaginaPDF;
