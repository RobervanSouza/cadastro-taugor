
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
 //import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, } from "../env";





 

// const firebaseConfig = {
//   authDomain:  AUTH_DOMAIN ,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
  //  apiKey: API_KEY,
// };

const firebaseConfig = {
 apiKey: "AIzaSyBhs9PQnte26EUwf5kwSDKMoPL3QzwPv0U",
  authDomain: "cadastro-taugor.firebaseapp.com",
  projectId: "cadastro-taugor",
  storageBucket: "cadastro - taugor.appspot.com",
  messagingSenderId: "308655623057",
  appId: "1:308655623057:web:74460aff19b4c43da12830",
  measurementId: "G-3HFNMRRRHE",
};



// VITE_REACT_APP_API_KEY = "AIzaSyBhs9PQnte26EUwf5kwSDKMoPL3QzwPv0U";
// VITE_REACT_APP_AUTH_DOMAIN = "cadastro-taugor.firebaseapp.com";
// VITE_REACT_APP_PROJECT_ID = "cadastro-taugor";
// VITE_REACT_APP_STORAGE_BUCKET = "cadastro-taugor.appspot.com";
// VITE_REACT_APP_MESSAGING_SENDER_ID = "308655623057";
// VITE_REACT_APP_APP_ID = "1:308655623057:web:74460aff19b4c43da12830";
// VITE_REACT_APP_MEASUREMENT_ID = "G-3HFNMRRRHE";
// VITE_REACT_APP_ADMIN_EMAIL = "taugor@getnet.com";
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