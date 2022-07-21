import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import DetailContext from '../context/DetailContext';

function FavoriteButton({ dataDetail, id, setLocalState, localState, index,
  isfavorite }) {
  const history = useHistory();
  const [isBlackHeart, setIsBlackHeart] = useState(false);
  const { allDatas } = useContext(DetailContext);

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
    if (favoriteRecipesLocal && pathname.includes('favorite-recipes')) {
      setIsBlackHeart(true);
    }
  }, [dataDetail, history.location]);

  function saveFavorite() {
    const { pathname } = history.location;
    localStorage.setItem('allDatas', JSON.stringify(allDatas));

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
    } else if (pathname.includes('drinks')) {
      const newFavoriteList = favoriteList
        .filter((recipe) => recipe.id !== dataDetail[0].idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
    } else {
      const newFavoriteList = favoriteList
        .filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
      setLocalState(!localState);
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
            data-testid={ isfavorite ? `${index}-horizontal-favorite-btn`
              : 'favorite-btn' }
            // data-testid="favorite-btn"
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
            data-testid={ isfavorite ? `${index}-horizontal-favorite-btn`
              : 'favorite-btn' }
            src={ whiteHeartIcon }
            alt="whiteHeartIcon"
          />
        </button>
      )}
    </div>
  );
}

FavoriteButton.defaultProps = {
  dataDetail: [],
  id: '',
  setLocalState: () => {},
  localState: false,
  index: null,
  isfavorite: false,
};

FavoriteButton.propTypes = {
  dataDetail: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
  setLocalState: PropTypes.func,
  localState: PropTypes.bool,
  index: PropTypes.number,
  isfavorite: PropTypes.bool,
};

export default FavoriteButton;
