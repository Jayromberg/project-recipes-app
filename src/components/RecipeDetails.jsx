import React, { useContext, useEffect, useState } from 'react';
import './RecipeDetails.css';
import { useRouteMatch } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DetailContext from '../context/DetailContext';
import RecomendationCard from './RecomendationCard';
import IngredientsList from './IngredientsList';
import StartRecipeButton from './StartRecipeButton';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function RecipeDetails() {
  const history = useRouteMatch();

  const {
    dataDetail,
    fetchDetailFoods,
    fetchDetailDrinks,
  } = useContext(DetailContext);
  const {
    foodsRecipes,
    drinkRecipes,
  } = useContext(RecipesContext);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    const local = localStorage.getItem('doneRecipes');
    if (local === null || local === '1') {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (history.url.includes('foods')) {
      fetchDetailFoods(history.params.id);
    } else {
      fetchDetailDrinks(history.params.id);
    }
  }, [fetchDetailDrinks, fetchDetailFoods, history.params.id, history.url]);

  useEffect(() => {
    if (dataDetail.length > 0) {
      const strIngredient = Object
        .entries(dataDetail[0]).filter((ing) => ing[1] !== '' && ing[1] !== null)
        .filter((ing) => ing[0].includes('strIngredient'));
      setIngredient(strIngredient);
      const strMeasure = Object
        .entries(dataDetail[0]).filter((ing) => ing[1] !== '' && ing[1] !== null)
        .filter((ing) => ing[0].includes('strMeasure'));
      setMeasure(strMeasure);
    }
  }, [dataDetail]);

  const FIVE = 5;

  return (
    dataDetail.length > 0 && (
      <div className="detailsDiv">
        <FavoriteButton
          dataDetail={ dataDetail }
        />
        <ShareButton />
        {history.url.includes('foods') ? (
          <div className="recipeDiv">
            <img
              width="100%"
              height="600"
              src={ dataDetail[0].strMealThumb }
              alt={ dataDetail[0].strMeal }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{dataDetail[0].strMeal}</h2>
            <h4 data-testid="recipe-category">{dataDetail[0].strCategory}</h4>
          </div>
        ) : (
          <div className="recipeDiv">
            <img
              width="100%"
              height="600"
              src={ dataDetail[0].strDrinkThumb }
              alt={ dataDetail[0].strDrink }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{dataDetail[0].strDrink}</h2>
            <h4 data-testid="recipe-category">{dataDetail[0].strAlcoholic}</h4>
          </div>
        )}
        <IngredientsList
          ingredient={ ingredient }
          measure={ measure }
        />
        <p data-testid="instructions">{dataDetail[0].strInstructions}</p>
        {history.url.includes('foods')
        && (
          <div>
            <iframe
              data-testid="video"
              width="100%"
              height="200"
              src={ dataDetail[0].strYoutube.replace('watch?v=', 'embed/') }
              title="YouTube video player"
              frameBorder="0"
            />
          </div>)}
        <div className="item-wrapper">
          <div
            className="items"
          >
            {history.url.includes('drinks') ? (
              foodsRecipes.filter((_food, index) => index <= FIVE)
                .map((food, index) => (
                  <RecomendationCard
                    key={ food.strMeal }
                    { ...food }
                    index={ index }
                  />
                ))
            ) : (
              drinkRecipes.filter((_food, index) => index <= FIVE)
                .map((drink, index) => (
                  <RecomendationCard
                    key={ drink.strDrink }
                    { ...drink }
                    index={ index }
                  />
                ))
            )}
          </div>
        </div>
        <StartRecipeButton
          id={ history.params.id }
        />
      </div>)
  );
}

export default RecipeDetails;
