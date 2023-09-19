import React, { useState } from "react";
import { addRecipe } from "./api";

function cleanHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function AddRecipe({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState("");
  const [url, setUrl] = useState("");
  const [randomRecipe, setRandomRecipe] = useState(null);

  const fetchRandomRecipe = async () => {
    const url =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=1";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key":
          "4fe873d2d9msh0c993ead54276b3p1b7d22jsn6b500101702d",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const recipe = data.recipes[0];

      // Limpa o HTML das instruções
      const cleanedInstructions = cleanHtml(recipe.instructions);

      // Atualize o estado com os campos corretos
      setRandomRecipe({
        title: recipe.title,
        ingredients: recipe.extendedIngredients.map(
          (ingredient) => ingredient.original
        ),
        preparation: cleanedInstructions,
        url: recipe.image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se algum campo está vazio
    if (!title || !ingredients.length || !preparation || !url) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newRecipe = {
      title,
      ingredients,
      preparation,
      url,
    };

    // Adiciona a nova receita à lista
    await addRecipe(newRecipe);
    onAddRecipe(newRecipe);

    // Limpa os campos do formulário após a adição da receita
    setTitle("");
    setIngredients([]);
    setPreparation("");
    setUrl("");
  };

  return (
    <div id="add-recipe-container">
      <h2>Adicionar Nova Receita</h2>
      {randomRecipe && (
        <div className="random-recipe">
          <h2>Receita Aleatória</h2>
          <p><strong>Título:</strong> {randomRecipe.title}</p>
          <p>Ingredientes: {randomRecipe.ingredients.join(", ")}</p>
          <h4>Modo de Preparo:</h4>
          <p>{randomRecipe.preparation}</p>
          <div>
            <img
              src={randomRecipe.url}
              alt="Imagem da Receita"
              style={{ height: "300px" }}
              className="recipe-image"
            />
          </div>
        </div>
      )}
      <div>
        <form
          onSubmit={handleSubmit}
          className="form-add-recipes"
        >
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Ingredientes:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <label>Modo de Preparo:</label>
          <textarea
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
          />
          <label>URL da Imagem:</label>
          <textarea
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <br></br>
          <button className="buttonFormated" type="submit">+ Adicionar Receita</button>
        </form>
      </div>
      <br></br>
      <button className="buttonFormated" onClick={fetchRandomRecipe}>Gerar Receita Aleatória</button>
    </div>
  );
}

export default AddRecipe;
