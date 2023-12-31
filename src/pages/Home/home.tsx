import { useEffect, useState } from "react";
import { ref, get, child, remove } from "firebase/database";
import { database } from "../../config/configuraFirebase";
import { UserType } from "../../types/userTypes";
import UserCard from "../../components/cardHome/card";
import Reload from "../../assets/reload.gif";

import styles from "./styles.module.scss";
import Header from "../../components/header/header";

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const usuariosRef = ref(database, "users");

    get(child(usuariosRef, "/"))
      .then((usuario) => {
        if (usuario.exists()) {
          const usuariosArray: UserType[] = [];
          usuario.forEach((childUsuario) => {
            const usuario = childUsuario.val() as UserType;
            usuariosArray.push(usuario);
          });
          setUsuarios(usuariosArray);
          setIsLoaded(true);
        }
      })

      .finally(() => {
        setIsLoading(false);
      });

  }, []);

  const onUpdateUser = (updatedUser: UserType) => {
    setUsuarios((editUsers) =>
      editUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUserFromFirebase = async (userId: string) => {
    try {
      const usuarioRef = ref(database, `users/${userId}`);
      await remove(usuarioRef);
      setUsuarios((deleteUsers) =>
        deleteUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  const reloadData = () => {
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <>
      <header>
        <Header />
      </header>

      <div className={styles.geral}>

        <h1>Lista de funcionários</h1>

        {isLoading ? (
          <img src={Reload} alt="Carregando..." />
        ) : (

          <div className={styles.userList}>
            {usuarios.map((usuario) => (
              <UserCard
                key={usuario.id}
                usuario={usuario}
                onUpdateUser={onUpdateUser}
                onDeleteUser={deleteUserFromFirebase}
              />
            ))}
          </div>
          
        )}
        {isLoaded && <span onClick={reloadData}></span>}
      </div>
    </>
  );
}

export default ListarUsuarios;
