import { ref, set} from 'firebase/database';
import { database } from '../config/configuraFirebase';
import { UserType } from '../types/userTypes';

export function criarUsuario(user:UserType) {
    const response = ref(database, "users/" + user.id)
    set(response,{
        id: user.id,
        name: user.name,
        email: user.email,
    })
}