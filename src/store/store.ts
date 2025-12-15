import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

interface FiltersState {
  mealType: string;
  maxCalories: number;
  selectedIngredients: string[];
}

const initialState: FiltersState = {
  mealType: "",
  maxCalories: 800,
  selectedIngredients: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setMealType: (state, action: PayloadAction<string>) => {
      state.mealType = action.payload;
    },
    setMaxCalories: (state, action: PayloadAction<number>) => {
      state.maxCalories = action.payload;
    },
    toggleIngredient: (state, action: PayloadAction<string>) => {
      const ingredient = action.payload;
      if (state.selectedIngredients.includes(ingredient)) {
        state.selectedIngredients = state.selectedIngredients.filter(
          (i) => i !== ingredient
        );
      } else {
        state.selectedIngredients.push(ingredient);
      }
    },
    resetFilters: () => initialState,
  },
});

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

export const { setMealType, setMaxCalories, toggleIngredient, resetFilters } =
  filtersSlice.actions;
