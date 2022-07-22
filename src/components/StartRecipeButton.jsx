import React, { useState, useEffect } from 'react';
// import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function StartRecipeButton({ id }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const link = useHistory();
  // const history = useRouteMatch();

  useEffect(() => {
    const { pathname } = link.location;
    const doneRecipesLocal = localStorage.getItem('doneRecipes');
    const inProgressRecipesLocal = localStorage.getItem('inProgressRecipes');
    if (doneRecipesLocal) {
      const recipes = JSON.parse(inProgressRecipesLocal);
      setIsVisible(recipes.some((recipe) => recipe.id === id));
    }
    if (isInProgress) {
      setIsVisible(false);
    }
    if (inProgressRecipesLocal && pathname.includes('foods')) {
      const recipes = JSON.parse(inProgressRecipesLocal);
      const keysFoods = Object.keys(recipes);
      setIsInProgress(keysFoods.some((recipeID) => recipeID === id));
    }
    if (inProgressRecipesLocal && pathname.includes('drinks')) {
      const recipes = JSON.parse(inProgressRecipesLocal);
      const keysDrinks = Object.keys(recipes);
      setIsInProgress(keysDrinks.some((recipeID) => recipeID === id));
    }
  }, [link.location, id, isInProgress]);

  function redirect() {
    const { pathname } = link.location;
    if (pathname.includes('foods')) {
      link.push(`/foods/${id}/in-progress`);
    } else {
      link.push(`/drinks/${id}/in-progress`);
    }
  }

  return (
    <div>
      {
        isVisible
        && (
          <button
            style={ {
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
        )
      }
      {isInProgress
        && (
          <button
            style={ {
              marginLeft: '600px',
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
