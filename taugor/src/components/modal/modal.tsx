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

function UserDetailsModal({ usuario, isOpen, onClose, onUpdateUser, onDeleteUser,}: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(usuario); // Inicialize o estado editedUser com os dados do usuário

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (editedUserData: UserType) => {
    // Atualize o estado editedUser com os dados editados
    setEditedUser(editedUserData);

    // Implemente a lógica para salvar as alterações do usuário aqui
    setIsEditing(false);
       onUpdateUser(editedUserData);
  };

   const handleClose = () => {
     // Chame a função onUpdateUser com os dados atuais do usuário
     onUpdateUser(editedUser);

     // Feche o modal
     onClose();
   };

   
  const handleDelete = async () => {
    try {
      // Chame a função onDeleteUser com o ID do usuário a ser excluído
      onDeleteUser(usuario.id);

      // Feche o modal
      onClose();
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Detalhe do Funcionário</DialogTitle>
      <DialogContent>
        {isEditing ? (
          <EditUserForm
            usuario={editedUser} // Passe o estado editedUser para o EditUserForm
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
                  {index + 1}° Cargo : <span>{cargo}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
      <Button onClick={handleEdit}>Editar</Button>
      <Button onClick={handleDelete} color="error">
        Excluir
      </Button>
      <Button onClick={handleClose}>Fechar</Button>
    </Dialog>
  );
}

export default UserDetailsModal;
