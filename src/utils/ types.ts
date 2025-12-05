export interface Recipe {
  id: string;
  name: string;
  calories: number;
  image?: string;
  desc: string;
  mealType: string;
  ingredients?: string[];
  isFavourite?: boolean;
}

export interface RecipeCardProps {
  id: string;
  name: string;
  calories: number;
  img?: string;
  desc: string;
  onDelete?: (id: string) => void;
}

export interface LayoutProps {
  mealType: string;
  maxCalories: number;
  selectedIngredients: string[];
  onMealTypeChange: (mealType: string) => void;
  onMaxCaloriesChange: (maxCalories: number) => void;
  onIngredientToggle: (ingredient: string) => void;
  onClear: () => void;
}

export interface HeaderProps extends LayoutProps {}

export interface HomeProps {
  recipes: Recipe[];
  onDelete?: (id: string) => void;
}

export interface FavouritesProps {
  recipes: Recipe[];
}

export interface FiltersProps extends LayoutProps {}
