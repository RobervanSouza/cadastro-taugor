import { TextField, Button } from "@mui/material";
import styles from "./styles.module.scss"
import { createUserWithEmailAndPassword, getAuth, } from "firebase/auth";
import { FormEvent, useState } from 'react';
import { app,} from "../../config/configuraFirebase";
import { useNavigate } from "react-router-dom";


const auth = getAuth(app);
function Cadastrar() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate()
  
  async  function submitEmail(event: FormEvent) {
    event.preventDefault();
  try {
    const { user} =   await  createUserWithEmailAndPassword(auth, email, password)
   console.log( user)
   navigate("/home")
  } catch (error) {
    console.log(error)
  }
  }
  




  return (
    <>
      <div className={styles.geral}>
          
          <h1>Cadastrar</h1>     
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
         
          </form>
  
      </div>
    </>
  );
}

export default Cadastrar;