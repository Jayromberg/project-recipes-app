import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../components/ImageSize.css';

function FavoriteRecipes() {
  const [data, setData] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [localState, setLocalState] = useState(false);

  const [drink, setDrink] = useState(true);
  const [food, setFood] = useState(true);

  useEffect(() => {
    setDrink(true);
    setFood(true);
    setLocalState(true);
  }, []);

  const createArray = useCallback((localStorageData) => {
    const dataFromLocal = JSON.parse(localStorage.getItem('allDatas')) || [];

    const filterTags = (favorite) => {
      const tags = dataFromLocal.filter((elem) => (elem.idMeal === favorite.id))
        .map((item) => (item.strTags.split(',')));
      return tags[0];
    };

    const addTagArray = localStorageData && localStorageData.map((item) => {
      if (item.type === 'food') {
        const favoriteObj = {
          id: item.id,
          type: item.type,
          nationality: item.nationality,
          category: item.category,
          alcoholicOrNot: item.alcoholicOrNot,
          name: item.name,
          image: item.image,
          tags: filterTags(item) || [],
        };
        return favoriteObj;
      }
      const favoriteObj = {
        id: item.id,
        type: item.type,
        nationality: item.nationality,
        alcoholicOrNot: item.alcoholicOrNot,
        category: item.category,
        name: item.name,
        image: item.image,
      };
      return favoriteObj;
    });
    return addTagArray;
  }, []);

  useEffect(() => {
    const favoriteFromLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newState = createArray(favoriteFromLocal);
    setFavoriteRecipes(newState);
    setData(newState);
  }, [createArray, localState]);

  const selectAll = () => {
    setDrink(true);
    setFood(true);
  };
  const filterFood = () => {
    setFood(true);
    setDrink(false);
  };
  const filterDrinks = () => {
    setDrink(true);
    setFood(false);
  };

  const filterData = useCallback((info) => {
    if (info) {
      const filters = info.filter((recipe) => {
        if (food && drink) {
          return recipe;
        }
        if (food) {
          return recipe.type === 'food';
        }
        return recipe.type === 'drink';
      });
      return filters;
    }
  }, [drink, food]);

  useEffect(() => {
    const infoData = filterData(data);
    setFavoriteRecipes(infoData);
  }, [data, filterData]);

  return (
    <div>
      <Header />
      <section>
        <p>favoriteRecipes</p>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ selectAll }
        >
          All

        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterFood }
        >
          Food

        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterDrinks }
        >
          Drinks

        </button>
        { favoriteRecipes && favoriteRecipes.map((item, index) => (
          item.type === 'food'
            ? (
              <div key={ item.id }>
                <Link
                  to={ `/foods/${item.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt={ item.name }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${item.nationality} - ${item.category} `}

                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
                {item.tags.map((elem, idx) => (
                  idx < 2 && (
                    <p
                      data-testid={ `${index}-${elem}-horizontal-tag` }
                      key={ elem }
                    >
                      {elem}

                    </p>)
                ))}
                <ShareButton index={ index } id={ item.id } type={ item.type } />
                <FavoriteButton
                  id={ item.id }
                  setLocalState={ setLocalState }
                  localState={ localState }
                  index={ index }
                  isfavorite
                />
              </div>
            ) : (
              <div key={ item.id }>
                <Link to={ `/drinks/${item.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt={ item.name }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${item.alcoholicOrNot} - ${item.category}`}

                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
                <ShareButton index={ index } id={ item.id } type={ item.type } />
                <FavoriteButton
                  id={ item.id }
                  index={ index }
                  setLocalState={ setLocalState }
                  localState={ localState }
                  isfavorite
                />
              </div>)))}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
