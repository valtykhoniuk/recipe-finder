import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Favourites from "./pages/Favourites.jsx";
import Layout from "./pages/Layout.jsx";
import Header from "./components/Header.jsx";
import { controller } from "./api/api.js";

function App() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [mealType, setMealType] = useState("");
  const [maxCalories, setMaxCalories] = useState(800);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const loadRecipes = useCallback(async () => {
    const data = await controller("/receipts");
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
        : selectedIngredients.every((ing) => recipe.ingredients?.includes(ing))
    );

  const returnToDefaultValues = () => {
    setMealType("");
    setMaxCalories(800);
    setSelectedIngredients([]);
  };

  const favouriteRecipes = allRecipes.filter((r) => r.isFavourite === true);

  const toggleIngredient = (ingredient) => {
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
    </Routes>
  );
}

export default App;
