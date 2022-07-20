import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ dataDetail }) {
  const history = useHistory();
  const [isBlackHeart, setIsBlackHeart] = useState(false);

  useEffect(() => {
    const { pathname } = history.location;
    const favoriteRecipesLocal = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesLocal && pathname.includes('foods')) {
      const favoriteList = JSON.parse(favoriteRecipesLocal);
      setIsBlackHeart(favoriteList.some((recipe) => recipe.id === dataDetail[0].idMeal));
    }
    if (favoriteRecipesLocal && pathname.includes('drinks')) {
      const favoriteList = JSON.parse(favoriteRecipesLocal);
      setIsBlackHeart(favoriteList.some((recipe) => recipe.id === dataDetail[0].idDrink));
    }
  }, [dataDetail, history.location]);

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

    setIsBlackHeart(true);
  }

  function removeFavorite() {
    const { pathname } = history.location;
    const favoriteRecipesLocal = localStorage.getItem('favoriteRecipes');
    const favoriteList = JSON.parse(favoriteRecipesLocal);
    if (pathname.includes('foods')) {
      const newFavoriteList = favoriteList
        .filter((recipe) => recipe.id !== dataDetail[0].idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
    } else {
      const newFavoriteList = favoriteList
        .filter((recipe) => recipe.id !== dataDetail[0].idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
    }

    setIsBlackHeart(false);
  }

  return (
    <div>
      { isBlackHeart ? (
        <button
          type="button"
          onClick={ removeFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            alt="blackHeartIcon"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={ saveFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="whiteHeartIcon"
          />
        </button>
      )}
    </div>
  );
}

FavoriteButton.propTypes = {
  dataDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FavoriteButton;
