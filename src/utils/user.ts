import { push, ref, set} from 'firebase/database';
import { database } from '../config/configuraFirebase';
import { UserType } from '../types/userTypes';

export function criarUsuario(user: UserType) {
  const usersRef = ref(database, "users");
  const newUserRef = push(usersRef); // O Firebase gera automaticamente uma chave única

  set(newUserRef, {
    id: newUserRef.key, // Use a chave gerada pelo Firebase como ID
    name: user.name,
    sexo: user.sexo,
    endereco: user.endereco,
    telefone: user.telefone,
    foto: user.foto,
    nascimento: user.nascimento,
    cargo: user.cargo,
    setor: user.setor,
    salario: user.salario,
    admisao: user.admisao,
    status: user.status,
  });
}
