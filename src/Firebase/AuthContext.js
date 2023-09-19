//AuthContext
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
      return { ...state, isLogged: true };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    isLogged: true
  });

  console.log("res redurce", state)
  console.log("res redurce", dispatch)
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  console.log('UseAuth11111111111111111111111111111')
  const context = useContext(AuthContext);
  console.log(context)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
