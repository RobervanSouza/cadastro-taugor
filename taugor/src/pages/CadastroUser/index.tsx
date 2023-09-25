import React, { FormEvent, useState } from "react";
import { TextField, Button, } from "@mui/material";
import styles from "./styles.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../config/configuraFirebase";
import LogoComponent from "../../components/logo/logo";

function Cadastrar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Email inválido");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("A senha deve conter pelo menos 6 caracteres");
    } else {
      setPasswordError("");
    }
  };

  async function submitEmail(event: FormEvent) {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      // Verifique se os campos de email e senha estão vazios e defina uma mensagem de erro
      setEmailError("Preencha todos os campos.");
      return;
    }

    if (isEmailValid && isPasswordValid) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // Define a mensagem de sucesso e limpa os campos
        alert("Usuário cadastrado com sucesso!");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className={styles.geral}>
        <div> <LogoComponent/> </div>
        <h1>Cadastrar usuario</h1>
        <form onSubmit={submitEmail} className={styles.form}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid && !!emailError}
            helperText={emailError}
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            name="senha"
            value={password}
            onChange={handlePasswordChange}
            error={!isPasswordValid && !!passwordError}
            helperText={passwordError}
          />

          <Button type="submit" variant="contained" color="primary">
            Cadastrar
          </Button>
          <Button variant="contained" color="primary">
            <Link style={{ textDecoration: "none", color: "white" }} to="/home">
              Navegar para a página home
            </Link>
          </Button>
        </form>
      </div>
    </>
  );
}

export default Cadastrar;
