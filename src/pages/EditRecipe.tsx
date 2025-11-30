import React from "react";
import { controller } from "../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ALL_INGREDIENTS from "../utils/constants";

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [calories, setCalories] = useState(0);
  const [mealType, setMealType] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [image, setImage] = useState("");

  function setRecipeData(data: any) {
    setName(data.name);
    setDesc(data.desc);
    setCalories(data.calories);
    setMealType(data.mealType);
    setIngredients(data.ingredients || []);
    setImage(data.image || "");
  }

  useEffect(() => {
    async function fetchRecipe() {
      const data = await controller(`/receipts/${id}`);
      setRecipeData(data);
    }
    fetchRecipe();
  }, [id]);

  const toggleIngredient = (ingredient: string) => {
    setIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await controller(`/receipts/${id}`, "PUT", {
      name,
      desc,
      calories,
      mealType,
      ingredients,
      image,
    });
    alert("Recipe updated successfully!");
    navigate("/recipe/" + id);
  }

  return (
    <div className="create-recipe-page">
      <h2>Edit Recipe</h2>

      <form onSubmit={handleSubmit} className="create-recipe-form">
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Description:</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div>
          <label>Calories:</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(+e.target.value)}
          />
        </div>

        <div>
          <label>Meal Type:</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
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
          {ALL_INGREDIENTS.map((i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={ingredients.includes(i)}
                onChange={() => toggleIngredient(i)}
              />
              {i}
            </label>
          ))}
        </div>

        <div>
          <label>Image URL:</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
