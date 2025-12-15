import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Layout from "./pages/Layout";
import { controller } from "./api/api";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipePage from "./pages/RecipePage";
import {
  useAppDispatch,
  useAppSelector,
  setMealType,
  setMaxCalories,
  toggleIngredient,
  resetFilters,
} from "./store/store";

type Recipe = {
  id: string;
  name: string;
  desc: string;
  mealType: string;
  calories: number;
  ingredients?: string[];
  isFavourite?: boolean;
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
`;

function App() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

  const loadRecipes = useCallback(async () => {
    const data = await controller<Recipe[]>("/receipts");
    setAllRecipes(data);
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const filteredRecipes = allRecipes
    .filter((recipe) =>
      filters.mealType ? recipe.mealType === filters.mealType : true
    )
    .filter((recipe) => recipe.calories <= filters.maxCalories)
    .filter((recipe) =>
      filters.selectedIngredients.length === 0
        ? true
        : filters.selectedIngredients.every((ingredient) =>
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

  return (
    <AppContainer>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              mealType={filters.mealType}
              maxCalories={filters.maxCalories}
              selectedIngredients={filters.selectedIngredients}
              onMealTypeChange={(v) => dispatch(setMealType(v))}
              onMaxCaloriesChange={(v) => dispatch(setMaxCalories(v))}
              onIngredientToggle={(v) => dispatch(toggleIngredient(v))}
              onClear={() => dispatch(resetFilters())}
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
