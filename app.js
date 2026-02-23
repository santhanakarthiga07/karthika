const RecipeApp = (() => {
  'use strict';

  // ================= DATA =================
  const recipes = [
    {
      id: 1,
      title: "Spaghetti Pasta",
      difficulty: "easy",
      time: 25,
      description: "Classic Italian pasta with tomato sauce.",
      ingredients: ["spaghetti", "tomato sauce", "garlic", "olive oil"],
      steps: ["Boil water", "Cook spaghetti", "Prepare sauce", "Mix together"]
    },
    {
      id: 2,
      title: "Vegetable Fried Rice",
      difficulty: "easy",
      time: 20,
      description: "Quick and tasty vegetable fried rice.",
      ingredients: ["rice", "carrot", "beans", "soy sauce", "egg"],
      steps: ["Heat oil", "Cook vegetables", "Add rice", "Add soy sauce"]
    },
    {
      id: 3,
      title: "Chocolate Cake",
      difficulty: "medium",
      time: 60,
      description: "Soft and rich chocolate cake.",
      ingredients: ["flour", "cocoa powder", "sugar", "eggs", "butter"],
      steps: ["Mix ingredients", "Pour into pan", "Bake", "Cool and serve"]
    },
    {
      id: 4,
      title: "Chicken Curry",
      difficulty: "medium",
      time: 45,
      description: "Spicy chicken curry.",
      ingredients: ["chicken", "onion", "tomato", "spices", "oil"],
      steps: ["Cook onions", "Add spices", "Add chicken", "Simmer"]
    },
    {
      id: 5,
      title: "Grilled Sandwich",
      difficulty: "easy",
      time: 10,
      description: "Crispy grilled sandwich.",
      ingredients: ["bread", "cheese", "butter", "vegetables"],
      steps: ["Prepare filling", "Assemble sandwich", "Grill"]
    },
    {
      id: 6,
      title: "Pancakes",
      difficulty: "easy",
      time: 15,
      description: "Fluffy breakfast pancakes.",
      ingredients: ["flour", "milk", "egg", "sugar", "baking powder"],
      steps: ["Mix batter", "Heat pan", "Cook pancakes"]
    },
    {
      id: 7,
      title: "Beef Burger",
      difficulty: "hard",
      time: 35,
      description: "Juicy homemade burger.",
      ingredients: ["beef patty", "bun", "lettuce", "cheese", "sauce"],
      steps: ["Cook patty", "Toast bun", "Assemble burger"]
    },
    {
      id: 8,
      title: "Caesar Salad",
      difficulty: "easy",
      time: 15,
      description: "Fresh Caesar salad.",
      ingredients: ["lettuce", "croutons", "parmesan", "dressing"],
      steps: ["Wash lettuce", "Mix dressing", "Combine ingredients"]
    }
  ];

  // ================= STATE =================
  let currentFilter = 'all';
  let searchQuery = '';
  let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
  let debounceTimer;

  // ================= DOM =================
  const recipeContainer = document.querySelector('#recipe-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.querySelector('#search-input');
  const clearSearchBtn = document.querySelector('#clear-search');
  const recipeCountDisplay = document.querySelector('#recipe-count');

  // ================= FILTER FUNCTIONS =================

  const filterBySearch = (recipes, query) => {
    if (!query) return recipes;

    const q = query.toLowerCase();

    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(q) ||
      recipe.description.toLowerCase().includes(q) ||
      recipe.ingredients.some(i => i.toLowerCase().includes(q))
    );
  };

  const filterFavorites = (recipes) => {
    return recipes.filter(r => favorites.includes(r.id));
  };

  const applyFilter = (recipes) => {
    switch (currentFilter) {
      case 'favorites':
        return filterFavorites(recipes);
      case 'easy':
      case 'medium':
      case 'hard':
        return recipes.filter(r => r.difficulty === currentFilter);
      case 'quick':
        return recipes.filter(r => r.time <= 30);
      default:
        return recipes;
    }
  };

  // ================= RENDER =================

  const createRecipeCard = (recipe) => {
    const isFav = favorites.includes(recipe.id);

    return `
      <div class="recipe-card">
        <button class="favorite-btn" data-id="${recipe.id}">
          ${isFav ? '❤️' : '🤍'}
        </button>

        <h3>${recipe.title}</h3>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        <p><strong>Time:</strong> ${recipe.time} mins</p>
        <p>${recipe.description}</p>

        <button class="toggle-btn">Show Steps</button>

        <ul class="steps">
          ${recipe.steps.map(step => `<li>${step}</li>`).join("")}
        </ul>
      </div>
    `;
  };

  const renderRecipes = (list) => {
    recipeContainer.innerHTML = list.map(createRecipeCard).join('');
  };

  // ================= HELPERS =================

  const updateRecipeCounter = (showing, total) => {
    recipeCountDisplay.textContent =
      `Showing ${showing} of ${total} recipes`;
  };

  const updateDisplay = () => {
    let data = recipes;

    data = filterBySearch(data, searchQuery);
    data = applyFilter(data);

    updateRecipeCounter(data.length, recipes.length);
    renderRecipes(data);
  };

  // ================= FAVORITES =================

  const saveFavorites = () => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  };

  const toggleFavorite = (id) => {
    id = parseInt(id);

    if (favorites.includes(id)) {
      favorites = favorites.filter(f => f !== id);
    } else {
      favorites.push(id);
    }

    saveFavorites();
    updateDisplay();
  };

  // ================= EVENTS =================

  const handleSearchInput = (e) => {
    const value = e.target.value;

    clearSearchBtn.style.display = value ? 'block' : 'none';

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      searchQuery = value;
      updateDisplay();
    }, 300);
  };

  const handleClearSearch = () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    updateDisplay();
  };

  const handleFilterClick = (e) => {
    currentFilter = e.target.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    updateDisplay();
  };

  const handleContainerClick = (e) => {

    if (e.target.classList.contains('favorite-btn')) {
      toggleFavorite(e.target.dataset.id);
    }

    if (e.target.classList.contains('toggle-btn')) {
      const steps = e.target.nextElementSibling;
      steps.classList.toggle('show');
    }
  };

  const setupEventListeners = () => {
    filterButtons.forEach(btn =>
      btn.addEventListener('click', handleFilterClick)
    );

    searchInput.addEventListener('input', handleSearchInput);
    clearSearchBtn.addEventListener('click', handleClearSearch);

    recipeContainer.addEventListener('click', handleContainerClick);
  };

  // ================= INIT =================

  const init = () => {
    setupEventListeners();
    updateDisplay();
    console.log("🍳 RecipeJS Ready");
  };

  return { init };

})();

RecipeApp.init();