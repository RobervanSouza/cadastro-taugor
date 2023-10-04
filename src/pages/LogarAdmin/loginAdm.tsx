import React, { FormEvent, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./styles.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/configuraFirebase";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import LogoComponent from "../../components/logo/logo";

import { toast } from "react-toastify";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

   function notificacao() {
     toast.success("Usuário logado!");
   }
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        notificacao()
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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
   if (event && event.target) {
     const { value } = event.target;
     setEmail(value);
     if (!validateEmail(value)) {
       setEmailError("Email inválido");
     } else {
       setEmailError("");
     }
   }
 };

 const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   if (event && event.target) {
     const { value } = event.target;
     setPassword(value);
     if (value.length < 6) {
       setPasswordError("A senha deve conter pelo menos 6 caracteres");
     } else {
       setPasswordError("");
     }
   }
 };


  async function submitEmail(event: FormEvent) {
    event.preventDefault();

   
    if (isEmailValid && isPasswordValid) {
      try {
        
        if (email === "taugor@getnet.com") {
          const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(response);
          navigate("/cadastrar");
        } else {
          setEmailError("Email ou senha incorretos ou você não e Admin.");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
     
      if (!isEmailValid) {
        setEmailError("Email inválido");
      }
      if (!isPasswordValid) {
        setPasswordError("A senha deve conter pelo menos 6 caracteres");
      }
    }
  }

  return (
    <div className={styles.geral}>
      <div> <LogoComponent/> </div>
      <h1>Entrar como Admin</h1>
      <form onSubmit={submitEmail} className={styles.form}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={email}
          onChange={handleEmailChange}
          error={!isEmailValid || !!emailError}
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
          error={!isPasswordValid || !!passwordError}
          helperText={passwordError}
        />
        <Button type="submit" variant="contained" color="primary">
          Entrar
        </Button>
        <Button type="button" variant="contained" color="primary">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Voltar para login
          </Link>
        </Button>
      </form>
    </div>
  );
}

export default LoginAdmin;
