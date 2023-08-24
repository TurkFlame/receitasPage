import React, { useState } from "react";
import { addRecipe } from "./api";

function AddRecipe({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifique se algum campo está vazio
    if (!title || !ingredients || !preparation || !url) {
      alert("Por favor, preencha todos os campos."); // Exibe um alerta se algum campo estiver vazio
      return;
    }

    const newRecipe = {
      title,
      ingredients,
      preparation,
      url,
    };

    await addRecipe(newRecipe);
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
      <form
        style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "auto", width: "fit-content" }}
        className="addRecipe"
        onSubmit={handleSubmit}
      >
        <label>Título:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Ingredientes:</label>
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <label>Modo de Preparo:</label>
        <textarea value={preparation} onChange={(e) => setPreparation(e.target.value)} />
        <label>URL da Imagem:</label>
        <textarea value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Adicionar Receita</button>
      </form>
    </div>
  );
}

export default AddRecipe;
