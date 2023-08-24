//RecipeDetail
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipes } from "./api";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipeDetails() {
      const fetchedRecipes = await getRecipes();
      const selectedRecipe = fetchedRecipes.find((r) => r.id === parseInt(id));
      setRecipe(selectedRecipe);
    }
    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail">
      <h2>{recipe.title}</h2>
      <h3>Ingredientes:</h3>
      <p>{recipe.ingredients}</p>
      <h3>Modo de Preparo:</h3>
      <p>{recipe.preparation}</p>
    </div>
  );
}

export default RecipeDetail;