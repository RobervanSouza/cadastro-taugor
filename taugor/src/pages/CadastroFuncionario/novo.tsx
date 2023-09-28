import { ChangeEvent, FormEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { criarUsuario } from "../../utils/user";
import { UserType } from "../../types/userTypes";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/header";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

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

  function notificacao() {
    toast.success("Cadastrado com sucesso!");
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Realize as validações dos campos (como mencionado em respostas anteriores)

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
      setStatus("ativo");
    };

    const usuario: UserType = {
      id: "", // Você pode definir um ID aqui, se necessário
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
    // Redirecionar para a página desejada após o cadastro
  };

  const dataAdmisao = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let formattedValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    if (formattedValue.length > 8) {
      formattedValue = formattedValue.slice(0, 8);
    }

    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }
    if (formattedValue.length > 5) {
      formattedValue =
        formattedValue.slice(0, 5) + "/" + formattedValue.slice(5);
    }

    setAdmisao(formattedValue);
  };
  const dataNascimento = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let formattedValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Limita o tamanho máximo em 8 caracteres
    if (formattedValue.length > 8) {
      formattedValue = formattedValue.slice(0, 8);
    }

    // Adiciona as barras nos locais corretos
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }
    if (formattedValue.length > 5) {
      formattedValue =
        formattedValue.slice(0, 5) + "/" + formattedValue.slice(5);
    }

    setNascimento(formattedValue);
  };

  const [imagemPlaceholder, setImagemPlaceholder] = useState<string | null>(
    null
  );

  const [escolherArquivo, setEscolherArquivo] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoto(e.target.value);
    setImagemPlaceholder(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.startsWith("http") || value.startsWith("https")) {
      // Se o valor começa com 'http' ou 'https', assumimos que é um link de imagem
      setImagemPlaceholder(value);
    } else {
      // Caso contrário, assume-se que é um arquivo
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataURL = event.target && event.target.result;
          if (dataURL) {
            setImagemPlaceholder(dataURL as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className={styles.geral}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
              />
              <TextField
                label="Sexo"
                variant="outlined"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
                placeholder="Sexo"
                fullWidth
              />
            </div>
            {/* <div className={styles.foto}>
              <div className={styles.iconeFoto}>
                <TextField
                  label="Foto"
                  variant="outlined"
                  value={foto}
                  onChange={handleChange}
                  required
                  placeholder="link da Foto"
                  fullWidth
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
                          <AccountBoxIcon className={styles.icon} />
                        )}
                      </div>
                    ),
                  }}
                />
              </div>
              <div className={styles.descFoto}>link da foto</div>
            </div> */}

            <div className={styles.foto}>
              <div className={styles.iconeFoto}>
                <TextField
                  label="Foto"
                  variant="outlined"
                  value={foto}
                  onChange={handleChange}
                  required
                  placeholder=""
                  fullWidth
                  disabled
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
                          <AccountBoxIcon className={styles.icon} />
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
                    className={styles.fileInput}
                    onChange={handleFileChange}
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={escolherArquivo}
                    onChange={() => setEscolherArquivo(!escolherArquivo)}
                  />
                  Escolher link
                </label>
              </div>
            </div>
          </section>

          <TextField
            label="Endereço"
            variant="outlined"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            placeholder="Rua ..."
          />

          <TextField
            label="Telefone"
            variant="outlined"
            type="text"
            value={telefone}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/[^\d\s-]/g, "");
              setTelefone(numericValue);
            }}
            required
            placeholder="99 9999-2333"
          />

          <TextField
            label="Data de Nascimento"
            variant="outlined"
            type="text"
            value={nascimento}
            onChange={dataNascimento}
            required
            placeholder="DD/MM/AAAA"
          />

          <TextField
            label="Cargo"
            variant="outlined"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
            placeholder="Digite o cargo do funcionário"
          />

          <TextField
            label="Setor"
            variant="outlined"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            required
            placeholder="Setor que o funcionario trabalha"
          />

          <TextField
            label="Salário"
            variant="outlined"
            value={salario}
            onChange={(e) => {
              const value = e.target.value;
              const formattedValue = value.replace(/[^0-9,.]/g, ""); // Remove caracteres não numéricos, exceto pontos e vírgulas
              setSalario(formattedValue);
            }}
            required
            placeholder="Digite o salário (ex: 1000,50)"
          />

          <TextField
            label="Data de Admissão"
            variant="outlined"
            value={admisao}
            onChange={dataAdmisao}
            required
            placeholder="DD/MM/AAAA"
          />

          <Button type="submit" variant="contained" color="primary">
            Cadastrar
          </Button>
        </form>
      </div>
    </>
  );
}


