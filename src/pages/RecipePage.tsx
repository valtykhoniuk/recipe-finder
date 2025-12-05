import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { controller } from "../api/api";
import styled from "styled-components";
import {
  Box,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  CardMedia,
  CardMediaProps,
} from "@mui/material";

interface RecipeFormValues {
  name: string;
  desc: string;
  calories: number;
  mealType: string;
  ingredients: string[];
  image: string;
}

const PageContainer = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
`;

const StyledCardMedia = styled(CardMedia)<CardMediaProps>`
  max-height: 300px;
  object-fit: cover;
`;

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeFormValues | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = (await controller(`/receipts/${id}`)) as RecipeFormValues;
        setRecipe(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!recipe) return <Typography>Loading...</Typography>;

  return (
    <PageContainer>
      <StyledCard>
        {recipe.image && (
          <StyledCardMedia component="img" image={recipe.image} />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {recipe.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {recipe.desc}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Calories:</strong> {recipe.calories}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Meal Type:</strong> {recipe.mealType}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Ingredients:
          </Typography>
          <List>
            {recipe.ingredients.map((ingredient) => (
              <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
          </List>
        </CardContent>
      </StyledCard>
    </PageContainer>
  );
};

export default RecipePage;
