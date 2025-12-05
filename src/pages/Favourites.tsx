import React from "react";
import styled from "styled-components";
import RecipeCard from "../components/RecipeCard";
import { FavouritesProps } from "../utils/ types";

const CardsContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Favourites: React.FC<FavouritesProps> = ({ recipes }) => {
  return (
    <CardsContainer>
      {recipes.map((recipe) => (
        <RecipeCard
          id={recipe.id}
          key={recipe.id}
          name={recipe.name}
          calories={recipe.calories}
          desc={recipe.desc}
          img={recipe.image}
        />
      ))}
    </CardsContainer>
  );
};

export default Favourites;
