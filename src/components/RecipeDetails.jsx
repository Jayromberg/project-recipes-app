import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails() {
  const history = useRouteMatch();
  const {
    dataDetail,
    fetchDetailFoods,
    fetchDetailDrinks,
  } = useContext(RecipesContext);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  console.log(history.params.id);

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

  console.log(dataDetail[0]);
  return (
    dataDetail.length > 0 && (
      <div>
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
              <li
                key={ item[0] }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item[1]} ${measure[index][1]}`}
              </li>
            ))}
        </ul>
        <p data-testid="instructions">{dataDetail[0].strInstructions}</p>
        {history.url.includes('foods')
        && (
          <div>
            <iframe
              data-testid="video"
              // width="560"
              // height="315"
              src={ dataDetail[0].strYoutube.replace('watch?v=', 'embed/') }
              title="YouTube video player"
              frameBorder="0"
            />
          </div>)}
        <p data-testid="0-recomendation-card">recomendações</p>
      </div>)
  );
}

export default RecipeDetails;
