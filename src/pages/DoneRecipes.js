import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../components/ImageSize.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [localState, setLocalState] = useState(false);
  const [drink, setDrink] = useState(true);
  const [food, setFood] = useState(true);

  useEffect(() => {
    setDrink(true);
    setFood(true);
    setLocalState(true);
  }, []);

  const createArray = useCallback((localStorageData) => {
    const addTagArray = localStorageData && localStorageData.map((item) => {
      if (item.type === 'food') {
        const favoriteObj = {
          id: item.id,
          type: item.type,
          nationality: item.nationality,
          category: item.category,
          name: item.name,
          doneDate: item.doneDate,
          image: item.image,
          tags: item.tags,
        };
        return favoriteObj;
      }
      const favoriteObj = {
        id: item.id,
        type: item.type,
        alcoholicOrNot: item.alcoholicOrNot,
        category: item.category,
        name: item.name,
        image: item.image,
        doneDate: item.doneDate,
      };
      return favoriteObj;
    });
    return addTagArray;
  }, []);

  useEffect(() => {
    const doneRecipesFromLocal = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const newState = createArray(doneRecipesFromLocal);
    setDoneRecipes(newState);
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
    setDoneRecipes(infoData);
  }, [data, filterData]);

  return (
    <div>
      <Header />
      <section>
        <p>doneRecipes</p>
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
        { doneRecipes && doneRecipes.map((item, index) => (
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
                {item.tags.length && item.tags.map((elem, idx) => (
                  idx < 2 && (
                    <p
                      data-testid={ `${index}-${elem}-horizontal-tag` }
                      key={ elem }
                    >
                      {elem}

                    </p>)
                ))}
                <ShareButton index={ index } id={ item.id } type={ item.type } />
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
              </div>)))}
      </section>
    </div>
  );
}

export default DoneRecipes;
