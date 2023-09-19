import React from 'react';
import { useAuth } from './Firebase/AuthContext';

export const LogOut = () => {
  const context = useAuth();
  console.log("context logout", context)
  const { state, dispatch } = context
  console.log("state", state)
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <form className="formLogin">
      {/* ... (seu código existente) */}
      {context.isLogged && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </form>
  );
}

