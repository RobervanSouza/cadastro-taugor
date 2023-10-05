
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";


const Pagina404 = () => {
  return (
   
        <div className={styles.geral}>
          <h1>404 - Página não encontrada</h1>
          <p>Desculpe, a página que você está procurando não existe.</p>
          <Link to="/">Voltar para a página inicial</Link>
        </div>
      
  
  );
};

export default Pagina404;
