import React, { FormEvent, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./styles.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/configuraFirebase";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import LogoComponent from "../../components/logo/logo";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar o estado de autenticação do usuário assim que a página é montada
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // O usuário já está autenticado, redirecionar para a página inicial
        navigate("/home");
      }
    });

    // Lembre-se de cancelar a inscrição quando o componente for desmontado
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
     
      if (!isEmailValid) {
        setEmailError("Digite email valido");
      }
      if (!isPasswordValid) {
        setPasswordError("A senha deve conter pelo menos 6 caracteres");
      }
    }
  }

  return (
    <>
      <div className={styles.geral}>
      <LogoComponent/>
        <h1>Acesse sua conta</h1>
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

          <Button type="button" variant="contained" className="primary">
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "white" }}>
              Acessar como Admin
            </Link>
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
