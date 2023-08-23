//AddRecipe.js
import React, { useState } from "react";
import { addRecipe } from "./api"; // Importe a função addRecipe da API

function AddRecipe({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crie um objeto que representa a nova receita
    const newRecipe = {
      title,
      ingredients,
      preparation,
      url
    };

    // Chame a função addRecipe da API para adicionar a nova receita à matriz recipes
    await addRecipe(newRecipe);

    // Chame a função `onAddRecipe` passada como prop para adicionar a nova receita localmente no estado do componente
    onAddRecipe(newRecipe);

    // Limpe os campos do formulário após a adição da receita
    setTitle("");
    setIngredients("");
    setPreparation("");
    setUrl("");
  };

  return (
    <div>
      <h2>Adicionar Nova Receita</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Ingredientes:</label>
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <label>Modo de Preparo:</label>
        <textarea value={preparation} onChange={(e) => setPreparation(e.target.value)} />
        <label>URL da Imagem:</label>
        <textarea value={preparation} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Adicionar Receita</button>
      </form>
    </div>
  );
}

export default AddRecipe;