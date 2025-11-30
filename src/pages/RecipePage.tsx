import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { controller } from "../api/api";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();

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

  return (
    <div className="create-recipe-page">
      <h2>Recipe</h2>

      <div>
        <p>
          <strong>Name:</strong> {name}
        </p>
      </div>

      <div>
        <p>
          <strong>Description:</strong> {desc}
        </p>
      </div>

      <div>
        <p>
          <strong>Calories:</strong> {calories}
        </p>
      </div>

      <div>
        <p>
          <strong>Meal Type:</strong> {mealType}
        </p>
      </div>

      <div>
        <p>
          <strong>Ingredients:</strong>
        </p>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {image && <img src={image} alt={name} style={{ width: "200px" }} />}
    </div>
  );
};

export default RecipePage;
