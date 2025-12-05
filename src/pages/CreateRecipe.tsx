import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import ALL_INGREDIENTS, { MEAL_TYPES } from "../utils/constants";
import { controller } from "../api/api";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const FieldContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
`;

const Select = styled(Field)`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: var(--main-color, #1976d2);
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;

  &:hover {
    background-color: #115293;
  }
`;

interface RecipeFormValues {
  name: string;
  desc: string;
  calories: number;
  mealType: string;
  ingredients: string[];
  image: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  desc: Yup.string().required("Required"),
  calories: Yup.number()
    .required("Required")
    .min(0, "Calories must be positive"),
  mealType: Yup.string().required("Required"),
  ingredients: Yup.array().min(1, "Select at least one ingredient"),
  image: Yup.string().url("Invalid URL").required("Required"),
});

const CreateRecipe: React.FC = () => {
  const initialValues: RecipeFormValues = {
    name: "",
    desc: "",
    calories: 0,
    mealType: "",
    ingredients: [],
    image: "",
  };

  const handleSubmit = async (
    values: RecipeFormValues,
    { resetForm, setSubmitting }: any
  ) => {
    try {
      await controller("/receipts", "POST", values);
      alert("Recipe created successfully!");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to create recipe");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h2>Create New Recipe</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldContainer>
              <Label htmlFor="name">Name:</Label>
              <Input name="name" />
              <ErrorMessage name="name" component={ErrorText} />
            </FieldContainer>

            <FieldContainer>
              <Label htmlFor="desc">Description:</Label>
              <TextArea as="textarea" name="desc" />
              <ErrorMessage name="desc" component={ErrorText} />
            </FieldContainer>

            <FieldContainer>
              <Label htmlFor="calories">Calories:</Label>
              <Input type="number" name="calories" />
              <ErrorMessage name="calories" component={ErrorText} />
            </FieldContainer>

            <FieldContainer>
              <Label htmlFor="mealType">Meal Type:</Label>
              <Select as="select" name="mealType">
                <option value="">Select meal type</option>
                {MEAL_TYPES.map((type: any) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
              <ErrorMessage name="mealType" component={ErrorText} />
            </FieldContainer>

            <FieldContainer>
              <Label>Ingredients:</Label>
              {ALL_INGREDIENTS.map((ingredient) => (
                <CheckboxLabel key={ingredient}>
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
                </CheckboxLabel>
              ))}
              <ErrorMessage name="ingredients" component={ErrorText} />
            </FieldContainer>

            <FieldContainer>
              <Label htmlFor="image">Image URL:</Label>
              <Input name="image" />
              <ErrorMessage name="image" component={ErrorText} />
            </FieldContainer>

            <Button type="submit">Create Recipe</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateRecipe;
