import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { UserType } from "../../types/userTypes";
import React, { useState } from "react";
import EditUserForm from "../editarFuncionario/editar"; // Importe o componente de edição

interface UserDetailsModalProps {
  usuario: UserType;
  isOpen: boolean;
  onClose: () => void;
  
}

function UserDetailsModal({ usuario, isOpen, onClose }: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(usuario);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (editedUserData : UserType) => {
    // Atualize o estado editedUser com os dados editados
    setEditedUser(editedUserData);

    // Implemente a lógica para salvar as alterações do usuário aqui
    setIsEditing(false);
   
  };


  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Detalhes do Funcionário</DialogTitle>
      <DialogContent>
        {isEditing ? (
          <EditUserForm
            usuario={editedUser} // Passe o estado editedUser para o EditUserForm
            onCancel={handleCancel}
            onSave={handleSave}
          />
        ) : (
          <div>
            <p>Nome: {usuario.name}</p>
            <p>Cargo: {usuario.cargo}</p>
            <p>Setor: {usuario.setor}</p>
            {/* Adicione mais informações do funcionário aqui */}
          </div>
        )}
      </DialogContent>
      <Button onClick={handleEdit}>Editar</Button>
      <Button onClick={onClose}>Fechar</Button>
    </Dialog>
  );
}


export default UserDetailsModal;
