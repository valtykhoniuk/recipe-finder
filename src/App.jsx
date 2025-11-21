import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Favourites from "./pages/Favourites.jsx";
import Header from "./components/Header.jsx";
import { controller } from "./api/api.js";

function App() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [mealType, setMealType] = useState("");
  const [maxCalories, setMaxCalories] = useState(800);

  const loadRecipes = useCallback(async () => {
    const data = await controller("/receipts");
    setAllRecipes(data);
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const filteredRecipes = allRecipes
    .filter((recipe) => (mealType ? recipe.mealType === mealType : true))
    .filter((recipe) => recipe.calories <= maxCalories);

  const returnToDefaultValues = () => {
    setMealType("");
    setMaxCalories(800);
  };

  const favouriteRecipes = allRecipes.filter((r) => r.isFavourite === true);

  return (
    <div className="app">
      <Header
        mealType={mealType}
        maxCalories={maxCalories}
        onMealTypeChange={setMealType}
        onMaxCaloriesChange={setMaxCalories}
        onClear={() => {
          returnToDefaultValues();
        }}
      />

      <Routes>
        <Route path="/" element={<Home recipes={filteredRecipes} />} />
        <Route
          path="/favourites"
          element={<Favourites recipes={favouriteRecipes} />}
        />
      </Routes>
    </div>
  );
}

export default App;
