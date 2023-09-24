import { FormEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { criarUsuario } from "../../utils/user"; // Importe a função criarUsuario aqui
import { UserType } from "../../types/userTypes";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../../components/logo/logo";
import styles from "./styles.module.scss";


function CadastrarFuncionario() {
  const [name, setName] = useState("");
  const [sexo, setSexo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState(''); // Alterado para número
  const [foto, setFoto] = useState("");
  const [nascimento, setNascimento] = useState(''); // Alterado para número
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");
  const [salario, setSalario] = useState("");
  const [admisao, setAdmisao] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

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
      admisao
    };

    criarUsuario(usuario);

    // Redirecionar para a página desejada após o cadastro
    navigate("/home");
  };
  


  return (
    <div className={styles.geral}>
      <div>
        <LogoComponent />
      </div>
      <h1>Cadastrar Funcionario</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Robervan Souza"
        />
        <TextField
          label="Sexo"
          variant="outlined"
          fullWidth
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
          placeholder="Sexo"
        />
        <TextField
          label="Endereço"
          variant="outlined"
          fullWidth
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
          placeholder="Rua ..."
        />
        <TextField
          label="Telefone"
          variant="outlined"
          fullWidth
          type="text"
          value={telefone}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = value.replace(/[^\d\s-]/g, ""); // Remove todos os caracteres não numéricos, exceto espaços e hífens
            setTelefone(numericValue);
          }}
          required
          placeholder="99 9999-2333"
        />

        <TextField
          label="Foto"
          variant="outlined"
          fullWidth
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          required
          placeholder="link da imagem"
        />
        <TextField
          label="Data de Nascimento"
          variant="outlined"
          fullWidth
          type="text"
          value={nascimento}
          onChange={(e) => {
            const value = e.target.value;
            const formattedValue = value.replace(/[^0-9/]/g, ""); // Remove caracteres não numéricos e não "/"
            setNascimento(formattedValue);
          }}
          required
          placeholder="DD/MM/AAAA"
        />

        <TextField
          label="Cargo"
          variant="outlined"
          fullWidth
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
          placeholder="Digite o cargo do funcionário"
        />
        <TextField
          label="Setor"
          variant="outlined"
          fullWidth
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          required
          placeholder="Setor que o funcionario trabalha"
        />
        <TextField
          label="Salário"
          variant="outlined"
          fullWidth
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
          label="Data de admisão"
          variant="outlined"
          fullWidth
          value={admisao}
          onChange={(e) => {
            const value = e.target.value;
            const formattedValue = value.replace(/[^0-9/]/g, ""); // Remove caracteres não numéricos e não "/"
            setAdmisao(formattedValue);
          }}
          required
          placeholder="DD/MM/AAAA"
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default CadastrarFuncionario;
