const RecipeApp = (() => {

    // =============================
    // DATA
    // =============================
    const recipes = [
        {
            id: 1,
            title: "Spaghetti",
            time: 25,
            difficulty: "easy",
            description: "Classic pasta dish",
            ingredients: ["Pasta", "Salt", "Tomato", "Cheese"],
            steps: [
                "Boil water",
                "Add pasta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat oil",
                        "Add tomato",
                        "Add spices"
                    ]
                },
                "Mix and serve"
            ]
        },
        {
            id: 2,
            title: "Fried Rice",
            time: 20,
            difficulty: "easy",
            description: "Quick fried rice",
            ingredients: ["Rice", "Egg", "Vegetables"],
            steps: [
                "Cook rice",
                "Heat pan",
                "Add vegetables",
                "Add rice and mix"
            ]
        },
        {
            id: 3,
            title: "Chicken Curry",
            time: 40,
            difficulty: "medium",
            description: "Spicy curry",
            ingredients: ["Chicken", "Spices", "Onion"],
            steps: [
                "Heat oil",
                {
                    text: "Cook masala",
                    substeps: [
                        "Add onion",
                        "Add spices",
                        "Cook well"
                    ]
                },
                "Add chicken",
                "Cook until done"
            ]
        },
        {
            id: 4,
            title: "Pancakes",
            time: 15,
            difficulty: "easy",
            description: "Breakfast pancakes",
            ingredients: ["Flour", "Milk", "Egg"],
            steps: ["Mix ingredients", "Pour batter", "Flip pancake"]
        },
        {
            id: 5,
            title: "Pizza",
            time: 50,
            difficulty: "hard",
            description: "Homemade pizza",
            ingredients: ["Dough", "Cheese", "Sauce"],
            steps: ["Prepare dough", "Add toppings", "Bake"]
        },
        {
            id: 6,
            title: "Salad",
            time: 10,
            difficulty: "easy",
            description: "Healthy salad",
            ingredients: ["Lettuce", "Tomato", "Cucumber"],
            steps: ["Chop vegetables", "Mix", "Serve"]
        },
        {
            id: 7,
            title: "Burger",
            time: 30,
            difficulty: "medium",
            description: "Juicy burger",
            ingredients: ["Bun", "Patty", "Cheese"],
            steps: ["Cook patty", "Assemble burger"]
        },
        {
            id: 8,
            title: "Soup",
            time: 35,
            difficulty: "medium",
            description: "Hot soup",
            ingredients: ["Water", "Vegetables"],
            steps: ["Boil water", "Add vegetables", "Cook"]
        }
    ];

    let currentFilter = "all";
    let currentSort = "none";

    const container = document.getElementById("recipe-container");

    // =============================
    // RECURSION FUNCTION
    // =============================
    const renderSteps = (steps, level = 0) => {
        const listClass = level === 0 ? "steps-list" : "substeps-list";
        let html = `<ol class="${listClass}">`;

        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>${step.text}`;
                if (step.substeps) {
                    html += renderSteps(step.substeps, level + 1);
                }
                html += `</li>`;
            }
        });

        html += `</ol>`;
        return html;
    };

    const createStepsHTML = (steps) => {
        if (!steps) return "";
        return renderSteps(steps);
    };

    // =============================
    // CREATE CARD
    // =============================
    const createRecipeCard = (recipe) => {
        return `
        <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <p>⏱ ${recipe.time} mins | ${recipe.difficulty}</p>

            <div class="card-actions">
                <button class="toggle-btn" data-id="${recipe.id}" data-type="steps">
                    Show Steps
                </button>
                <button class="toggle-btn" data-id="${recipe.id}" data-type="ingredients">
                    Show Ingredients
                </button>
            </div>

            <div class="ingredients-container" data-id="${recipe.id}">
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div>

            <div class="steps-container" data-id="${recipe.id}">
                ${createStepsHTML(recipe.steps)}
            </div>
        </div>
        `;
    };

    // =============================
    // FILTER & SORT
    // =============================
    const applyFilter = (data) => {
        if (currentFilter === "all") return data;
        return data.filter(r => r.difficulty === currentFilter);
    };

    const applySort = (data) => {
        if (currentSort === "name") {
            return [...data].sort((a, b) => a.title.localeCompare(b.title));
        }
        if (currentSort === "time") {
            return [...data].sort((a, b) => a.time - b.time);
        }
        return data;
    };

    // =============================
    // DISPLAY
    // =============================
    const updateDisplay = () => {
        let data = applyFilter(recipes);
        data = applySort(data);
        container.innerHTML = data.map(createRecipeCard).join("");
    };

    // =============================
    // EVENTS
    // =============================
    const handleToggle = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const id = e.target.dataset.id;
        const type = e.target.dataset.type;

        const section = document.querySelector(
            `.${type}-container[data-id="${id}"]`
        );

        if (section) {
            section.classList.toggle("visible");
        }
    };

    const setupEvents = () => {

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.onclick = () => {
                currentFilter = btn.dataset.filter;
                updateDisplay();
            };
        });

        document.querySelectorAll(".sort-btn").forEach(btn => {
            btn.onclick = () => {
                currentSort = btn.dataset.sort;
                updateDisplay();
            };
        });

        container.addEventListener("click", handleToggle);
    };

    // =============================
    // INIT
    // =============================
    const init = () => {
        setupEvents();
        updateDisplay();
    };

    return { init };

})();

RecipeApp.init();