import React, { FormEvent, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./styles.module.scss";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/configuraFirebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

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
      setEmailError(""); // Limpar erro de email se for válido
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("A senha deve conter pelo menos 6 caracteres");
    } else {
      setPasswordError(""); // Limpar erro de senha se for válido
    }
  };

  async function submitEmail(event: FormEvent) {
    event.preventDefault();

    // Verificar se o email e a senha são válidos antes de prosseguir
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(response);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      // Se algum dos campos não for válido, mostrar mensagens de erro
      if (!isEmailValid) {
        setEmailError("Email inválido");
      }
      if (!isPasswordValid) {
        setPasswordError("A senha deve conter pelo menos 6 caracteres");
      }
    }
  }

  async function loginGoogle(event: FormEvent) {
    event.preventDefault();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.geral}>
        <h1>Acesse sua conta Taugor</h1>
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
            Entrar
          </Button>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={loginGoogle}>
            Entrar com conta Google
          </Button>
          <h1>Ainda não tem conta?</h1>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => navigate("/cadastrar")}>
            <h3>Faça seu Cadastro!</h3>
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
