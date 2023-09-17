//AuthenticatedApp.js
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import DarkVariantExample from "./carousel";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";
import Header from "./header";
import { Authorization } from "./Firebase/userAuth";
import { useAuth } from "./Firebase/authFireBase"; // Importe o hook useAuth

function AuthenticatedApp() {
  const auth = useAuth(); // Use o hook useAuth para acessar a autenticação Firebase

  if (!auth.currentUser) {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Header></Header>
      <DarkVariantExample />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Authorization />
          </Route>
          <Route path="/recipeList">
            <RecipeList />
          </Route>
          <Route path="/recipe/:id" component={RecipeDetail} />
          <Route path="/add">
            <AddRecipe />
          </Route>
        </Switch>
      </Router>
      <RecipeList></RecipeList>
    </div>
  );
}

export default AuthenticatedApp;
