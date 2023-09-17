import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DarkVariantExample from "./carousel";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";
import "./App.css";
import Header from "./header";
import { Authorization } from "./Firebase/userAuth";

function App() {
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
        <Header></Header>
        <DarkVariantExample />
        <Switch>
          <Route path="/" exact>
            <Authorization />
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
