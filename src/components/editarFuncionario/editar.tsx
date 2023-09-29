import { useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { UserType } from "../../types/userTypes";
import { ref, update } from "firebase/database";
import { database } from "../../config/configuraFirebase";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBoxIcon from "@mui/icons-material/AccountBox";



interface EditUserFormProps {
  usuario: UserType;
  onCancel: () => void;
  onSave: (editedUser: UserType) => void;
}

function EditUserForm({ usuario, onCancel, onSave }: EditUserFormProps) {
  const [editedUser, setEditedUser] = useState(usuario);
  const [isSaving, setIsSaving] = useState(false);

  const [foto, setFoto] = useState(usuario.foto);
 
  function notificacao() {
    toast.success("Funcionário editado com sucesso!");
  }


  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Atualize os dados do usuário no Firebase
      const usuariosRef = ref(database, `users/${usuario.id}`);
       await update(usuariosRef, {
         ...editedUser,
         foto: foto, 
       });

      // Chame a função onSave com os dados editados
      onSave({ ...editedUser, id: usuario.id });

      notificacao();

      setIsSaving(false);
    } catch (error) {
      // Lide com erros, se necessário
      console.error("Erro ao salvar:", error);
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




  
  const [imagemPlaceholder, setImagemPlaceholder] = useState<string | null>(
    null
  );

  const [escolherArquivo, setEscolherArquivo] = useState(true);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoto(e.target.value);
  };

  const handleCheckboxChange = () => {
    // Limpar a input de foto quando o checkbox for clicado
    setFoto("");
    // Alternar entre escolher arquivo e colar link
    setEscolherArquivo(!escolherArquivo);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.startsWith("http://") || value.startsWith("https://")) {
      // Se o valor começa com 'http://' ou 'https://', assumimos que é um link de imagem
      setImagemPlaceholder(value);
      setFoto(value); // Atualize o estado 'foto' com o link da imagem
    } else {
      // Caso contrário, assume-se que é um arquivo
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataURL = event.target && event.target.result;
          if (dataURL) {
            setImagemPlaceholder(dataURL as string);
            setFoto(dataURL as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };




  return (
    <>
      <div className={styles.editar}>
        <section>
          <div className={styles.foto}>
            <div className={styles.iconeFoto}>
              <TextField
                label="Foto"
                variant="outlined"
                value={foto}
                onChange={handleChange}
                disabled
                fullWidth
                className={styles.input}
                InputProps={{
                  startAdornment: (
                    <div className={styles.icon}>
                      {imagemPlaceholder ? (
                        <img
                          src={imagemPlaceholder}
                          alt="Imagem"
                          className={styles.imgPla}
                        />
                      ) : (
                        <AccountBoxIcon
                          className={styles.icon}
                          style={{ color: "#06a0ec" }}
                        />
                      )}
                    </div>
                  ),
                }}
              />
            </div>

            <label className={styles.uploadLabel}>
              {escolherArquivo ? "Escolher arquivo" : "Colar link"}
              <input
                type={escolherArquivo ? "file" : "text"}
                accept={escolherArquivo ? "image/*" : undefined}
                className={styles.fotoInput}
                onChange={handleFileChange}
                placeholder="  Colar link da foto"
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={escolherArquivo}
                onChange={handleCheckboxChange}
              />{" "}
              Arquivo ou Link
            </label>
          </div>
        </section>
        <section className={styles.nomeSexo}>
          <div>
            <TextField
              label="Nome"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
              required
              placeholder="Nome do Funcionário..."
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: "#06a0ec", width: "42px" }}>
                    <PersonIcon style={{ color: "#06a0ec" }} />
                  </InputAdornment>
                ),
              }}
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
              placeholder="Sexo"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: "#06a0ec", width: "42px" }}>
                    <WcIcon style={{ color: "#06a0ec" }} />
                  </InputAdornment>
                ),
              }}
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
              placeholder="Rua ....."
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: "#06a0ec", width: "42px" }}>
                    <AddLocationIcon style={{ color: "#06a0ec" }} />
                  </InputAdornment>
                ),
              }}
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
              placeholder="99 9999-9999"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: "#06a0ec", width: "42px" }}>
                    <LocalPhoneIcon style={{ color: "#06a0ec" }} />
                  </InputAdornment>
                ),
              }}
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
              placeholder="DD/MM/AAAA"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: "#06a0ec", width: "42px" }}>
                    <CalendarMonthIcon style={{ color: "#06a0ec" }} />
                  </InputAdornment>
                ),
              }}
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
              placeholder="Setor onde Trabalha"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: "#06a0ec", width: "42px" }}>
                    <SettingsIcon style={{ color: "#06a0ec" }} />
                  </InputAdornment>
                ),
              }}
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
              placeholder="R$"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: "#06a0ec", width: "42px" }}>
                    <AttachMoneyIcon style={{ color: "#06a0ec" }} />
                  </InputAdornment>
                ),
              }}
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
              placeholder="DD/MM/AAAA"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: "#06a0ec", width: "42px" }}>
                    <CalendarMonthIcon style={{ color: "#06a0ec" }} />
                  </InputAdornment>
                ),
              }}
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
            placeholder="Cargo atual"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ color: "#06a0ec", width: "42px" }}>
                  <WorkIcon style={{ color: "#06a0ec" }} />
                </InputAdornment>
              ),
            }}
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
            <Button
              onClick={onCancel}
              variant="contained"
              color="primary"
              style={{ color: "white", width: "223px" }}>
              Cancelar
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default EditUserForm;
