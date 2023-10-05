import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/configuraFirebase";
import LogoComponent from "../logo/logo";
import HomeIcon from "@mui/icons-material/Home";

const Header = () => {
  const navigate = useNavigate();

  async function sair() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  function cadastrar() {
    navigate("/cadastrafuncionario");
  }

  function home() {
    navigate("/");
  }

  return (
    <>
      <header className={styles.header}>

        <div className={styles.logo}>
          <LogoComponent width="222px" height="70px" />
        </div>
        
        <div className={styles.navbar}>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={home}>
            <HomeIcon />
          </Button>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={cadastrar}>
            Cadastrar Funcionário
          </Button>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={sair}>
            Sair
          </Button>
          
        </div>
      </header>
    </>
  );
};

export default Header;
