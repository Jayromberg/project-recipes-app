import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './RecipesContext';

const INICIAL_STATE = {};

function RecipesProvider({ children }) {
  const [state] = useState(INICIAL_STATE);
  const [isFood, setIsFood] = useState(false);
  const [isDrink, setIsDrink] = useState(false);
  const [foodsRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [email, setEmail] = useState('');
  const TWELVE = 12;

  useEffect(() => {
    const FetchFoodsRecipes = async () => {
      const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await fetchApi.json();
      const firstsResults = result.meals.filter((_item, idx) => idx < TWELVE);
      setFoodRecipes(firstsResults);
    };
    FetchFoodsRecipes();
  }, []);

  useEffect(() => {
    const FetchDriksRecipes = async () => {
      const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const results = await fetchApi.json();
      const firstsResults = results.drinks.filter((_item, idx) => idx < TWELVE);
      setDrinkRecipes(firstsResults);
    };
    FetchDriksRecipes();
  }, []);

  const context = {
    state,
    isFood,
    setIsFood,
    isDrink,
    setIsDrink,
    foodsRecipes,
    drinkRecipes,
    email,
    setEmail,
  };

  return (
    <recipesContext.Provider value={ context }>
      {children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
