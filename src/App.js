//App.js
import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import DarkVariantExample from "./carousel";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";
import "./App.css";
import Header from "./header";
import { Authorization} from "./Firebase/userAuth"; // Importe a variável userLogged
import isLogged from "./Firebase/userAuth";

function App() {
  console.log("Inicializou App");
  console.log(isLogged);
  // Usa o localStorage para obter as receitas ou inicialize com um array vazio
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem("recipes")) || []);

  const handleAddRecipe = (newRecipe) => {
    // Atualiza o estado de recipes com a nova receita
    setRecipes([...recipes, newRecipe]);
  };

  // Usa useEffect para salvar as receitas no localStorage sempre que recipes mudar
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLogged ? (
              <div>
                <RecipeList recipes={recipes} />
                <Header />
                <DarkVariantExample />
              </div>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/recipe/:id" component={RecipeDetail} />
          <Route path="/add">
            <Header />
            <AddRecipe onAddRecipe={handleAddRecipe} />
          </Route>
          {/* Rota de login, apenas renderizada quando o usuário não está autenticado */}
          {isLogged && (
            <Route path="/login" exact component={Authorization} />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
