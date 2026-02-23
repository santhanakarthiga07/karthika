// ===========================
// RECIPE DATA
// ===========================

const recipes = [
    { title: "Spaghetti Carbonara", difficulty: "medium", time: 25 },
    { title: "Grilled Cheese Sandwich", difficulty: "easy", time: 10 },
    { title: "Beef Wellington", difficulty: "hard", time: 90 },
    { title: "Chicken Curry", difficulty: "medium", time: 40 },
    { title: "Pancakes", difficulty: "easy", time: 20 },
    { title: "Caesar Salad", difficulty: "easy", time: 15 },
    { title: "Chocolate Souffle", difficulty: "hard", time: 60 },
    { title: "Vegetable Stir Fry", difficulty: "medium", time: 18 }
];

// ===========================
// STATE MANAGEMENT
// ===========================

let currentFilter = "all";
let currentSort = "none";

// ===========================
// DOM REFERENCES
// ===========================

const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// ===========================
// PURE FILTER FUNCTIONS
// ===========================

const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time < maxTime);
};

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return filterByDifficulty(recipes, filterType);
        case "quick":
            return filterByTime(recipes, 30);
        case "all":
        default:
            return recipes;
    }
};

// ===========================
// PURE SORT FUNCTIONS
// ===========================

const sortByName = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
};

const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.time - b.time
    );
};

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        case "none":
        default:
            return recipes;
    }
};

// ===========================
// RENDER FUNCTION
// ===========================

const renderRecipes = (recipes) => {
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Time:</strong> ${recipe.time} mins</p>
        `;

        recipeContainer.appendChild(card);
    });
};

// ===========================
// UPDATE DISPLAY (MAIN FLOW)
// ===========================

const updateDisplay = () => {
    let result = recipes;

    result = applyFilter(result, currentFilter);
    result = applySort(result, currentSort);

    renderRecipes(result);

    updateActiveButtons();

    console.log(
        `Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};

// ===========================
// ACTIVE BUTTON MANAGEMENT
// ===========================

const updateActiveButtons = () => {

    filterButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add("active");
        }
    });

    sortButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.sort === currentSort) {
            btn.classList.add("active");
        }
    });
};

// ===========================
// EVENT HANDLERS
// ===========================

const handleFilterClick = (event) => {
    currentFilter = event.target.dataset.filter;
    updateDisplay();
};

const handleSortClick = (event) => {
    currentSort = event.target.dataset.sort;
    updateDisplay();
};

// ===========================
// EVENT LISTENERS
// ===========================

const setupEventListeners = () => {

    filterButtons.forEach(button => {
        button.addEventListener("click", handleFilterClick);
    });

    sortButtons.forEach(button => {
        button.addEventListener("click", handleSortClick);
    });
};

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    updateDisplay();
});