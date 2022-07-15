import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { isFood, isDrink, foodsRecipes, drinkRecipes } = useContext(RecipesContext);
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

  return (
    <div>
      { isFood && foodsRecipes.map((item, index) => (
        <section data-testid={ `${index}-recipe-card` } key={ item.idMeal }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
        </section>
      )) }
      { isDrink && drinkRecipes.map((item, index) => (
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

export default Recipes;
