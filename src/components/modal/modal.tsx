import { Dialog, DialogTitle, Button, Typography } from "@mui/material";
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

  const botaoDeletar = () => {
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
                  <Typography className={styles.customTypography}>
                    Nome:&nbsp; <span>{editedUser.name}</span>
                  </Typography>

                  <Typography className={styles.customTypography}>
                    Sexo:&nbsp; <span>{editedUser.sexo}</span>
                  </Typography>

                  <Typography className={styles.customTypography}>
                    Endereço:&nbsp; <span>{editedUser.endereco}</span>
                  </Typography>

                  <Typography className={styles.customTypography}>
                    Contato:&nbsp; <span>{editedUser.telefone}</span>
                  </Typography>

                  <Typography className={styles.customTypography}>
                    Data Nascimento:&nbsp; <span>{editedUser.nascimento}</span>
                  </Typography>

                  <Typography className={styles.customTypography}>
                    Setor:&nbsp; <span>{editedUser.setor}</span>
                  </Typography>

                  <Typography className={styles.customTypography}>
                    Salario:&nbsp; <span>{editedUser.salario}</span>
                  </Typography>

                  <Typography className={styles.customTypography}>
                    Data Admissão:&nbsp; <span>{editedUser.admisao}</span>
                  </Typography>
                </div>

                <div className={styles.div2}>
                  <div className={styles.status}>
                    <Typography>
                      Status:&nbsp;<span>{editedUser.status}</span>
                    </Typography>
                  </div>
                  <div className={styles.cargoParagrafo}>
                    <Typography>
                      Cargo atual:&nbsp;<span>{editedUser.cargo}</span>
                    </Typography>
                  </div>
                  <div className={styles.historico}>
                    <h4>Histórico de Cargo</h4>
                    {editedUser.cargoHistorico &&
                    editedUser.cargoHistorico.length > 0 ? (
                      editedUser.cargoHistorico.map((cargo, index) => (
                        <div key={index}>
                          <Typography>
                            {index + 1}° Cargo: <span>{cargo}</span>
                          </Typography>
                        </div>
                      ))
                    ) : (
                      <Typography style={{ color: "#06a0ec" }} variant="body1">
                        Nenhum histórico de Cargo!!!.
                      </Typography>
                    )}
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
