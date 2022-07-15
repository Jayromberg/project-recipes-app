
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Recipes({ withCategory, setWithCategory }) {
  const TWELVE = 12;
  const { isFood, isDrink, foodsRecipes, drinkRecipes, foodCategories,
    drinkCategories, fetchFoodsFromCategory,
    recipefromCategory } = useContext(RecipesContext);
  const categories = isFood ? foodCategories : drinkCategories;

  const [All, setAll] = useState(true);
  const [categoryRecipe, setCategoryRecipe] = useState([]);
  
  const history = useHistory();
  useEffect(() => {
    if (foodsRecipes.length === 1) {
      history.push(`/foods/${foodsRecipes[0].idMeal}`);
    }
    if (drinkRecipes.length === 1) {
      history.push(`/drinks/${drinkRecipes[0].idDrink}`);
    }
  }, [drinkRecipes,
    drinkRecipes.idDrink,
    drinkRecipes.length,
    foodsRecipes,
    foodsRecipes.idMeal,
    foodsRecipes.length,
    history]);

  const changeCategory = useCallback(() => {
    setWithCategory(true);
  }, [setWithCategory]);

  useEffect(() => {
    const filterSelectedCategory = () => {
      if (recipefromCategory.meals) {
        const filterFood = recipefromCategory.meals
          .filter((_item, index) => index < TWELVE)
          .map((item) => ({
            name: item.strMeal,
            image: item.strMealThumb,
            id: item.idMeal,
          }));

        setCategoryRecipe(filterFood);
      } else if (recipefromCategory.drinks) {
        const filteDrink = recipefromCategory.drinks
          .filter((_item, index) => index < TWELVE).map((item) => ({
            name: item.strDrink,
            image: item.strDrinkThumb,
            id: item.idDrink,
          }));

        setCategoryRecipe(filteDrink);
      }
    };
    filterSelectedCategory();
    changeCategory();
  }, [recipefromCategory, changeCategory]);

  const selectCategory = async (category) => {
    await fetchFoodsFromCategory(category);
    setAll(false);
  };

  const getAll = () => {
    setAll(true);
    setWithCategory(false);
  };

  return (
    <div>
      { categories.map((item) => (
        <section key={ item.strCategory }>
          <button
            data-testid={ `${item.strCategory}-category-filter` }
            type="button"
            onClick={ () => selectCategory(item.strCategory) }
          >
            {item.strCategory}

          </button>
        </section>
      ))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => getAll() }
      >
        All

      </button>
      { categoryRecipe && withCategory && (categoryRecipe.map((item, index) => (
        <section data-testid={ `${index}-recipe-card` } key={ item.id }>
          <img
            src={ item.image }
            alt={ item.name }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{item.name}</p>
        </section>
      ))) }
      { isFood && All && foodsRecipes.map((item, index) => (
        <section data-testid={ `${index}-recipe-card` } key={ item.idMeal }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
        </section>
      )) }
      { isDrink && All && drinkRecipes.map((item, index) => (
        <section data-testid={ `${index}-recipe-card` } key={ item.idDrink }>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
        </section>)) }
    </div>
  );
}

Recipes.propTypes = {
  withCategory: PropTypes.bool.isRequired,
  setWithCategory: PropTypes.func.isRequired,
};
export default Recipes;
