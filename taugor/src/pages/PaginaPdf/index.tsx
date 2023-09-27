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
          <div>
            <h2>Informações do funcionário</h2>
          </div>
          <div className="pagina-nome">
            <p>
              Nome: <span> {usuario.name} </span>
            </p>
            <p>
              Sexo: <span> {usuario.sexo} </span>
            </p>
            <p>
              Data Nascimento: <span> {usuario.nascimento} </span>
            </p>
          </div>
          <div className="espaco"></div>
          <div className="informacoes">
            <h2>Informações de Contato</h2>
          </div>
          <div className="contato">
            <p>
              Telefone: <span> {usuario.telefone} </span>
            </p>
            <p>
              Endereço: <span> {usuario.endereco} </span>
            </p>
          </div>
          <div className="informacoes">
            <h2>Função na Empresa</h2>
          </div>
          <div className="informacoes-trabalho">
            <div className="grupo-superior">
              <p>
                Cargo atual: <span> {usuario.cargo} </span>
              </p>
              <p>
                Data admissão: <span> {usuario.admisao} </span>
              </p>
            </div>
            <div className="grupo-inferior">
              <p>
                Setor: <span> {usuario.setor} </span>
              </p>
              <p>
                Salário: <span> {usuario.salario} </span>
              </p>
            </div>
          </div>
          <div>
            <div className="historico">
              <h2>Histórico de Cargos</h2>
            </div>
            {usuario.cargoHistorico && usuario.cargoHistorico.length > 0 && (
              <div className="historicos-cargos">
                {usuario.cargoHistorico.map((cargo: string, index: number) => (
                  <p key={index}>
                    {index + 1}° Cargo: <span>{cargo}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={baixarPDF}
          disabled={!leitura === false}>
          {" "}
          {leitura ? <span>Baixando...</span> : <span>Baixar PDF</span>}{" "}
        </Button>
      </div>
    </>
  );
}

export default PaginaPDF;
