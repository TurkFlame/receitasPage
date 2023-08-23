import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { getRecipes } from "./api"; // Importe a função getRecipes
import "./App.css"; // Importe o arquivo CSS do Bootstrap aqui

function App() {
  const [recipes, setRecipes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchRecipes() {
      const fetchedRecipes = await getRecipes();
      setRecipes(fetchedRecipes);
    }
    fetchRecipes();
  }, []);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const adjustIndex = (index) => {
    if (index < 0) {
      // Se o índice for menor que 0, volte para o último item
      return recipes.length - 1;
    } else if (index >= recipes.length) {
      // Se o índice for maior ou igual ao comprimento das receitas, volte para o primeiro item
      return 0;
    }
    return index; // Caso contrário, mantenha o índice inalterado
  };

  const adjustedIndex = adjustIndex(activeIndex);

  return (
    <div className="carrouselElements" style={{'display': 'flex','align-items': 'center', 'margin':'auto', 'width':'fit-content'}}>
      <h2><strong>Carrossel</strong> de Receitas</h2>
      <Carousel
        activeIndex={adjustedIndex}
        onSelect={handleSelect}
        indicators={false}
      >
        {recipes.map((recipe, index) => (
          <Carousel.Item key={recipe.id}>
            <div className="carousel-container">
              <div className="preview-left">
                <img
                  src={recipes[adjustIndex(index - 1)].url}
                  alt={recipes[adjustIndex(index - 1)].title}
                  className="d-block smaller-image"
                />
              </div>
              <img
                className="d-block larger-image"
                src={recipe.url} // Substitua pelo caminho real da imagem
                alt={recipe.title}
                width="1000px"
                height="600px"
              />
              <div className="preview-right">
                <img
                  src={recipes[adjustIndex(index + 1)].url}
                  alt={recipes[adjustIndex(index + 1)].title}
                  className="d-block smaller-image"
                />
              </div>
            </div>
            <Carousel.Caption>
              <h3>{recipe.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
