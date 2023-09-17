//App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Authorization } from "./Firebase/userAuth";
import { useAuth } from "./Firebase/authFireBase"; // Importe o hook useAuth
import AuthenticatedApp from "./AuthenticatedApp"; // Importe o componente AuthenticatedApp

function App() {
  const auth = useAuth(); // Use o hook useAuth para acessar a autenticação Firebase

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* Se o usuário não estiver autenticado, exiba a tela de login */}
          {!auth.currentUser ? (
            <Authorization />
          ) : (
            // Se o usuário estiver autenticado, redirecione para a página de receitas
            <Redirect to="/recipeList" />
          )}
        </Route>
        {/* Rota para a aplicação autenticada */}
        <Route path="/recipeList">
          <AuthenticatedApp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
