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
    const FetchDrinksRecipes = async () => {
      const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const results = await fetchApi.json();
      const firstsResults = results.drinks.filter((_item, idx) => idx < TWELVE);
      setDrinkRecipes(firstsResults);
    };
    FetchDrinksRecipes();
  }, []);

  const results = async (url, page) => {
    if (page === '/foods') {
      try {
        const fetchApi = await fetch(url);
        const result = await fetchApi.json();
        const firstsResults = result.meals.filter((_item, idx) => idx < TWELVE);
        setFoodRecipes(firstsResults);
      } catch {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
    if (page === '/drinks') {
      try {
        const fetchApi = await fetch(url);
        const result = await fetchApi.json();
        const firstsResults = result.drinks.filter((_item, idx) => idx < TWELVE);
        setDrinkRecipes(firstsResults);
      } catch {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  const fetchFoodsOrDrinksRecipesFilter = async (searchRadio, searchText, page) => {
    let urlIngredient = '';
    let urlName = '';
    let urlFirstLetter = '';
    if (page === '/foods') {
      urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
      urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
      urlFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;
    }
    if (page === '/drinks') {
      urlIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`;
      urlName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
      urlFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`;
    }
    if (searchRadio === 'ingredient') {
      results(urlIngredient, page);
    } else if (searchRadio === 'name') {
      results(urlName, page);
    } else if (searchRadio === 'firstLetter' && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      results(urlFirstLetter, page);
    }
  };

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
    fetchFoodsOrDrinksRecipesFilter,
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
