import { Dialog, DialogTitle, Button } from "@mui/material";
import { UserType } from "../../types/userTypes";
import { useState } from "react";
import EditUserForm from "../editarFuncionario/editar"; // Importe o componente de edição
import styles from "./styles.module.scss";


interface UserDetailsModalProps {
  usuario: UserType;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (updatedUser: UserType) => void;
  onDeleteUser: (userId: string) => void;
}

function UserDetailsModal({
  usuario,
  isOpen,
  onClose,
  onUpdateUser,
  onDeleteUser,
}: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(usuario);



  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (editedUserData: UserType) => {
    setEditedUser(editedUserData);
    setIsEditing(false);
    onUpdateUser(editedUserData);
  };

  const handleClose = () => {
    if (!isEditing) {
      onUpdateUser(editedUser);
    }
    onClose();
  };

  const handleDelete = async () => {
    try {
      onDeleteUser(usuario.id);
      onClose();
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };


  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <div className={styles.geral}>
        <DialogTitle>
          {" "}
          <h1> Informações de Contato</h1>
        </DialogTitle>
        <div className={styles.cards}>
          {isEditing ? (
            <EditUserForm
              usuario={editedUser}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          ) : (
            <div className={styles.card}>
              {/* Renderize os detalhes do usuário aqui */}
              <p className={styles.paragraph}>Nome: {editedUser.name}</p>
              <p className={styles.paragraph}>Sexo: {editedUser.sexo}</p>
              <p className={styles.paragraph}>
                Endereço: {editedUser.endereco}
              </p>
              <p className={styles.paragraph}>Contato: {editedUser.telefone}</p>
              <p className={styles.paragraph}>
                Data Nascimento: {editedUser.nascimento}
              </p>
              <p className={styles.paragraph}>Setor: {editedUser.setor}</p>
              <p className={styles.paragraph}>Salario: {editedUser.salario}</p>
              <p className={styles.paragraph}>
                Data Admissão: {editedUser.admisao}
              </p>
              <p className={styles.paragraph}>
                Status: {editedUser.status}
              </p>
              <p className={styles.paragraph}>
                Cargo atual: {editedUser.cargo}
              </p>
              <div className={`${styles.historico} ${styles.paragraph}`}>
                <h4>Histórico de Cargo</h4>
                {editedUser.cargoHistorico?.map((cargo, index) => (
                  <p key={index}>
                    {index + 1}° Cargo: <span>{cargo}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.botoes}>
          <p className={styles.btnEditar}>
            {!isEditing && (
              <Button onClick={handleEdit} style={{ color: "white" }}>
                Editar
              </Button>
            )}
          </p>
          <p className={styles.btnFecha}>
            {!isEditing && (
              <Button style={{ color: "white" }} onClick={handleClose}>
                Fechar
              </Button>
            )}
          </p>
          <p className={styles.btnExcluir}>
            {!isEditing && (
              <Button
                style={{ color: "white" }}
                onClick={handleDelete}
                color="error">
                Excluir
              </Button>
            )}
          </p>
        </div>
      </div>
      

    </Dialog>
  );
}

export default UserDetailsModal;
