import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { UserType } from "../../types/userTypes";
import styles from "./styles.module.scss";
import UserDetailsModal from "../modal/modal";
import { useNavigate } from "react-router-dom";
import HistoricoCargoModal from "../historicoCargos/historico";

interface UserCardProps {
  usuario: UserType;
  onUpdateUser: (updatedUser: UserType) => void;
  onDeleteUser: (userId: string) => void;
}

function UserCard({ usuario, onUpdateUser, onDeleteUser }: UserCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cargoHistorico, setCargoHistorico] = useState(false);


 const  navigate= useNavigate();
 
 const historicoModal = () => {
   setCargoHistorico(true);
 };


  const userDetails = [
    // { label: "Sexo", value: usuario.sexo },
    // { label: "Endereço", value: usuario.endereco },
    // { label: "Contato", value: usuario.telefone },
    // { label: "Data de Nascimento", value: usuario.nascimento },
    // { label: "Setor", value: usuario.setor },
    // { label: "Salário", value: usuario.salario },
    // { label: "Data Admissão", value: usuario.admisao },
    { label: "Cargo Atual", value: usuario.cargo },
  ];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    onUpdateUser(usuario);
  };

   const verPDF = () => {
     navigate("/visualizar-pdf", { state: { usuario } });
   };

   
  return (
    <>
      <div className={styles.cardGeral}>
        <Card
          className={`${styles["user-card"]} ${
            usuario.status === "demitido" ? styles["demitido"] : styles["ativo"]
          }`}>

          <CardContent className={styles["card-content"]}>
            <div className={styles["user-image"]}>
              <img src={usuario.foto} alt={usuario.name} />
            </div>
            <div className={styles["user-name"]}>
              <p>{usuario.name}</p>
            </div>

            <Typography
              className={`
          ${styles["user-status"]}
          ${usuario.status === "ativo" ? styles["ativo"] : styles["demitido"]}
          `}
              variant="h6">
              <p> Status: {usuario.status}</p>
            </Typography>

            {userDetails.map((detalhes, index) => (
              <Typography
                key={index}
                className={
                  styles.userDetails
                }>{`${detalhes.label}: ${detalhes.value}`}
              </Typography>
            ))}

            <HistoricoCargoModal
              open={cargoHistorico}
              onClose={() => setCargoHistorico(false)}
              historico={usuario.cargoHistorico || []}
            />

            <UserDetailsModal
              usuario={usuario}
              isOpen={modalOpen}
              onClose={closeModal}
              onUpdateUser={onUpdateUser}
              onDeleteUser={onDeleteUser}
            />

          </CardContent>
          <div className={styles.botoes}>
            <Button onClick={historicoModal}>
              {cargoHistorico
                ? "Esconder Histórico"
                : "Ver Histórico dos Cargos"}
            </Button>
            <Button onClick={openModal}>Ver Detalhes</Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={verPDF}>
              visualizar em PDF!
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default UserCard;
