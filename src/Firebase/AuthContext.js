import React, { createContext, useReducer, useContext } from 'react';

// Estado inicial para o contexto de autenticação
const initialState = {
  isLogged: false // Inicialmente, o usuário não está autenticado
};

// Criação do contexto de autenticação
const AuthContext = createContext(initialState);

// Redutor para atualizar o estado de autenticação
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      // Quando a ação 'LOGIN' é despachada, definimos isLogged como true
      return { ...state, isLogged: true };
    case 'LOGOUT':
      // Quando a ação 'LOGOUT' é despachada, definimos isLogged como false
      return { ...state, isLogged: false }; // Correção: era true, agora é false
    default:
      return state;
  }
}

// Componente 'AuthProvider' que fornece o contexto de autenticação
function AuthProvider({ children }) {
  console.log("AuthProvider acionado")
  
  // UseReducer é usado para gerenciar o estado de autenticação com o redutor 'authReducer'
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
      //Renderiza os componentes filhos com o contexto de autenticação
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

//acessar o contexto de autenticação
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth, initialState };
