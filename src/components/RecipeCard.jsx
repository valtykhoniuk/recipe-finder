import React from "react";

const RecipeCard = ({ name, calories, img, desc }) => {
  return (
    <div className="recipe-card__container">
      <div className="recipe-card">
        <h3>{name}</h3>
        <h4>Calories: {calories}</h4>
        <img src={img} />
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
