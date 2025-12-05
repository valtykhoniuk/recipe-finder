import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Layout from "./pages/Layout";
import { controller } from "./api/api";
import { Recipe } from "./utils/ types";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipePage from "./pages/RecipePage";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
`;

function App() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [mealType, setMealType] = useState<string>("");
  const [maxCalories, setMaxCalories] = useState<number>(800);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const loadRecipes = useCallback(async () => {
    const data = await controller<Recipe[]>("/receipts");
    setAllRecipes(data);
  }, []);

  useEffect(() => {
    loadRecipes();
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

  const handleDeleteRecipe = async (id: string) => {
    try {
      await controller(`/receipts/${id}`, "DELETE");
      setAllRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      alert("Recipe deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };

  const favouriteRecipes = allRecipes.filter((r) => r.isFavourite);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const returnToDefaultValues = () => {
    setMealType("");
    setMaxCalories(800);
    setSelectedIngredients([]);
  };

  return (
    <AppContainer>
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
          <Route
            index
            element={
              <Home recipes={filteredRecipes} onDelete={handleDeleteRecipe} />
            }
          />
          <Route
            path="favourites"
            element={<Favourites recipes={favouriteRecipes} />}
          />
        </Route>

        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="/create_new_recipe" element={<CreateRecipe />} />
        <Route path="/recipe/:id/edit" element={<EditRecipe />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
