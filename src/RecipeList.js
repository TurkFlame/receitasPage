import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "./api";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const fetchedRecipes = await getRecipes();
      setRecipes(fetchedRecipes);
    }
    fetchRecipes();
  }, []);

  return (
    <div className="recipeList" justify="end">
      <h2><strong>Lista</strong> de Receitas</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} style={{ color: 'white' }}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;