import { useLocation } from "react-router-dom";

import { Button } from "@mui/material";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Header from "../../components/header/header";
import "../../index.css";
import { UserType } from "../../types/userTypes";

function PaginaPDF() {
  const location = useLocation();
  const { usuario } = location.state as { usuario: UserType };
  const [leitura, setleitura] = useState(false);

  const baixarPDF = () => {
    setleitura(true);
    const capturar = document.querySelector(".pagina") as HTMLElement;

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
    <>
      <header>
        <Header />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"></meta>
      </header>
      <div className="container">
        <div className="pagina">
         

          <div className="pagina-nome">
            <p>
              Nome: <span> {usuario.name} </span>
            </p>
            <p>
              Nome: <span> {usuario.sexo} </span>
            </p>
          </div>
          <ul>
            <li></li>
            <li></li>
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

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={baixarPDF}
            disabled={!leitura === false}>
            {" "}
            {leitura ? <span>downloading...</span> : <span>dowload</span>}{" "}
          </Button>
        </div>
      </div>
    </>
  );
}

export default PaginaPDF;
