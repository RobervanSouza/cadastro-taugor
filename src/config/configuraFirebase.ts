
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import API_KEY from "../../"



const firebaseConfig = {
  apiKey: "AIzaSyBhs9PQnte26EUwf5kwSDKMoPL3QzwPv0U",
  authDomain: "cadastro-taugor.firebaseapp.com",
  projectId: "cadastro-taugor",
  storageBucket: "cadastro-taugor.appspot.com",
  messagingSenderId: "308655623057",
  appId: "1:308655623057:web:74460aff19b4c43da12830",
  measurementId: "G-3HFNMRRRHE",
};
const app = initializeApp(firebaseConfig);

  const database = getDatabase(app)

const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence)

// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     // A persistência local foi configurada com sucesso
//   })
//   .catch((error) => {
//     // Lidar com erros de configuração de persistência
//     console.error("Erro na configuração de persistência local:", error);
//   });

export { app, database, auth}