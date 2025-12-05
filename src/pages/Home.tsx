import React from "react";
import styled from "styled-components";
import RecipeCard from "../components/RecipeCard";
import { HomeProps } from "../utils/ types";

const CardsContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Home: React.FC<HomeProps> = ({ recipes }) => {
  return (
    <CardsContainer>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          name={recipe.name}
          img={recipe.image}
          calories={recipe.calories}
          desc={recipe.desc}
        />
      ))}
    </CardsContainer>
  );
};

export default Home;
