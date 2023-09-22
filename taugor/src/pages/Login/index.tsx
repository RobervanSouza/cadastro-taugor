import { TextField, Button } from "@mui/material";
import styles from "./styles.module.scss"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FormEvent, useState } from 'react';
import { auth,} from "../../config/configuraFirebase";
import { useNavigate } from "react-router-dom";


function Login() {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  
  async  function submitEmail(event: FormEvent) {
    event.preventDefault();
  try {
    if( !email || !password ) {
      throw new Error('Digite seu email ou sua senha')
    }
   const respose=   await  signInWithEmailAndPassword(auth, email, password)
   console.log(respose)
   navigate("/home")
  } catch (error) {
    console.log(error)
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
          
          <h1>Acessa sua conta Taugor</h1>     
          <form onSubmit={submitEmail} className={styles.form} >  
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              type="password"
              name="senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
       
          
            <Button type="button" variant="contained" color="primary" onClick={loginGoogle} >
              email
            </Button>
       
          </form>
  
      </div>
    </>
  );
}

export default Login
