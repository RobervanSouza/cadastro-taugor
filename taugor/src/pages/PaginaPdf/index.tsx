import { Link, useLocation } from "react-router-dom";

import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function PaginaPDF() {
  const location = useLocation();
  const { usuario } = location.state;
  const [leitura, setleitura] = useState(false);
  
  
  const baixarPDF = () => {
   
    setleitura(true);
  const capturar = document.querySelector(".pdf") as HTMLElement;


  if (!capturar) {
    console.error("Elemento com a classe 'pdf' não encontrado na página.");
    return;
  }


  html2canvas(capturar).then((canvas) => {
    const imageData = canvas.toDataURL("img/png");
    const doc = new jsPDF("p", "mm", "a4");
    const largura = doc.internal.pageSize.getWidth();
    const altura = doc.internal.pageSize.getHeight();
    doc.addImage(imageData, "png", 0, 0, largura, altura);
    setleitura(false);
   
      const nomeDoArquivo = `Funcionário-${usuario.name}.pdf`;
      doc.save(nomeDoArquivo);
  });
};


  return (
    <div className={styles.geral}>
      <div className="pdf">
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
      </div>
      <Button type="button" variant="contained" color="primary">
        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
          Voltar para home
        </Link>
      </Button>

      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={baixarPDF}
        disabled={!leitura === false}
        >
        {" "}
        {leitura ? <span>downloading...</span> : <span>dowload</span>}{" "}
      </Button>
      
    </div>
  );
}

export default PaginaPDF;
