import RecipeCard from "../components/RecipeCard";

const Home = ({ recipes }) => {
  return (
    <div className="cards__container">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          name={recipe.name}
          img={recipe.image}
          calories={recipe.calories}
          desc={recipe.desc}
        />
      ))}
    </div>
  );
};

export default Home;
