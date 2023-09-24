// CriarAdministrador.js

import React, { useState } from "react";
import { User, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/configuraFirebase";


function CriarAdministrador() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");



    const criarAdministrador = async () => {
      try {
        // Crie um novo administrador com os detalhes fornecidos
        await createUserWithEmailAndPassword(auth, email, password);

        // Verifique se o usuário atual não é nulo
        const user: User | null = auth.currentUser;
        if (user !== null) {
          // Atualize o perfil do administrador com o nome, se desejar
          await updateProfile(user, {
            displayName: name,
          });

          // Redirecione ou faça outras ações após a criação do administrador
        } else {
          console.error("Usuário atual é nulo");
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <h1>Criar Administrador</h1>
      <form>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={criarAdministrador}>
          Criar Administrador
        </button>
      </form>
    </div>
  );
}

export default CriarAdministrador;
