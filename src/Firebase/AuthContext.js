import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  isLogged: false
};

const AuthContext = createContext(initialState);

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLogged: true };
    case 'LOGOUT':
      return { ...state, isLogged: false }; // Correção: era true, agora é false
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  console.log("AuthProvider acionado")
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth, initialState }; // Adicione 'initialState' para exportação

