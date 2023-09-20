import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DarkVariantExample from "./carousel";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";
import Header from "./header";
import { Authorization } from "./Firebase/userAuth";

function App() {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")) || []
  );

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Header />
            <RecipeList recipes={recipes} />
            <DarkVariantExample />
          </Route>
          <Route path="/recipe/:id" component={RecipeDetail} />
          <Route path="/add">
            <Header />
            <AddRecipe onAddRecipe={handleAddRecipe} />
          </Route>
          <Route path="/login" exact>
            <Authorization />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
