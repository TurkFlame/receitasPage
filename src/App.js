import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DarkVariantExample from "./carousel"; // Importe o componente DarkVariantExample
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";
import "./App.css"; // Importe o arquivo CSS aqui
import Header from "./header";

function App() {
  // Use o localStorage para obter as receitas ou inicialize com um array vazio
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem("recipes")) || []);

  // Função para adicionar uma nova receita
  const handleAddRecipe = (newRecipe) => {
    // Atualize o estado de recipes com a nova receita
    setRecipes([...recipes, newRecipe]);
  };

  // Use useEffect para salvar as receitas no localStorage sempre que recipes mudar
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  return (
    <div>
      <Router>
        <Header></Header>
      <DarkVariantExample />
        <Switch>
          <Route path="/" exact>
            {/* Passe a matriz recipes como prop para RecipeList */}
            <RecipeList recipes={recipes} />
          </Route>
          <Route path="/recipe/:id" component={RecipeDetail} />
          <Route path="/add">
            <AddRecipe onAddRecipe={handleAddRecipe} />
          </Route>
        </Switch>
      <RecipeList>

      </RecipeList>
      </Router>
    </div>
  );
}

export default App;
