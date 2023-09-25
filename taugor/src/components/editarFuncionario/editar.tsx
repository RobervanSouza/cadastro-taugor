import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { UserType } from "../../types/userTypes";
import { ref, update } from "firebase/database";
import { database } from "../../config/configuraFirebase";

interface EditUserFormProps {
  usuario: UserType;
  onCancel: () => void;
  onSave: (editedUser: UserType) => void;
}

function EditUserForm({ usuario, onCancel, onSave }: EditUserFormProps) {
  const [editedUser, setEditedUser] = useState(usuario);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      // Atualize os dados do usuário no Firebase
      const usuariosRef = ref(database, `users/${usuario.id}`);
      await update(usuariosRef, editedUser);

      // Chame a função onSave com os dados editados
      onSave({ ...editedUser, id: usuario.id });

      // Defina o estado de salvamento como concluído
      setIsSaving(false);
    } catch (error) {
      // Lide com erros, se necessário
      console.error("Erro ao salvar:", error);
      // Defina o estado de salvamento como concluído, mesmo em caso de erro
      setIsSaving(false);
    }
  };

  // Adicione um histórico de cargos quando o cargo atual for alterado
 const handleCargoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const newCargo = e.target.value;
   setEditedUser((prevUser) => ({
     ...prevUser,
     cargo: newCargo,
   }));
 };
 const handleCargoBlur = () => {
   setEditedUser((prevUser) => ({
     ...prevUser,
     cargoHistorico: [...(prevUser.cargoHistorico || []), prevUser.cargo],
   }));
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
        onChange={handleCargoChange}
        onBlur={handleCargoBlur}
        />

      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Salvando..." : "Salvar"}
      </Button>
      <Button onClick={onCancel}>Cancelar</Button>
    </div>
  );
}

export default EditUserForm;
