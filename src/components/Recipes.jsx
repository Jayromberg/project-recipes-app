import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const TWELVE = 12;
  const { isFood,
    isDrink,
    foodsRecipes,
    drinkRecipes,
    foodCategories,
    drinkCategories,
    fetchFoodsFromCategory,
    recipefromCategory,
    toggle,
    settoggleCategory,
    All,
    setAll,
    setWithCategory,
    withCategory,
    toggleCategory } = useContext(RecipesContext);
  const categories = isFood ? foodCategories : drinkCategories;
  const [categoryRecipe, setCategoryRecipe] = useState([]);

  useEffect(() => {
    const auxiliar = [];
    categories.forEach((elem) => {
      const categoryObj = { category: elem.strCategory,
        toggleCategory: false,
      };
      auxiliar.push(categoryObj);
      settoggleCategory(auxiliar);
    });
  }, [categories]);

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
            type: 'foods',
            name: item.strMeal,
            image: item.strMealThumb,
            id: item.idMeal,
          }));

        setCategoryRecipe(filterFood);
      } else if (recipefromCategory.drinks) {
        const filteDrink = recipefromCategory.drinks
          .filter((_item, index) => index < TWELVE).map((item) => ({
            type: 'drinks',
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

  const selectCategory = async (event) => {
    const { name } = event.target;
    await fetchFoodsFromCategory(name);
    toggle(name);
  };

  const getAll = () => {
    setAll(true);
    setWithCategory(false);
  };

  console.log(categoryRecipe);
  return (
    <div>
      { categories.map((item) => (
        <button
          key={ item.strCategory }
          data-testid={ `${item.strCategory}-category-filter` }
          type="button"
          name={ item.strCategory }
          onClick={ selectCategory }
        >
          {item.strCategory}

        </button>
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
          <Link to={ `/${item.type}/${item.id}` }>
            <img
              src={ item.image }
              alt={ item.name }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{item.name}</p>
          </Link>
        </section>
      ))) }
      { isFood && All && foodsRecipes.map((item, index) => (
        <section data-testid={ `${index}-recipe-card` } key={ item.idMeal }>
          <Link to={ `/foods/${item.idMeal}` }>
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
          </Link>
        </section>
      )) }
      { isDrink && All && drinkRecipes.map((item, index) => (
        <section data-testid={ `${index}-recipe-card` } key={ item.idDrink }>
          <Link to={ `/drinks/${item.idDrink}` }>
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
          </Link>
        </section>)) }
    </div>
  );
}

export default Recipes;
