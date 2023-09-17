import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp