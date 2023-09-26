import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { UserType } from "../../types/userTypes";
import { ref, update } from "firebase/database";
import { database } from "../../config/configuraFirebase";
import styles from "./styles.module.scss";
  import { toast } from "react-toastify";

  import "react-toastify/dist/ReactToastify.css";


interface EditUserFormProps {
  usuario: UserType;
  onCancel: () => void;
  onSave: (editedUser: UserType) => void;
}

function EditUserForm({ usuario, onCancel, onSave }: EditUserFormProps) {
  const [editedUser, setEditedUser] = useState(usuario);
  const [isSaving, setIsSaving] = useState(false);

 
  function notificacao() {
    toast.success("Funcionário editado com sucesso!");
  }


  const handleSave = async () => {
    try {
      
      // Atualize os dados do usuário no Firebase
      const usuariosRef = ref(database, `users/${usuario.id}`);
      await update(usuariosRef, editedUser);
      
      notificacao();

      // Chame a função onSave com os dados editados
      onSave({ ...editedUser, id: usuario.id });

     
      setIsSaving(false);
    } catch (error) {
      // Lide com erros, se necessário
      console.error("Erro ao salvar:", error);
      // Defina o estado de salvamento como concluído, mesmo em caso de erro
      setIsSaving(false);
    }
  };

  const handleCargoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCargo = e.target.value;
    setEditedUser((prevUser) => ({
      ...prevUser,
      cargo: newCargo,
    }));
  };

  const handleCargoBlur = () => {
    // Adicione o cargo atual ao histórico se for diferente do cargo inicial
    if (editedUser.cargo !== usuario.cargo) {
      setEditedUser((prevUser) => ({
        ...prevUser,
        cargoHistorico: [...(prevUser.cargoHistorico || []), usuario.cargo],
      }));
    }
  };



  return (
    <>
      <div className={styles.editar}>
        <TextField
          label="Nome"
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
          required
        />
        <TextField
          label="Sexo"
          value={editedUser.sexo}
          onChange={handleCargoChange}
          onBlur={handleCargoBlur}
          required
        />
        <TextField
          label="Endereço"
          value={editedUser.endereco}
          onChange={handleCargoChange}
          onBlur={handleCargoBlur}
          required
        />
        <TextField
          label="Contato"
          value={editedUser.telefone}
          onChange={handleCargoChange}
          onBlur={handleCargoBlur}
          required
        />
        <TextField
          label="Data Nascimento"
          value={editedUser.nascimento}
          onChange={handleCargoChange}
          onBlur={handleCargoBlur}
          required
        />
        <TextField
          label="Setor"
          value={editedUser.setor}
          onChange={handleCargoChange}
          onBlur={handleCargoBlur}
          required
        />
        <TextField
          label="Salario"
          value={editedUser.salario}
          onChange={handleCargoChange}
          onBlur={handleCargoBlur}
          required
        />
        <TextField
          label="Data Admissão"
          value={editedUser.admisao}
          onChange={handleCargoChange}
          onBlur={handleCargoBlur}
          required
        />
        <TextField
          label="Cargo atual"
          value={editedUser.cargo}
          onChange={handleCargoChange}
          onBlur={handleCargoBlur}
          required
        />
        <TextField
          label="Status"
          variant="outlined"
          value={editedUser.status} // Use o valor do status diretamente a partir do estado editedUser
          onChange={
            (e) => setEditedUser({ ...editedUser, status: e.target.value }) // Atualize o status diretamente no editedUser
          }
          onBlur={handleCargoBlur}
          required
          select
          SelectProps={{
            native: true,
          }}>
          <option value="ativo">Ativo</option>
          <option value="demitido">Demitido</option>
        </TextField>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </div>
    </>
  );
}

export default EditUserForm;
