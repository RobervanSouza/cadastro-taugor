// ListarUsuarios.js

import React, { useEffect, useState } from 'react';
import { ref, get, child } from 'firebase/database';
import { auth, database } from '../../config/configuraFirebase'
import { UserType } from '../../types/userTypes';
import UserCard from './card';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import styles from "./styles.module.scss";



function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<UserType[]>([]);

  useEffect(() => {
    const usuariosRef = ref(database, 'users');

    get(child(usuariosRef, '/')).then((snapshot) => {
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

  const navigate = useNavigate();
  function sair() {
    signOut(auth);
    navigate("/");
  }

  return (
    <div className={styles.geral}>
      <Link to="/cadastrafuncionario">
        {" "}
        {/* Use o Link para navegar */}
        <button>Cadastrar Funcionário</button>
      </Link>
      <button onClick={sair}>Sair</button>
      <h1>Lista de Usuários</h1>
      <div className={styles.userList}>
        {usuarios.map((usuario) => (
          <UserCard key={usuario.id} usuario={usuario} />
        ))}
      </div>
    </div>
  );
}

export default ListarUsuarios;
