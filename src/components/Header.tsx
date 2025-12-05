import React from "react";
import styled from "styled-components";
import Filters from "./Filters.jsx";
import { HeaderProps } from "../utils/ types.js";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--main-color);
`;

const FiltersSection = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  border-radius: 40px;
`;

const Header: React.FC<HeaderProps> = ({
  mealType,
  maxCalories,
  selectedIngredients,
  onMealTypeChange,
  onMaxCaloriesChange,
  onIngredientToggle,
  onClear,
}) => {
  return (
    <HeaderContainer>
      <Title>Recipes</Title>
      <FiltersSection>
        <Filters
          mealType={mealType}
          maxCalories={maxCalories}
          selectedIngredients={selectedIngredients}
          onMealTypeChange={onMealTypeChange}
          onMaxCaloriesChange={onMaxCaloriesChange}
          onIngredientToggle={onIngredientToggle}
          onClear={onClear}
        />
      </FiltersSection>
    </HeaderContainer>
  );
};

export default Header;
