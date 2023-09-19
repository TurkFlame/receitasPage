// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import DarkVariantExample from "./carousel";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";
import "./App.css";
import Header from "./header";
import { Authorization } from "./Firebase/userAuth";
import { useAuth, initialState } from "./Firebase/AuthContext";

function App() {
  const { state } = useAuth();
  const { isLogged } = state || initialState;
  console.log(isLogged)
  
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem("recipes")) || []);

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
            {isLogged ? (
              <>
                <Header />
                <RecipeList recipes={recipes} />
                <DarkVariantExample />
              </>
            ) : (
              <Redirect to="/login" />
            )}
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
