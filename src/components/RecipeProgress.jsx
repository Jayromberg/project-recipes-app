import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DetailContext from '../context/DetailContext';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function RecipeProgress() {
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
    if (history.url.includes('foods')) {
      fetchDetailFoods(history.params.id);
    } else {
      fetchDetailDrinks(history.params.id);
    }
  }, []);

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
      <div>
        <FavoriteButton
          dataDetail={ dataDetail }
        />
        <ShareButton />
        {history.url.includes('foods') ? (
          <div>
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
          <div>
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
        <ul>
          {ingredient
            .map((item, index) => (
              measure[index]
                ? (
                  <li
                    key={ item[0] }
                    data-testid={ `data-testid=${index}-ingredient-step` }
                  >
                    {`${item[1]} ${measure[index][1]}`}
                  </li>
                ) : (
                  <li
                    key={ item[0] }
                    data-testid={ `data-testid=${index}-ingredient-step` }
                  >
                    { item[1] }
                  </li>
                )
            ))}
        </ul>
        <p data-testid="instructions">{dataDetail[0].strInstructions}</p>
        {history.url.includes('foods')
        && (
          <div />)}
        <div className="item-wrapper">
          <div
            className="items"
            onWheel={ (event) => {
              if (event.deltaY > 0) {
                event.target.scrollBy(FIVE, 0);
              } else {
                event.target.scrollBy(-FIVE, 0);
              }
            } }
          />
        </div>
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
      </div>)
  );
}

export default RecipeProgress;
