import ALL_INGREDIENTS from "../utils/constants";

const Filters = ({
  mealType,
  maxCalories,
  selectedIngredients,
  onMealTypeChange,
  onMaxCaloriesChange,
  onIngredientToggle,
  onClear,
}) => {
  return (
    <section className="filters">
      <div className="filters__group">
        <label>Meal type: </label>
        <select
          value={mealType}
          onChange={(e) => onMealTypeChange(e.target.value)}
        >
          <option value="">Any</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>

      <div className="filters__group">
        <label>Max calories: {maxCalories} kcal </label>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={maxCalories}
          onChange={(e) => onMaxCaloriesChange(+e.target.value)}
        />
      </div>

      <div className="filters__group">
        <label>Ingredients:</label>

        <div className="ingredients-list">
          {ALL_INGREDIENTS.map((ingredient) => (
            <label key={ingredient}>
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient)}
                onChange={() => onIngredientToggle(ingredient)}
              />
              {ingredient}
            </label>
          ))}
        </div>
      </div>

      <div className="filters__actions">
        <button onClick={onClear}>Clear</button>
      </div>
    </section>
  );
};

export default Filters;
