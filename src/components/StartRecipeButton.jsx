import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RecipeDetails.css';

function StartRecipeButton({ id }) {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
    const { pathname } = history.location;
    const doneRecipesLocal = localStorage.getItem('doneRecipes');
    const inProgressRecipesLocal = localStorage.getItem('inProgressRecipes');
    if (doneRecipesLocal) {
      const recipes = JSON.parse(doneRecipesLocal);
      setIsVisible(!recipes.some((recipe) => recipe.id === id));
    }
    if (isInProgress) {
      setIsVisible(false);
    }
    if (inProgressRecipesLocal && pathname.includes('foods')) {
      const recipes = JSON.parse(inProgressRecipesLocal);
      const keysFoods = Object.keys(recipes.meals);
      setIsInProgress(keysFoods.some((recipeID) => recipeID === id));
    }
    if (inProgressRecipesLocal && pathname.includes('drinks')) {
      const recipes = JSON.parse(inProgressRecipesLocal);
      const keysDrinks = Object.keys(recipes.cocktails);
      setIsInProgress(keysDrinks.some((recipeID) => recipeID === id));
    }
  }, [history.location, id, isInProgress]);

  function redirect() {
    const { pathname } = history.location;
    if (pathname.includes('foods')) {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  }
  console.log(isVisible);
  console.log(isInProgress);
  return (
    <div>
      {isVisible
        && (
          <button
            style={ {
              marginLeft: '60%',
              position: 'fixed',
              bottom: '0px',
            } }
            className="start-recipe-btn"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ redirect }
          >
            Start Recipe
          </button>
        )}
      {isInProgress
        && (
          <button
            style={ {
              marginLeft: '60%',
              position: 'fixed',
              bottom: '0px',
            } }
            className="start-recipe-btn"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ redirect }

          >
            Continue Recipe
          </button>
        )}
    </div>
  );
}

StartRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default StartRecipeButton;
