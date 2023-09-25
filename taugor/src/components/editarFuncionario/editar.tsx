import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { UserType } from "../../types/userTypes";
import { ref, update } from "firebase/database"; // Importe as funções necessárias do Firebase
import { database } from "../../config/configuraFirebase";

interface EditUserFormProps {
  usuario: UserType;
  onCancel: () => void;
  onSave: (editedUser: UserType) => void;
}

function EditUserForm({ usuario, onCancel, onSave }: EditUserFormProps) {
  const [editedUser, setEditedUser] = useState(usuario);

  const handleSave = async () => {
    
    try {
      // Atualize os dados do usuário no Firebase
      const usuariosRef = ref(database, `users/${usuario.id}`);
      await update(usuariosRef, editedUser);

      // Chame a função onSave com os dados editados
      onSave({ ...editedUser, id: usuario.id });

      // Após salvar com sucesso, você pode executar alguma ação, como fechar o formulário
      window.location.reload();
     
    } catch (error) {
      // Lide com erros, se necessário
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div>
      <TextField
        label="Nome"
        value={editedUser.name}
        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
      />
      <TextField
        label="Cargo"
        value={editedUser.cargo}
        onChange={(e) =>
          setEditedUser({ ...editedUser, cargo: e.target.value })
        }
      />
      <TextField
        label="Setor"
        value={editedUser.setor}
        onChange={(e) =>
          setEditedUser({ ...editedUser, setor: e.target.value })
        }
      />
      <Button onClick={handleSave}>Salvar</Button>
      <Button onClick={onCancel}>Cancelar</Button>
    </div>
  );
}

export default EditUserForm;
