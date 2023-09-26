import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { UserType } from "../../types/userTypes";
import styles from "./styles.module.scss";
import UserDetailsModal from "../modal/modal";

interface UserCardProps {
  usuario: UserType;
  onUpdateUser: (updatedUser: UserType) => void;
  onDeleteUser: (userId: string) => void;
}

function UserCard({ usuario, onUpdateUser, onDeleteUser }: UserCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showCargoHistorico, setShowCargoHistorico] = useState(false); // Adicione o estado para controlar a exibição do histórico

  const userDetails = [
    { label: "Sexo", value: usuario.sexo },
    { label: "Endereço", value: usuario.endereco },
    { label: "Contato", value: usuario.telefone },
    { label: "Data de Nascimento", value: usuario.nascimento },
    { label: "Setor", value: usuario.setor },
    { label: "Salário", value: usuario.salario },
    { label: "Data Admissão", value: usuario.admisao },
    { label: "Cargo Atual", value: usuario.cargo },
  ];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    onUpdateUser(usuario);
  };

  const toggleCargoHistorico = () => {
    // Alterne a exibição do histórico quando o botão for clicado
    setShowCargoHistorico(!showCargoHistorico);
  };

  return (
    <Card className={styles["user-card"]}>
      <CardContent className={styles["card-content"]}>
        <div className={styles["user-image"]}>
          <img src={usuario.foto} alt={usuario.name} />
        </div>
        <Typography className={styles["user-name"]} variant="h6">
          {usuario.name}
        </Typography>
        {userDetails.map((detail, index) => (
          <Typography
            key={index}
            className={
              styles["user-details"]
            }>{`${detail.label}: ${detail.value}`}</Typography>
        ))}
        {showCargoHistorico && (
          <div className={`${styles.historico} ${styles.paragraph}`}>
            <h4>Histórico de Cargo</h4>
            {usuario.cargoHistorico?.map((cargo, index) => (
              <p key={index}>
                {index + 1}° Cargo: <span>{cargo}</span>
              </p>
            ))}
          </div>
        )}
        <Button onClick={toggleCargoHistorico}>
          {showCargoHistorico ? "Esconder Histórico" : "Ver Histórico dos Cargos"}
        </Button>
      </CardContent>
      <Button onClick={openModal}>Ver Detalhes</Button>
      <UserDetailsModal
        usuario={usuario}
        isOpen={modalOpen}
        onClose={closeModal}
        onUpdateUser={onUpdateUser}
        onDeleteUser={onDeleteUser}
      />
    </Card>
  );
}

export default UserCard;
