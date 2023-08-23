//api.js
// Verifica se já existe algo no localStorage para evitar sobrescrever as receitas padrão
const localStorageRecipes = JSON.parse(localStorage.getItem("recipes"));
console.log(localStorageRecipes)

// Inicializa a matriz recipes com as receitas padrão se não houver nada no localStorage
const recipesPadrao = [
    {
        id: 1,
        title: "Bolo de Chocolate",
        ingredients: "Farinha, açúcar, cacau, ovos, leite",
        preparation: "Misture tudo, asse por 30 minutos",
        url: "https://www.oetker.com.br/Recipe/Recipes/oetker.com.br/br-pt/baking/image-thumb__236243__RecipeDetailsLightBox/bolo-de-aniversario-de-chocolate.jpg"
      },
      {
        id: 2,
        title: "Frango Assado com Ervas",
        ingredients: "Peitos de frango, alecrim, tomilho, alho, azeite, sal, pimenta",
        preparation: "Tempere o frango com ervas, alho, azeite, asse até dourar",
        url: "https://redefoodservice.com.br/wp-content/uploads/2022/11/Frango-Assado-com-Ervas-do-Churrasqueadas-1.jpg"
      },
      {
        id: 3,
        title: "Massa de Pizza Caseira",
        ingredients: "Farinha, água, fermento, sal, azeite",
        preparation: "Misture os ingredientes, amasse, deixe crescer, abra a massa, adicione coberturas, asse",
        url: "https://img.cybercook.com.br/receitas/527/massa-de-pizza-7.jpeg"
      },
      {
        id: 4,
        title: "Risoto de Cogumelos",
        ingredients: "Arroz arbóreo, cogumelos, cebola, caldo de legumes, vinho branco, queijo parmesão",
        preparation: "Refogue cebola, cogumelos, adicione arroz, vinho, caldo aos poucos, finalize com queijo",
        url: "https://www.receitasedicasdochef.com.br/wp-content/uploads/2015/06/Risoto-de-Cogumelos-com-Queijo-Parmesao.jpg"
      },
      {
        id: 5,
        title: "Tacos de Carne",
        ingredients: "Carne moída, pimentão, cebola, cominho, coentro, tortilhas, queijo, alface",
        preparation: "Refogue carne, pimentão, cebola com temperos, recheie tortilhas, adicione queijo e alface",
        url: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/11/Tacos-de-carne-moida-freepik.jpg"
      },
      {
        id: 6,
        title: "Smoothie de Frutas",
        ingredients: "Banana, morango, iogurte, mel, suco de laranja",
        preparation: "Misture as frutas, iogurte, mel e suco, bata até ficar cremoso",
        url: "https://claudia.abril.com.br/wp-content/uploads/2020/02/thinkstockphotos-839497302-1.jpg"
      },
      {
        id: 7,
        title: "Penne ao Pesto",
        ingredients: "Penne, manjericão, azeite, pinhões, queijo parmesão, alho",
        preparation: "Cozinhe o penne, bata manjericão, azeite, pinhões, queijo e alho, misture com a massa",
        url: "https://jantinhadehoje.files.wordpress.com/2013/08/20130807-081507.jpg" 
      },
      {
        id: 8,
        title: "Salmão Grelhado",
        ingredients: "Filé de salmão, limão, azeite, dill, sal, pimenta",
        preparation: "Tempere o salmão com limão, azeite, dill, grelhe até ficar pronto",
        url: "https://www.dicasdemulher.com.br/wp-content/uploads/2020/01/salmao-grelhado-0.png"
      },
      {
        id: 9,
        title: "Mousse de Maracujá",
        ingredients: "Polpa de maracujá, leite condensado, creme de leite",
        preparation: "Bata a polpa com leite condensado, adicione creme de leite, refrigere",
        url: "https://static.itdg.com.br/images/1200-630/e1ceeccaac52a138e4ab2f9a125b533b/mousse-de-maracuja.jpg"
      },
      {
        id: 10,
        title: "Salada de Quinoa",
        ingredients: "Quinoa, pepino, tomate, cebola roxa, azeitonas, hortelã, limão",
        preparation: "Cozinhe a quinoa, misture com os vegetais, azeitonas, hortelã, tempere com limão",
        url: "https://marolacomcarambola.com.br/wp-content/uploads/2019/01/Receita-de-salada-de-quinoa-leve-pratica-11.jpg"
      },
      {
        id: 11,
        title: "Omelete de Queijo",
        ingredients: "Ovos, queijo cheddar, cebola, tomate, orégano",
        preparation: "Bata os ovos, misture com queijo, cebola, tomate e orégano, cozinhe em frigideira",
        url: "https://img.cybercook.com.br/receitas/105/omelete-classica-1.jpeg"
      },
      {
        id: 12,
        title: "Sopa de Legumes",
        ingredients: "Batata, cenoura, abobrinha, cebola, alho, caldo de legumes",
        preparation: "Cozinhe os legumes, refogue cebola e alho, adicione caldo, cozinhe até os legumes amolecerem",
        url: "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/855ad695b82075e4031b92cedc43a12d.jpg"
      },
      {
        id: 13,
        title: "Panquecas de Banana",
        ingredients: "Banana, ovos, aveia, canela, mel",
        preparation: "Bata banana, ovos e aveia, adicione canela, frite como panquecas, sirva com mel",
        url: "https://static.itdg.com.br/images/1200-630/53e47bf452300d58b8e741ae370eae4f/365870-original.jpg"
      },
      {
        id: 14,
        title: "Espaguete à Bolonhesa",
        ingredients: "Espaguete, carne moída, cebola, alho, molho de tomate, manjericão",
        preparation: "Refogue cebola, alho, carne moída, adicione molho de tomate, manjericão, sirva com espaguete",
        url: "https://img.cybercook.com.br/receitas/610/espaguete-com-molho-a-bolonhesa-ou-ragu-bolognese-1.jpeg"
      },
      {
        id: 15,
        title: "Sanduíche de Frango Grelhado",
        ingredients: "Peito de frango, pão de hambúrguer, alface, tomate, maionese",
        preparation: "Grelhe o frango, monte o sanduíche com alface, tomate e maionese",
        url: "https://www.hojetemfrango.com.br/wp-content/uploads/2019/01/shutterstock_173394518.jpg"
      },
      {
        id: 16,
        title: "Bolo de Cenoura",
        ingredients: "Cenoura, açúcar, óleo, ovos, farinha, fermento, chocolate em pó",
        preparation: "Bata cenoura, açúcar, óleo, ovos, misture com farinha e fermento, asse, cubra com chocolate",
        url: "https://assets.unileversolutions.com/recipes-v2/35824.jpg"
      },
      {
        id: 17,
        title: "Guacamole",
        ingredients: "Abacate, tomate, cebola, coentro, limão, sal",
        preparation: "Amasse o abacate, misture com tomate, cebola, coentro, tempere com limão e sal",
        url: "https://vocegastro.com.br/app/uploads/2021/06/guacamole-simples.jpg.webp"
      },
      {
        id: 18,
        title: "Lasanha Vegetariana",
        ingredients: "Massa de lasanha, abobrinha, berinjela, espinafre, queijo ricota, molho de tomate",
        preparation: "Monte camadas de massa, vegetais, queijo ricota e molho, asse até dourar",
        url: "https://www.dicasdemulher.com.br/wp-content/uploads/2021/07/lasanha-vegetariana-01.png"
      }
  ];
  
  const recipes = localStorageRecipes ? [...recipesPadrao,...localStorageRecipes] : [...recipesPadrao]
  

  export function getRecipes() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(recipes);
        }, 100); // Simulando um atraso de 1 segundo para a chamada da API
    });
}

export function addRecipe(newRecipe) {
    // Verifica se o ID da nova receita já existe em recipes
    const existingRecipe = recipes.find((recipe) => recipe.id === newRecipe.id);

    if (!existingRecipe) {
        // Gere um novo ID para a nova receita (um número único maior que os IDs existentes)
        const newId = Math.max(...recipes.map((recipe) => recipe.id)) + 1;
        newRecipe.id = newId;

        // Adicione a nova receita à matriz recipes
        recipes.push(newRecipe);

        // Atualize o localStorage com as receitas atualizadas
        localStorage.setItem("recipes", JSON.stringify(recipes));

        return newRecipe; // Retorna a nova receita com o ID atualizado
    }

    return null; // Retorna null se a receita com o mesmo ID já existir
}
  
