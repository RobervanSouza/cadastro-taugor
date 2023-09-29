import { useEffect, useState } from "react";
import { ref, get, child, remove } from "firebase/database";
import {  database } from "../../config/configuraFirebase";
import { UserType } from "../../types/userTypes";
import UserCard from "../../components/cardHome/card";
import Reload from "../../assets/reload.gif"

import styles from "./styles.module.scss";
import Header from "../../components/header/header";

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<UserType[]>([]);
  const[isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
useEffect(() => {
  const usuariosRef = ref(database, "users");

  get(child(usuariosRef, "/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const usuariosArray: UserType[] = [];
        snapshot.forEach((childSnapshot) => {
          const usuario = childSnapshot.val() as UserType;
          usuariosArray.push(usuario);
        });
        setUsuarios(usuariosArray);
        setIsLoaded(true); // Defina como verdadeiro quando os dados forem carregados com sucesso
      }
    })
    .finally(() => {
      setIsLoading(false); // Defina como falso após o carregamento, seja bem-sucedido ou não
    });
}, []);

  const onUpdateUser = (updatedUser: UserType) => {
    setUsuarios((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUserFromFirebase = async (userId: string) => {
    try {
      // Crie uma referência para o usuário que você deseja excluir no Firebase
      const usuarioRef = ref(database, `users/${userId}`);

      
      await remove(usuarioRef);

      
      setUsuarios((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  const reloadData = () => {
    setIsLoading(true);

    // Recarregue os dados aqui, por exemplo, refaça a consulta ao Firebase

    // Após a conclusão do carregamento, defina isLoading como falso
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
        {isLoaded && <button onClick={reloadData}>Recarregar</button>}
      </div>
    </>
  );
}

export default ListarUsuarios;
