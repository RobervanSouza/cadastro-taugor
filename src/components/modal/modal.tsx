import { Dialog, DialogTitle, Button } from "@mui/material";
import { UserType } from "../../types/userTypes";
import { useState } from "react";
import EditUserForm from "../editarFuncionario/editar";
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
  const [editar, setEditar] = useState(false);
  const [editedUser, setEditedUser] = useState(usuario);

  const botaoEditar = () => {
    setEditar(true);
  };

  const botaoCancelar = () => {
    setEditar(false);
  };

  const botaoSalvar = (editedUserData: UserType) => {
    setEditedUser(editedUserData);
    setEditar(false);
    onUpdateUser(editedUserData);
  };

  const botaoFechar = () => {
    if (!editar) {
      onUpdateUser(editedUser);
    }
    onClose();
  };

  const botaoDeletar = async () => {
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
          {editar ? (
            <EditUserForm
              usuario={editedUser}
              onCancel={botaoCancelar}
              onSave={botaoSalvar}
            />
          ) : (
            <div className={styles.card}>
              <section className={styles.section}>
                <div className={styles.div1}>
                 
                    <p>
                      Nome:&nbsp; <span>{editedUser.name}</span>
                    </p>
                  
                  
                    <p>
                      Sexo:&nbsp; <span>{editedUser.sexo}</span>
                    </p>
                  
                  
                    <p>
                      Endereço:&nbsp; <span>{editedUser.endereco}</span>
                    </p>
                  
                  
                    <p>
                      Contato:&nbsp; <span>{editedUser.telefone}</span>
                    </p>
                 
                    <p>
                      Data Nascimento:&nbsp;{" "}
                      <span> {editedUser.nascimento}</span>
                    </p>
                    <p >
                      Setor:&nbsp; <span>{editedUser.setor}</span>
                    </p>
                    <p >
                      Salario:&nbsp; <span>{editedUser.salario}</span>
                    </p>
                    <p>
                      Data Admissão:&nbsp; <span>{editedUser.admisao}</span>
                    </p>
                  
                </div>
                <div className={styles.div2}>
                  <div className={styles.status}>
                    <p>
                      Status:&nbsp;<span>{editedUser.status}</span>
                    </p>
                  </div>
                  <div className={styles.cargoParagrafo}>
                    <p>
                      Cargo atual:&nbsp;<span>{editedUser.cargo}</span>
                    </p>
                  </div>
                  <div className={`${styles.historico} ${styles.paragraph}`}>
                    <h4>Histórico de Cargo</h4>
                    {editedUser.cargoHistorico?.map((cargo, index) => (
                      <p key={index}>
                        {index + 1}° Cargo: <span>{cargo}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
        <div className={styles.botoes}>
          <p className={styles.btnEditar}>
            {!editar && (
              <Button onClick={botaoEditar} style={{ color: "white" }}>
                Editar
              </Button>
            )}
          </p>
          <p className={styles.btnFecha}>
            {!editar && (
              <Button style={{ color: "white" }} onClick={botaoFechar}>
                Fechar
              </Button>
            )}
          </p>
          <p className={styles.btnExcluir}>
            {!editar && (
              <Button
                style={{ color: "white" }}
                onClick={botaoDeletar}
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
