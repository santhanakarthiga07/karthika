const recipes = [
  { id: 1, title: "Pasta", time: 25, difficulty: "easy", description: "Creamy pasta.", category: "pasta" },
  { id: 2, title: "Pizza", time: 60, difficulty: "medium", description: "Cheese pizza.", category: "pizza" },
  { id: 3, title: "Salad", time: 15, difficulty: "easy", description: "Healthy salad.", category: "salad" },
  { id: 4, title: "Butter Chicken", time: 75, difficulty: "hard", description: "Indian curry.", category: "curry" },
  { id: 5, title: "Noodles", time: 30, difficulty: "medium", description: "Tasty noodles.", category: "asian" },
  { id: 6, title: "Cake", time: 45, difficulty: "medium", description: "Chocolate cake.", category: "dessert" },
  { id: 7, title: "Biryani", time: 90, difficulty: "hard", description: "Spicy rice.", category: "indian" },
  { id: 8, title: "Sandwich", time: 10, difficulty: "easy", description: "Quick snack.", category: "snack" }
];

const container = document.querySelector("#recipe-container");

const createCard = (recipe) => {
  return `
    <div class="recipe-card">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

const renderRecipes = (recipes) => {
  container.innerHTML = recipes.map(createCard).join("");
};

renderRecipes(recipes);