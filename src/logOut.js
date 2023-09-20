import React from 'react';
import { useAuth } from './Firebase/AuthContext';

export const LogOut = () => {
  console.log("Acionado LogOut")
  
  const { state, dispatch } = useAuth(); // Corrigido: state estava faltando aqui
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.href = "/login"
  };

  return (
    <form>
        <i class="fa-solid fa-right-from-bracket" onClick={handleLogout}></i>
    </form>
  );
}
