import React from "react";
import { useState } from "react";
import ALL_INGREDIENTS from "../utils/constants";
import { controller } from "../api/api";

const CreateRecipe = () => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [calories, setCalories] = useState<number>(0);
  const [mealType, setMealType] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");

  const handleToggleIngredient = (ingredient: string) => {
    setIngredients((prev) => {
      return prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient];
    });
  };

  const clearData = () => {
    setName("");
    setDesc("");
    setCalories(0);
    setMealType("");
    setIngredients([]);
    setImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await controller("/receipts", "POST", {
        name,
        desc,
        calories,
        mealType,
        ingredients,
        image,
      });
      alert("Recipe created successfully!");

      clearData();
    } catch (err) {
      console.error(err);
      alert("Failed to create recipe");
    }
  };

  return (
    <div className="create-recipe-page">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="create-recipe-form">
          <div>
            <label>Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Calories:</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(+e.target.value)}
              required
            />
          </div>

          <div>
            <label>Meal Type:</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          <div>
            <label>Ingredients:</label>
            {ALL_INGREDIENTS.map((ingredient: string) => (
              <label key={ingredient}>
                <input
                  type="checkbox"
                  checked={ingredients.includes(ingredient)}
                  onChange={() => handleToggleIngredient(ingredient)}
                />
                {ingredient}
              </label>
            ))}
          </div>

          <div>
            <label>Image URL:</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} />
          </div>

          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
