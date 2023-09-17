import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0tJY5y_Xtg8UU4HYcruKY5ERR1rqCaLE",
  authDomain: "paginareceitas-389e9.firebaseapp.com",
  projectId: "paginareceitas-389e9",
  storageBucket: "paginareceitas-389e9.appspot.com",
  messagingSenderId: "102863062646",
  appId: "1:102863062646:web:c5ec31545fb6f055a64157",
  measurementId: "G-ZBQSDCC1ST"
};

// Inicialize o app Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Exporte o hook useAuth
export const useAuth = () => {
  const auth = getAuth(firebaseApp);
  return auth;
};