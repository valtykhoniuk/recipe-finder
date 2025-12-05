import React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import ALL_INGREDIENTS, { MEAL_TYPES } from "../utils/constants";
import { FiltersProps } from "../utils/ types";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #fff;
  padding: 1rem;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;

  select,
  input[type="range"] {
    margin-top: 0.25rem;
    background-color: #fff;
  }

  label {
    font-weight: 500;
    background-color: #fff;
  }
`;

const IngredientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background-color: #fff;

  label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: #fff;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: #fff;

  button {
    background-color: var(--main-color, #1976d2);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
      background-color: #115293;
    }
  }
`;

const Filters: React.FC<FiltersProps> = ({
  mealType,
  maxCalories,
  selectedIngredients,
  onMealTypeChange,
  onMaxCaloriesChange,
  onIngredientToggle,
  onClear,
}) => {
  return (
    <Formik
      initialValues={{
        mealType,
        maxCalories,
        ingredients: selectedIngredients,
      }}
      enableReinitialize
      onSubmit={(values) => {
        onMealTypeChange(values.mealType);
        onMaxCaloriesChange(values.maxCalories);
        // Оновлюємо інгредієнти через onIngredientToggle
        ALL_INGREDIENTS.forEach((ingredient) => {
          const isSelected = values.ingredients.includes(ingredient);
          const wasSelected = selectedIngredients.includes(ingredient);
          if (isSelected && !wasSelected) onIngredientToggle(ingredient);
          if (!isSelected && wasSelected) onIngredientToggle(ingredient);
        });
      }}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form>
          <Section>
            <Group>
              <label>Meal type:</label>
              <Field as="select" name="mealType">
                <option value="">Any</option>
                {MEAL_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Field>
            </Group>

            <Group>
              <label>Max calories: {values.maxCalories} kcal</label>
              <Field
                type="range"
                name="maxCalories"
                min="0"
                max="2000"
                step="50"
                value={values.maxCalories}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue("maxCalories", +e.target.value)
                }
              />
            </Group>

            <Group>
              <label>Ingredients:</label>
              <IngredientsList>
                {ALL_INGREDIENTS.map((ingredient) => (
                  <label key={ingredient}>
                    <input
                      type="checkbox"
                      checked={values.ingredients.includes(ingredient)}
                      onChange={() => {
                        const exists = values.ingredients.includes(ingredient);
                        setFieldValue(
                          "ingredients",
                          exists
                            ? values.ingredients.filter((i) => i !== ingredient)
                            : [...values.ingredients, ingredient]
                        );
                      }}
                    />
                    {ingredient}
                  </label>
                ))}
              </IngredientsList>
            </Group>

            <Actions>
              <button type="submit">Apply</button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClear();
                }}
              >
                Clear
              </button>
            </Actions>
          </Section>
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
