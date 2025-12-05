import React from "react";
import styled from "styled-components";
import { RecipeCardProps } from "../utils/ types";

const CardContainer = styled.div`
  max-width: 250px;
  border-radius: 16px;
  margin: 10px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 4px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  background-color: #fff;
`;

const Subtitle = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  background-color: #fff;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #333;
  background-color: #fff;
`;

const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  calories,
  img,
  desc,
}) => {
  return (
    <CardContainer>
      {img && <Image src={img} alt={name} />}
      <Content>
        <Title>{name}</Title>
        <Subtitle>Calories: {calories}</Subtitle>
        <Description>{desc}</Description>
      </Content>
    </CardContainer>
  );
};

export default RecipeCard;
