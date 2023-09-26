import { useEffect, useState } from "react";
import { ref, get, child, remove } from "firebase/database";
import {  database } from "../../config/configuraFirebase";
import { UserType } from "../../types/userTypes";
import UserCard from "../../components/cardHome/card";


import styles from "./styles.module.scss";
import Header from "../../components/header/header";

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<UserType[]>([]);

  useEffect(() => {
    const usuariosRef = ref(database, "users");

    get(child(usuariosRef, "/")).then((snapshot) => {
      if (snapshot.exists()) {
        const usuariosArray: UserType[] = [];
        snapshot.forEach((childSnapshot) => {
          const usuario = childSnapshot.val() as UserType;
          usuariosArray.push(usuario);
        });
        setUsuarios(usuariosArray);
      }
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

      // Use a função "remove" do Firebase para excluir o nó do usuário
      await remove(usuarioRef);

      // Atualize a lista de usuários após a exclusão
      setUsuarios((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className={styles.geral}>
      
        <h1>Lista de funcionarios</h1>
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
      </div>
    </>
  );
}

export default ListarUsuarios;
