import { push, ref, set} from 'firebase/database';
import { database } from '../config/configuraFirebase';
import { UserType } from '../types/userTypes';

export function criarUsuario(user: UserType) {
  const usersRef = ref(database, "users");
  const newUserRef = push(usersRef); 

  set(newUserRef, {
    id: newUserRef.key,
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
