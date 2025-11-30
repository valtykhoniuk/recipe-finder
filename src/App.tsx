import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Favourites from "./pages/Favourites.js";
import Layout from "./pages/Layout.jsx";
import { controller } from "./api/api.js";
import { Recipe } from "./utils/ types.js";
import CreateRecipe from "./pages/CreateRecipe.js";
import EditRecipe from "./pages/EditRecipe.js";
import RecipePage from "./pages/RecipePage.js";

function App() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [mealType, setMealType] = useState<string>("");
  const [maxCalories, setMaxCalories] = useState<number>(800);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const loadRecipes = useCallback(async () => {
    const data = await controller("/receipts");
    setAllRecipes(data);
  }, []);

  useEffect(() => {
    async function fetchRecipes() {
      const data = await controller("/receipts");
      setAllRecipes(data);
    }
    fetchRecipes();
  }, [loadRecipes]);

  const filteredRecipes = allRecipes
    .filter((recipe) => (mealType ? recipe.mealType === mealType : true))
    .filter((recipe) => recipe.calories <= maxCalories)
    .filter((recipe) =>
      selectedIngredients.length === 0
        ? true
        : selectedIngredients.every((ingredient) =>
            recipe.ingredients?.includes(ingredient)
          )
    );

  const returnToDefaultValues = () => {
    setMealType("");
    setMaxCalories(800);
    setSelectedIngredients([]);
  };

  const favouriteRecipes = allRecipes.filter((r) => r.isFavourite === true);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) => {
      return prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient];
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            mealType={mealType}
            maxCalories={maxCalories}
            selectedIngredients={selectedIngredients}
            onMealTypeChange={setMealType}
            onMaxCaloriesChange={setMaxCalories}
            onIngredientToggle={toggleIngredient}
            onClear={returnToDefaultValues}
          />
        }
      >
        <Route index element={<Home recipes={filteredRecipes} />} />
        <Route
          path="favourites"
          element={<Favourites recipes={favouriteRecipes} />}
        />
      </Route>

      <Route path="recipe/:id" element={<RecipePage />} />
      <Route path="/create_new_recipe" element={<CreateRecipe />} />
      <Route path="/recipe/:id/edit" element={<EditRecipe />} />
    </Routes>
  );
}

export default App;
