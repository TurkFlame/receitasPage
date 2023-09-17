import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "./authFireBase";

export const Authorization = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [isRegistering, setIsRegistering] = useState(true); // Estado para controlar se o usuário está registrando ou fazendo login

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  async function handleAuthentication() {
    if (isRegistering) {
      // Registro de usuário
      // Verifica se o email já existe no banco de dados
      const userExistsQuery = query(
        userCollectionRef,
        where("email", "==", email)
      );
      const userExistsSnapshot = await getDocs(userExistsQuery);

      if (!userExistsSnapshot.empty) {
        alert("Este email já está registrado.");
        return;
      }

      // Cria o novo usuário com senha
      await addDoc(userCollectionRef, {
        name,
        email,
        password,
      });

      alert("Usuário registrado com sucesso!");
    } else {
      // Login de usuário
      // Verifica se o email e a senha correspondem a uma conta existente
      const userQuery = query(
        userCollectionRef,
        where("email", "==", email),
        where("password", "==", password)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        alert("Credenciais inválidas. Verifique seu email e senha.");
      } else {
        alert("Login bem-sucedido!");
        // Você pode redirecionar o usuário para outra página após o login
      }
    }

    // Limpa os campos após o registro ou login
    setName("");
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(userCollectionRef);
        const usersData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    getUsers();
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  return (
    <div>
      <h2>{isRegistering ? "Registrar" : "Login"}</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleAuthentication}>
        {isRegistering ? "Registrar" : "Login"}
      </button>
      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? "Já tem uma conta? Faça login aqui."
          : "Não tem uma conta? Registre-se aqui."}
      </p>
      <ul>
        {users.map((user) => (
          <div key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <button onClick={() => deleteUser(user.id)}>Deletar</button>
          </div>
        ))}
      </ul>
    </div>
  );
};
