import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header.jsx";
import { LayoutProps } from "../utils/ types.js";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout: React.FC<LayoutProps> = ({
  mealType,
  maxCalories,
  selectedIngredients,
  onMealTypeChange,
  onMaxCaloriesChange,
  onIngredientToggle,
  onClear,
}) => {
  return (
    <AppContainer>
      <Header
        mealType={mealType}
        maxCalories={maxCalories}
        selectedIngredients={selectedIngredients}
        onMealTypeChange={onMealTypeChange}
        onMaxCaloriesChange={onMaxCaloriesChange}
        onIngredientToggle={onIngredientToggle}
        onClear={onClear}
      />
      <Outlet />
    </AppContainer>
  );
};

export default Layout;
