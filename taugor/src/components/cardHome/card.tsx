import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { UserType } from "../../types/userTypes";
import styles from "./styles.module.scss";
import UserDetailsModal from "../modal/modal";

interface UserCardProps {
  usuario: UserType;
  onUpdateUser: (updatedUser: UserType) => void;
}

function UserCard({ usuario, onUpdateUser }: UserCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const userDetails = [
    { label: "Cargo", value: usuario.cargo },
    { label: "Setor", value: usuario.setor },
  ];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    onUpdateUser(usuario);
  };



  return (
    <Card className={styles["user-card"]}>
      <CardContent className={styles["card-content"]}>
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
      </CardContent>
      <Button onClick={openModal}>Ver Detalhes</Button>
      <UserDetailsModal
        usuario={usuario}
        isOpen={modalOpen}
        onClose={closeModal}
        onUpdateUser={onUpdateUser}
      />
    </Card>
  );
}

export default UserCard;
