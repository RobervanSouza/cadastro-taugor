import  { ChangeEvent, FormEvent, useState } from "react";
import { Button,  TextField } from "@mui/material";
import { criarUsuario } from "../../utils/user";
import { UserType } from "../../types/userTypes";

import LogoComponent from "../../components/logo/logo";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/header";


function CadastrarFuncionario() {
  const [name, setName] = useState("");
  const [sexo, setSexo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");
  const [salario, setSalario] = useState("");
  const [admisao, setAdmisao] = useState("");
  const [status, setStatus] = useState("ativo"); 

  function notificacao() {
    toast.success("Cadastrado com sucesso!");
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Realize as validações dos campos (como mencionado em respostas anteriores)

const resetForm = () => {
  setName("");
  setSexo("");
  setEndereco("");
  setTelefone("");
  setFoto("");
  setNascimento("");
  setCargo("");
  setSetor("");
  setSalario("");
  setAdmisao("");
  setStatus("ativo");
};

    const usuario: UserType = {
      id: "", // Você pode definir um ID aqui, se necessário
      name,
      sexo,
      endereco,
      telefone,
      foto,
      nascimento,
      cargo,
      setor,
      salario,
      admisao,
      status,
    };

    criarUsuario(usuario);
    notificacao();
    resetForm();
    // Redirecionar para a página desejada após o cadastro
    
  };

const dataAdmisao = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  let formattedValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos


  if (formattedValue.length > 8) {
    formattedValue = formattedValue.slice(0, 8);
  }

  if (formattedValue.length > 2) {
    formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
  }
  if (formattedValue.length > 5) {
    formattedValue = formattedValue.slice(0, 5) + "/" + formattedValue.slice(5);
  }

  setAdmisao(formattedValue);
};
const dataNascimento = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  let formattedValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  // Limita o tamanho máximo em 8 caracteres
  if (formattedValue.length > 8) {
    formattedValue = formattedValue.slice(0, 8);
  }

  // Adiciona as barras nos locais corretos
  if (formattedValue.length > 2) {
    formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
  }
  if (formattedValue.length > 5) {
    formattedValue = formattedValue.slice(0, 5) + "/" + formattedValue.slice(5);
  }

  setNascimento(formattedValue);
};


  return (
    <>
    <header><Header/></header>
    <div className={styles.geral}>
      
      <div>
        <LogoComponent width="340px" height="112px" />
      </div>
      <h1>Cadastrar funcionario</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Nome"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nome Funcionário"
          />

        <TextField
          label="Sexo"
          variant="outlined"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
          placeholder="Sexo"
          />

        <TextField
          label="Endereço"
          variant="outlined"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
          placeholder="Rua ..."
        />

        <TextField
          label="Telefone"
          variant="outlined"
          type="text"
          value={telefone}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = value.replace(/[^\d\s-]/g, ""); 
            setTelefone(numericValue);
          }}
          required
          placeholder="99 9999-2333"
          />

        <TextField
          label="Foto"
          variant="outlined"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          required
          placeholder="link da imagem"
          />

        <TextField
          label="Data de Nascimento"
          variant="outlined"
          type="text"
          value={nascimento}
          onChange={dataNascimento}
          required
          placeholder="DD/MM/AAAA"
          />

        <TextField
          label="Cargo"
          variant="outlined"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
          placeholder="Digite o cargo do funcionário"
          />

        <TextField
          label="Setor"
          variant="outlined"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          required
          placeholder="Setor que o funcionario trabalha"
          />

        <TextField
          label="Salário"
          variant="outlined"
          value={salario}
          onChange={(e) => {
            const value = e.target.value;
            const formattedValue = value.replace(/[^0-9,.]/g, ""); // Remove caracteres não numéricos, exceto pontos e vírgulas
            setSalario(formattedValue);
          }}
          required
          placeholder="Digite o salário (ex: 1000,50)"
          />

        <TextField
          label="Data de Admissão"
          variant="outlined"
          value={admisao}
          onChange={dataAdmisao}
          required
          placeholder="DD/MM/AAAA"
          />
      

        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
       
      </form>
    </div>
          </>
  );
}

export default CadastrarFuncionario;
