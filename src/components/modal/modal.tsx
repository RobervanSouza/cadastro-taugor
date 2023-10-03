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
              <div className={styles.paragraph}>
                <p>
                  Nome: <span>{editedUser.name}</span>
                </p>
              </div>
              <div className={styles.paragraph}>
                <p>
                  Sexo: <span>{editedUser.sexo}</span>
                </p>
              </div>
              <div className={styles.paragraph}>
                <p>
                  Endereço: <span>{editedUser.endereco}</span>
                </p>
              </div>
              <div className={styles.paragraph}>
                <p>
                  Contato: <span>{editedUser.telefone}</span>
                </p>
              </div>
              <p className={styles.paragraph}>
                Data Nascimento: &nbsp; <span> {editedUser.nascimento}</span>
              </p>
              <p className={styles.paragraph}>
                Setor: <span>{editedUser.setor}</span>
              </p>
              <p className={styles.paragraph}>
                Salario: <span>{editedUser.salario}</span>
              </p>
              <p className={styles.paragraph}>
                Data Admissão: <span>{editedUser.admisao}</span>
              </p>
              <div className={styles.status}>
                <p>
                  Status: <span>{editedUser.status}</span>
                </p>
              </div>
              <div className={styles.cargoParagrafo}>
                <p>
                  Cargo atual: <span>{editedUser.cargo}</span>
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
