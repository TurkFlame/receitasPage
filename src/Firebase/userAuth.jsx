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
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "./authFireBase";
import { useAuth, initialState } from './AuthContext';

export const Authorization = () => {
  // Usando o contexto de autenticação
  const context = useAuth();
  const { state, dispatch } = useAuth();

  // Define o ID do corpo do documento HTML
  document.body.id = "bodyLogin";

  // Estados para gerenciar dados do formulário
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Estado para armazenar dados dos usuários
  const [users, setUsers] = useState([]);
  const [isRegistering, setIsRegistering] = useState(true);

  // Conexão com o Firestore
  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  // Manipulador de autenticação
  const HandleAuthentication = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (isRegistering) {
      // Registro de usuário
      const userExistsQuery = query(
        userCollectionRef,
        where("email", "==", email)
      );
      const userExistsSnapshot = await getDocs(userExistsQuery);

      if (!userExistsSnapshot.empty) {
        alert("Este email já está registrado.");
        return;
      }

      await addDoc(userCollectionRef, {
        name,
        email,
        password,
      });

      alert("Usuário registrado com sucesso!");
    } else {
      // Login de usuário
      const userQuery = query(
        userCollectionRef,
        where("email", "==", email),
        where("password", "==", password)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        alert("Credenciais inválidas. Verifique seu email e senha.");
      } else {
        dispatch({ type: 'LOGIN' });
        alert("Login bem-sucedido!");
        window.location.href = window.location.origin;
      }
    }

    // Limpa os campos do formulário após a ação
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  // Funções para edição, atualização e exclusão de usuários
  const startEditingUser = (user) => {
    setEditingUser(user.id);
    setEditFormData({
      name: user.name,
      email: user.email,
    });
  };

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, {
      name: editFormData.name,
      email: editFormData.email,
    });

    setEditingUser(null);
    setEditFormData({
      name: "",
      email: "",
    });

    getUsers();
  };

  const cancelEditUser = () => {
    setEditingUser(null);
    setEditFormData({
      name: "",
      email: "",
    });
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);

    if (editingUser === id) {
      setEditingUser(null);
      setEditFormData({
        name: "",
        email: "",
      });
    }

    getUsers();
  };

  // Função para buscar dados dos usuários no Firestore
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

  // Carrega dados dos usuários quando o componente é montado
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <form className="formLogin">
        <h2>{isRegistering ? "Registrar" : "Login"}</h2>
        <input className="inputLogin"
          type="text"
          placeholder="Nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        ></input>
        <input className="inputLogin"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        ></input>
        <input className="inputLogin"
          type="password"
          placeholder="Senha"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        ></input>
        <button onClick={HandleAuthentication}>
          {isRegistering ? "Registrar" : "Login"}
        </button>
        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering
            ? "Já tem uma conta? Faça login aqui."
            : "Não tem uma conta? Registre-se aqui."}
        </p>
        <ul className="userForm">
          <ul>
            {users.map((userData) => (
              <div key={userData.id}>
                {editingUser === userData.id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Nome"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, email: e.target.value })
                      }
                    />
                    <button onClick={() => updateUser(userData.id)}>Salvar</button>
                    <button onClick={() => cancelEditUser()}>Cancelar</button>
                  </div>
                ) : (
                  <div>
                    <li>{userData.name}</li>
                    <li>{userData.email}</li>
                    <button onClick={() => deleteUser(userData.id)}>Deletar</button>
                    <button onClick={() => startEditingUser(userData)}>Editar</button>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </ul>
      </form>
    </div>
  );
};

export default Authorization;
