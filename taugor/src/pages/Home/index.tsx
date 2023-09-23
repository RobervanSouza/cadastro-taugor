import { signOut } from "firebase/auth";
import styles from "./styles.module.scss"
import { auth } from "../../config/configuraFirebase";
import { useNavigate } from "react-router-dom";

function Home() {
 
  const navigate = useNavigate()
    function sair() {
      signOut(auth)
      navigate("/")
    }
  return (
    <>
      <div className={styles.geral}>
          
          <h1>Pagina home</h1>     
         
         <button onClick={sair} >Sair</button>
      </div>
    </>
  );
}

export default Home;
