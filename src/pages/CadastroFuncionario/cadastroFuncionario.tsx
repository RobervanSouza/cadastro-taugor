import { ChangeEvent, FormEvent, useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { criarUsuario } from "../../utils/user";
import { UserType } from "../../types/userTypes";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/header";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function CadastrarFuncionario() {
  const [name, setName] = useState("");
  const [sexo, setSexo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");
  const [salario, setSalario] = useState("");
  const [admisao, setAdmisao] = useState("");
  const [status, setStatus] = useState("ativo");
  const [imagemPlaceholder, setImagemPlaceholder] = useState<string | null>( null );
  const [escolherArquivo, setEscolherArquivo] = useState(true);



  function notificacao() {
    toast.success("Cadastrado com sucesso!");
  }

  const dadosUser = async (event: FormEvent) => {
    event.preventDefault();

    if (!foto) {
      toast.error("Você deve fornecer uma foto antes de salvar.");
      return;
    }

    const resetForm = () => {
      setName("");
      setSexo("");
      setEndereco("");
      setTelefone("");
      setFoto("");
      setNascimento("");
      setCargo("");
      setSetor("");
      setSalario("");
      setAdmisao("");
      setImagemPlaceholder("");
      setStatus("ativo");
    };

    const usuario: UserType = {
      id: "",
      name,
      sexo,
      endereco,
      telefone,
      foto,
      nascimento,
      cargo,
      setor,
      salario,
      admisao,
      status,
    };

    criarUsuario(usuario);
    notificacao();
    resetForm();
    
  };

  const formataData = (event: ChangeEvent<HTMLInputElement>, setData: (formattedValue: string) => void) => {
    const value = event.target.value;
    let formatarValor = value.replace(/\D/g, "");

    if (formatarValor.length > 8) {
      formatarValor = formatarValor.slice(0, 8);
    }

    if (formatarValor.length > 2) {
      formatarValor =
        formatarValor.slice(0, 2) + "/" + formatarValor.slice(2);
    }
    if (formatarValor.length > 5) {
      formatarValor =
        formatarValor.slice(0, 5) + "/" + formatarValor.slice(5);
    }
    setData(formatarValor);
  };
  
const dataAdmisao = (event: ChangeEvent<HTMLInputElement>) => {
  formataData(event, setAdmisao);
}
const dataNascimento = (event: ChangeEvent<HTMLInputElement>) => {
  formataData(event, setNascimento);
}

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoto(e.target.value);
    setImagemPlaceholder(e.target.value);
  };

  
  const checkboxChange = () => {
    
    setFoto("");
    
    setEscolherArquivo(!escolherArquivo);
  };

  const arquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

function onChangeTelefone(e: ChangeEvent<HTMLInputElement>) {
  const valorNumerico = e.target.value.replace(/[^\d]/g, "").slice(0, 11);

  let formatarValor = "";

  if (valorNumerico.length === 10) {
    formatarValor = `(${valorNumerico.slice(0, 2)}) ${valorNumerico.slice( 2, 6 )}-${valorNumerico.slice(6, 10)}`;
  } else if (valorNumerico.length === 11) {
    formatarValor = `(${valorNumerico.slice(0, 2)}) ${valorNumerico.slice( 2, 7 )}-${valorNumerico.slice(7, 11)}`;
  } else {
    formatarValor = valorNumerico;
  }

  setTelefone(formatarValor);
}

  return (
    <>
      <header>
        <Header />
      </header>
      <div className={styles.geral}>
        <form onSubmit={dadosUser} className={styles.form}>
          <section className={styles.fns}>
            <div className={styles.nomeSexo}>
              <TextField
                label="Nome"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nome do funcionário"
                fullWidth
                className={styles.nome}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon style={{ color: "#06a0ec" }} />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 37,
                }}
              />
              <TextField
                label="Sexo"
                variant="outlined"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
                placeholder="Sexo"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WcIcon style={{ color: "#06a0ec" }} />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 20,
                }}
              />
            </div>

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

              <div className={styles.descFoto}>
                <label className={styles.uploadLabel}>
                  {escolherArquivo ? "Escolher arquivo" : "Colar link"}
                  <input
                    type={escolherArquivo ? "file" : "text"}
                    accept={escolherArquivo ? "image/*" : undefined}
                    className={styles.fotoInput}
                    onChange={arquivoChange}
                    placeholder="  Colar link da foto"
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={escolherArquivo}
                    onChange={checkboxChange}
                  />{" "}
                  Arquivo ou Link
                </label>
              </div>
            </div>
          </section>

          <section className={styles.cargo}>
            <div className={styles.cargoStyle}>
              <TextField
                label="Cargo"
                variant="outlined"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                required
                fullWidth
                placeholder="Digite o cargo do funcionário"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon style={{ color: "#06a0ec" }} />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 20,
                }}
              />
            </div>
          </section>
          <section className={styles.endereco}>
            <div className={styles.enderecoTeste}>
              <TextField
                label="Endereço"
                variant="outlined"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
                fullWidth
                placeholder="Rua ..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddLocationIcon style={{ color: "#06a0ec" }} />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 40,
                }}
              />
            </div>
          </section>

          <section className={styles.teleNasci}>
            <div className={styles.telefone}>
              <TextField
                label="Telefone"
                variant="outlined"
                type="text"
                value={telefone}
                onChange={onChangeTelefone}
                required
                fullWidth
                placeholder="99 9999-2333"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneIcon style={{ color: "#06a0ec" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className={styles.nascimento}>
              <TextField
                label="Data de Nascimento"
                variant="outlined"
                type="text"
                fullWidth
                value={nascimento}
                onChange={dataNascimento}
                required
                placeholder="DD/MM/AAAA"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon style={{ color: "#06a0ec" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </section>

          <section className={styles.setorAdm}>
            <div>
              <TextField
                className={styles.adm}
                label="Data de Admissão"
                variant="outlined"
                value={admisao}
                onChange={dataAdmisao}
                required
                placeholder="DD/MM/AAAA"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon style={{ color: "#06a0ec" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                className={styles.setor}
                label="Setor"
                variant="outlined"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                required
                placeholder="Setor que o funcionario trabalha"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
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

          <section className={styles.salarioButton}>
            <div>
              <TextField
                className={styles.salario}
                label="Salário"
                variant="outlined"
                value={salario}
                onChange={(e) => {
                  const value = e.target.value;
                  const formattedValue = value.replace(/[^0-9,.]/g, "");
                  setSalario(formattedValue);
                }}
                required
                placeholder="Digite o salário (ex: 1000,50)"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon style={{ color: "#06a0ec" }} />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </div>
            <div className={styles.button}>
              <Button type="submit" variant="contained" color="primary">
                Cadastrar
              </Button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}

export default CadastrarFuncionario;
