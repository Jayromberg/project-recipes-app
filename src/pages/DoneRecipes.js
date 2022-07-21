import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../components/ImageSize.css';

function DoneRecipes() {
  const [doneRecipes, setdoneRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [localState, setLocalState] = useState(false);
  const [drink, setDrink] = useState(true);
  const [food, setFood] = useState(true);

  const doneRecipesfromLocal = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setDrink(true);
    setFood(true);
    setLocalState(true);
  }, []);

  useEffect(() => {
    const createArray = () => {
      const addTagArray = doneRecipesfromLocal.map((item) => {
        if (item.type === 'food') {
          const favoriteObj = {
            id: item.id,
            type: item.type,
            nationality: item.nationality,
            category: item.category,
            alcoholicOrNot: item.alcoholicOrNot,
            name: item.name,
            image: item.image,
            tags: item.tags ? item.tags.split(',') : [''],
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
      setdoneRecipes(addTagArray);
      setData(addTagArray);
    };
    createArray();
  }, [localState]);

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

  useEffect(() => {
    if (data) {
      const filters = data.filter((recipe) => {
        if (food && drink) {
          return recipe;
        }
        if (food) {
          return recipe.type === 'food';
        }
        if (drink) {
          return recipe.type === 'drink';
        }
        return recipe;
      });
      setdoneRecipes(filters);
    }
  }, [drink, food]);

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
