//authFireBase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC65mdyJxbxLI4gG5YykwabUVqzjAl1lw",
  authDomain: "projetinho-37521.firebaseapp.com",
  projectId: "projetinho-37521",
  storageBucket: "projetinho-37521.appspot.com",
  messagingSenderId: "975353261367",
  appId: "1:975353261367:web:990ce2cce3cb8822af7eb2",
  measurementId: "G-0EEL2CN4K9"
};

// Inicialize o app Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Exporte o hook useAuth
export const useAuth = () => {
  const auth = getAuth(firebaseApp);
  return auth;
};