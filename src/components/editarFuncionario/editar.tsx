import { ChangeEvent, useState } from "react";
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
  const [salvando, setSalvando] = useState(false);
  const [foto, setFoto] = useState(usuario.foto);
  const [escolherArquivo, setEscolherArquivo] = useState(true);


  const [imagemPlaceholder, setImagemPlaceholder] = useState<string | null>(
    null
  );

  function notificacao() {
    toast.success("Funcionário editado com sucesso!");
  }

  const salvar = async () => {
    try {
      setSalvando(true);
      const usuariosRef = ref(database, `users/${usuario.id}`);
      await update(usuariosRef, {
        ...editedUser,
        foto: foto,
      });

      onSave({ ...editedUser, id: usuario.id });
      notificacao();
      setSalvando(false);
    } catch (error) {
     
      console.error("Erro ao salvar:", error);
      setSalvando(false);
    }
  };

  const historicoCargos = () => {
  
    if (editedUser.cargo !== usuario.cargo) {
      setEditedUser((prevUser) => ({
        ...prevUser,
        cargoHistorico: [...(prevUser.cargoHistorico || []), usuario.cargo],
      }));
    }
  };




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoto(e.target.value);
  };

  const checkbox = () => {
    setFoto("");
    setEscolherArquivo(!escolherArquivo);
  };

  const linkArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.startsWith("http://") || value.startsWith("https://")) {
      
      setImagemPlaceholder(value);
      setFoto(value); 
    } else {
      
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

 
 
  const formatarData = (value: string) => {
    const valorNumerico = value.replace(/\D/g, "");

    if (valorNumerico.length <= 2) {
      return valorNumerico;
    } else if (valorNumerico.length <= 4) {
      return valorNumerico.slice(0, 2) + "/" + valorNumerico.slice(2);
    } else {
      return (
        valorNumerico.slice(0, 2) +
        "/" +
        valorNumerico.slice(2, 4) +
        "/" +
        valorNumerico.slice(4, 8)
      );
    }
  };

  const dataNascimento = ( e: React.ChangeEvent<HTMLInputElement>) => {
    const formatarValor = formatarData(e.target.value);
    setEditedUser({ ...editedUser, nascimento: formatarValor });
  };

  const dataAdmisao = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatarValor = formatarData(e.target.value);
    setEditedUser({ ...editedUser, admisao: formatarValor });
  };

function onChangeTelefone(e: ChangeEvent<HTMLInputElement>) {
   const valorNumerico = e.target.value.replace(/[^\d]/g, "").slice(0, 11);

   let formatarValor = "";

   if (valorNumerico.length === 10) {
     formatarValor = `(${valorNumerico.slice(0, 2)}) ${valorNumerico.slice(2,6)}-${valorNumerico.slice(6, 10)}`;
   } else if (valorNumerico.length === 11) {
     formatarValor = `(${valorNumerico.slice(0, 2)}) ${valorNumerico.slice(2,7)}-${valorNumerico.slice(7, 11)}`;
   } else {
     formatarValor = valorNumerico;
   }

  setEditedUser({ ...editedUser, telefone: formatarValor });
}

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
            <div className={styles.desFoto}>
              <label className={styles.uploadLabel}>
                {escolherArquivo ? "Escolher arquivo" : "Colar link"}
                <input
                  type={escolherArquivo ? "file" : "text"}
                  accept={escolherArquivo ? "image/*" : undefined}
                  className={styles.fotoInput}
                  onChange={linkArquivo}
                  placeholder="  Colar link da foto"
                />
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={escolherArquivo}
                  onChange={checkbox}
                />{" "}
                Arquivo ou Link
              </label>
            </div>
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
              inputProps={{
                maxLength: 37,
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
              inputProps={{
                maxLength: 20,
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
              inputProps={{
                maxLength: 40,
              }}
            />
          </div>
          <div>
            <TextField
              label="Contato"
              value={editedUser.telefone}
              onChange={onChangeTelefone}
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
              onChange={dataNascimento}
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
              inputProps={{
                maxLength: 30,
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
              inputProps={{
                maxLength: 10,
              }}
            />
          </div>
          <div>
            <TextField
              label="Data Admissão"
              value={editedUser.admisao}
              onChange={dataAdmisao}
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
            onBlur={historicoCargos}
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
            inputProps={{
              maxLength: 40,
            }}
          />
          <TextField
            label="Status"
            variant="outlined"
            value={editedUser.status}
            onChange={(e) =>
              setEditedUser({ ...editedUser, status: e.target.value })
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
              onClick={salvar}
              disabled={salvando}
              variant="contained"
              color="primary"
              style={{ color: "white", width: "223px" }}>
              {salvando ? "Salvando..." : "Salvar"}
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
