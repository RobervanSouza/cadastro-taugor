
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from "../env";





 

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain:  AUTH_DOMAIN ,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
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