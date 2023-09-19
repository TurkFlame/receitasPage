import React from 'react';
import { useAuth } from './Firebase/AuthContext';

export const LogOut = () => {
  console.log("Acionado LogOut")
  
  const { state, dispatch } = useAuth(); // Corrigido: state estava faltando aqui
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <form>
        <button onClick={handleLogout}>
          Logout
        </button>
    </form>
  );
}
