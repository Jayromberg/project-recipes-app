import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import DetailContext from '../context/DetailContext';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import Header from './Header';
import IngredientsProgress from './IngredientsProgress';

function RecipeProgress() {
  const history = useRouteMatch();

  const {
    dataDetail,
    fetchDetailFoods,
    fetchDetailDrinks,
  } = useContext(DetailContext);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [done, setDone] = useState([]);

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

  const onClick = ({ target }) => {
    if (target.checked === true) {
      setDone([...done, target.value]);
    } else {
      const result = done.filter((item) => item !== target.value);
      setDone(result);
    }
  };

  return (
    dataDetail.length > 0 && (
      <div>
        <Header />
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
        <IngredientsProgress
          ingredient={ ingredient }
          measure={ measure }
          onClick={ onClick }
          done={ done }
        />
        <p data-testid="instructions">{dataDetail[0].strInstructions}</p>
        <div className="item-wrapper">
          <div
            className="items"
          />
        </div>
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
      </div>)
  );
}

export default RecipeProgress;
