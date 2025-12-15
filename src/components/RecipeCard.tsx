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
  gap: 4px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const Subtitle = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #333;
`;

const Button = styled.button`
  background-color: var(--dark-background-color, black);
  flex-grow: 1;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background-color: var(--main-color, black);
    transition: background-color 0.3s ease;
  }
`;

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  name,
  calories,
  img,
  desc,
  onDelete,
}) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const redirectToDetails = () => {
    window.location.href = `/recipe/${id}`;
  };

  return (
    <CardContainer>
      {img && <Image src={img} alt={name} />}
      <Content>
        <Title>{name}</Title>
        <Subtitle>Calories: {calories}</Subtitle>
        <Description>{desc}</Description>
      </Content>
      <Button onClick={redirectToDetails}>Details</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </CardContainer>
  );
};

export default RecipeCard;
