import React, { FormEvent, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./styles.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/configuraFirebase";

function Cadastrar() {
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

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(response);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className={styles.geral}>
        <h1>Cadastrar</h1>
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
        </form>
      </div>
    </>
  );
}

export default Cadastrar;
