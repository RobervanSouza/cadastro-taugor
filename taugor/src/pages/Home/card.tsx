// UserCard.js

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { UserType } from "../../types/userTypes";
import styles from "./styles.module.scss";

interface UserCardProps {
  usuario: UserType;
}

function UserCard({ usuario }: UserCardProps) {
  const userDetails = [
    { label: "Cargo", value: usuario.cargo },
    { label: "Setor", value: usuario.setor },
    // Adicione outros campos do usuário aqui
  ];

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
    </Card>
  );
}

export default UserCard;
