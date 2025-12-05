import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import ALL_INGREDIENTS, { MEAL_TYPES } from "../utils/constants";
import { controller } from "../api/api";
import { useNavigate } from "react-router-dom";

// --- Styled components ---
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

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
`;

const Select = styled.select`
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

// --- Types ---
interface RecipeFormValues {
  name: string;
  desc: string;
  calories: number;
  mealType: string;
  ingredients: string[];
  image: string;
}

// --- Validation ---
const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  desc: Yup.string().trim().required("Description is required"),
  calories: Yup.number()
    .typeError("Calories must be a number")
    .required("Calories is required")
    .min(0, "Calories must be positive"),
  mealType: Yup.string().trim().required("Meal type is required"),
  ingredients: Yup.array().min(1, "Select at least one ingredient"),
  image: Yup.string()
    .trim()
    .url("Invalid URL")
    .required("Image URL is required"),
});

// --- Component ---
const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();

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
      // --- Trim all string values before sending ---
      const payload = {
        ...values,
        name: values.name.trim(),
        desc: values.desc.trim(),
        mealType: values.mealType.trim(),
        image: values.image.trim(),
      };

      await controller("/receipts", "POST", payload);
      alert("Recipe created successfully!");
      resetForm();
      navigate("/"); // optional: redirect to home
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
            {/* Name */}
            <FieldContainer>
              <Label htmlFor="name">Name:</Label>
              <Field as={Input} name="name" />
              <ErrorMessage name="name" component={ErrorText} />
            </FieldContainer>

            {/* Description */}
            <FieldContainer>
              <Label htmlFor="desc">Description:</Label>
              <Field as={TextArea} name="desc" />
              <ErrorMessage name="desc" component={ErrorText} />
            </FieldContainer>

            {/* Calories */}
            <FieldContainer>
              <Label htmlFor="calories">Calories:</Label>
              <Field as={Input} type="number" name="calories" />
              <ErrorMessage name="calories" component={ErrorText} />
            </FieldContainer>

            {/* Meal Type */}
            <FieldContainer>
              <Label htmlFor="mealType">Meal Type:</Label>
              <Field as={Select} name="mealType">
                <option value="">Select meal type</option>
                {MEAL_TYPES.map((type: any) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="mealType" component={ErrorText} />
            </FieldContainer>

            {/* Ingredients */}
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

            {/* Image */}
            <FieldContainer>
              <Label htmlFor="image">Image URL:</Label>
              <Field as={Input} name="image" />
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
