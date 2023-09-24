import React, { FormEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { criarUsuario } from "../../utils/user"; // Importe a função criarUsuario aqui
import { UserType } from "../../types/userTypes";
import { useNavigate } from "react-router-dom";

function CadastrarFuncionario() {
  const [name, setName] = useState("");
  const [sexo, setSexo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState(0); // Alterado para número
  const [foto, setFoto] = useState("");
  const [nascimento, setNascimento] = useState(0); // Alterado para número
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");
  const [salario, setSalario] = useState("");

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
    };

    criarUsuario(usuario);

    // Redirecionar para a página desejada após o cadastro
    navigate("/home");
  };

  return (
    <div>
      <h1>Cadastrar</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Sexo"
          variant="outlined"
          fullWidth
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
        />
        <TextField
          label="Endereço"
          variant="outlined"
          fullWidth
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
        <TextField
          label="Telefone"
          variant="outlined"
          fullWidth
          type="number" // Alterado para tipo "número"
          value={telefone}
          onChange={(e) => setTelefone(Number(e.target.value))} // Convertido para número
        />
        <TextField
          label="Foto"
          variant="outlined"
          fullWidth
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
        />
        <TextField
          label="Data de Nascimento"
          variant="outlined"
          fullWidth
          type="number" // Alterado para tipo "número"
          value={nascimento}
          onChange={(e) => setNascimento(Number(e.target.value))} // Convertido para número
        />
        <TextField
          label="Cargo"
          variant="outlined"
          fullWidth
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />
        <TextField
          label="Setor"
          variant="outlined"
          fullWidth
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
        />
        <TextField
          label="Salário"
          variant="outlined"
          fullWidth
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default CadastrarFuncionario;
