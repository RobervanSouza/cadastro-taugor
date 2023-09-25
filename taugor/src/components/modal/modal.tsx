import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Detalhes do Funcionário</DialogTitle>
      <DialogContent>
        {isEditing ? (
          <EditUserForm
            usuario={editedUser}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        ) : (
          <div className={styles.geral}>
            <p>Nome: {editedUser.name}</p>
            <p>Cargo atual: {editedUser.cargo}</p>
            <div className={styles.historico}>
              <h6>Histórico do funcionário</h6>
              {editedUser.cargoHistorico?.map((cargo, index) => (
                <p key={index}>
                  {index + 1}° Cargo: <span>{cargo}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
      {!isEditing && <Button onClick={handleEdit}>Editar</Button>}
      {!isEditing && <Button onClick={handleClose}>Fechar</Button>}
      {!isEditing && (
        <Button onClick={handleDelete} color="error">
          Excluir
        </Button>
      )}
    </Dialog>
  );
}

export default UserDetailsModal;
