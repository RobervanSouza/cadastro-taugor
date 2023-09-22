import { TextField, Button } from "@mui/material";
import styles from "./styles.module.scss"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from 'react';
import { app,} from "../../config/configuraFirebase";


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  
  const auth = getAuth(app);

  async  function submit(event: FormEvent) {
    event.preventDefault();
  try {
    if( !email || !password ) {
      throw new Error('Digite seu email ou sua senha')
    }
   const respose=   await  signInWithEmailAndPassword(auth, email, password)
   console.log(respose)
  } catch (error) {
    console.log(error)
  }
  }
    
  return (
    <>
      <div className={styles.geral}>
          
          <h1>Acessa sua conta Taugor</h1>     
          <form onSubmit={submit} className={styles.form} >  
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
          </form>
  
      </div>
    </>
  );
}

export default Login
