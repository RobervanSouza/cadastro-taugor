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
        <section className={styles.nomeSexo}>
          <div>
            <TextField
              label="Nome"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <TextField
              label="Sexo"
              value={editedUser.sexo}
              onChange={(e) =>
                setEditedUser({ ...editedUser, sexo: e.target.value })
              }
          
              required
            />
          </div>
        </section>
        <section className={styles.enderecoTelefone}>
          <div>
            <TextField
              label="Endereço"
              value={editedUser.endereco}
              onChange={(e) =>
                setEditedUser({ ...editedUser, endereco: e.target.value })
              }
              
              required
            />
          </div>
          <div>
            <TextField
              label="Contato"
              value={editedUser.telefone}
              onChange={(e) =>
                setEditedUser({ ...editedUser, telefone: e.target.value })
              }
          
              required
            />
          </div>
        </section>
        <section className={styles.nascimentoSetor}>
          <div>
            <TextField
              label="Data Nascimento"
              value={editedUser.nascimento}
              onChange={(e) =>
                setEditedUser({ ...editedUser, nascimento: e.target.value })
              }
              
              required
            />
          </div>
          <div>
            <TextField
              label="Setor"
              value={editedUser.setor}
              onChange={(e) =>
                setEditedUser({ ...editedUser, setor: e.target.value })
              }
              
              required
            />
          </div>
        </section>
        <section className={styles.salarioAdm}>
          <div>
            <TextField
              label="Salario"
              value={editedUser.salario}
              onChange={(e) =>
                setEditedUser({ ...editedUser, salario: e.target.value })
              }
            
              required
            />
          </div>
          <div>
            <TextField
              label="Data Admissão"
              value={editedUser.admisao}
              onChange={(e) =>
                setEditedUser({ ...editedUser, admisao: e.target.value })
              }
              
              required
            />
          </div>
        </section>
        <section className={styles.cargoStatus}>
          <TextField
            label="Cargo atual"
            value={editedUser.cargo}
            onChange={(e) =>
                setEditedUser({ ...editedUser, cargo: e.target.value })
              }
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
            
            required
            select
            SelectProps={{
              native: true,
            }}>
            <option value="ativo">Ativo</option>
            <option value="demitido">Demitido</option>
          </TextField>
        </section>
        <section className={styles.botoes}>
          <div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              variant="contained"
              color="primary"
              style={{ color: "white", width: "223px" }}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
          <div>
            <Button onClick={onCancel} variant="contained" color="primary">
              Cancelar
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default EditUserForm;
