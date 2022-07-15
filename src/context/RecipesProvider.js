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
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [recipefromCategory, setRecipeCategory] = useState([]);
  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    const FetchFoodsRecipes = async () => {
      const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await fetchApi.json();
      const firstsResults = result.meals.filter((_item, idx) => idx < TWELVE);
      setFoodRecipes(firstsResults);
    };

    const FetchFoodsCategory = async () => {
      const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const result = await fetchApi.json();
      const firstsResults = result.meals.filter((_item, idx) => idx < FIVE);
      setFoodCategories(firstsResults);
    };

    const FetchDriksRecipes = async () => {
      const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const results = await fetchApi.json();
      const firstsResults = results.drinks.filter((_item, idx) => idx < TWELVE);
      setDrinkRecipes(firstsResults);
    };

    const FetchDriksCategories = async () => {
      const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const results = await fetchApi.json();
      const firstsResults = results.drinks.filter((_item, idx) => idx < FIVE);
      setDrinkCategories(firstsResults);
    };

    FetchFoodsRecipes();
    FetchFoodsCategory();
    FetchDriksRecipes();
    FetchDriksCategories();
  }, []);

  const fetchFoodsFromCategory = async (category) => {
    let URL = '';
    const foodArray = foodCategories.map((item) => item.strCategory);
    if (foodArray.includes(category)) {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    } else {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    const fetchApi = await fetch(URL);
    const result = await fetchApi.json();
    setRecipeCategory(result);
  };

  const context = {
    state,
    isFood,
    setIsFood,
    isDrink,
    setIsDrink,
    foodsRecipes,
    drinkRecipes,
    foodCategories,
    drinkCategories,
    fetchFoodsFromCategory,
    recipefromCategory,
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
