import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ dataDetail }) {
  const history = useHistory();

  function saveFavorite() {
    const { pathname } = history.location;
    const favoriteRecipesLocal = localStorage.getItem('favoriteRecipes');
    let favoriteObj = null;
    if (pathname.includes('foods')) {
      favoriteObj = {
        id: dataDetail[0].idMeal,
        type: 'food',
        nationality: dataDetail[0].strArea,
        category: dataDetail[0].strCategory,
        alcoholicOrNot: '',
        name: dataDetail[0].strMeal,
        image: dataDetail[0].strMealThumb,
      };
    } else {
      favoriteObj = {
        id: dataDetail[0].idDrink,
        type: 'drink',
        nationality: '',
        category: dataDetail[0].strCategory,
        alcoholicOrNot: dataDetail[0].strAlcoholic,
        name: dataDetail[0].strDrink,
        image: dataDetail[0].strDrinkThumb,
      };
    }

    if (favoriteRecipesLocal) {
      const favoriteList = JSON.parse(favoriteRecipesLocal);
      const newFavoriteList = [...favoriteList, favoriteObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteObj]));
    }
  }

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ saveFavorite }
      >
        <img src={ whiteHeartIcon } alt="Heart Icon" />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  dataDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FavoriteButton;
