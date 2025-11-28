import Filters from "./Filters.jsx";

const Header = ({
  mealType,
  maxCalories,
  selectedIngredients,
  onMealTypeChange,
  onMaxCaloriesChange,
  onIngredientToggle,
  onClear,
}) => {
  return (
    <div className="header">
      <h1>Recipes</h1>

      <div className="filters-section">
        <Filters
          mealType={mealType}
          maxCalories={maxCalories}
          selectedIngredients={selectedIngredients}
          onMealTypeChange={onMealTypeChange}
          onMaxCaloriesChange={onMaxCaloriesChange}
          onIngredientToggle={onIngredientToggle}
          onClear={onClear}
        />
      </div>
    </div>
  );
};

export default Header;
