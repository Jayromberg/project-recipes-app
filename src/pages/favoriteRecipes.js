import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

const MOCKfAVORITE = [{
  id: 'id-da-receita',
  type: 'food-ou-drink',
  nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  category: 'categoria-da-receita-ou-texto-vazio',
  alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  name: 'nome-da-receita',
  image: 'imagem-da-receita',
}];

function FavoriteRecipes() {
  // const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //  const favoriteRecipes = MOCKfAVORITE;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [drink, setDrink] = useState(false);
  const [food, setFood] = useState(false);
  const [all, setAll] = useState(true);

  useEffect(() => {
    setDrink(false);
    setFood(false);
    setAll(true);
  }, []);

  const selectAll = () => {
    setAll(true);
    setDrink(false);
    setFood(false);
  };
  const filterFood = () => {
    setFood(true);
    setAll(false);
    setDrink(false);
  };
  const filterDrinks = () => {
    setAll(false);
    setDrink(true);
    setFood(false);
  };
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
        { (all || food) && (favoriteRecipes.map((item, index) => (item
          .type === 'foods'
          && (
            <div key={ item.id }>
              <Link to={ `/foods/${item.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt={ item.name }
                />
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>{item.category}</p>
              <p>{item.nationality}</p>
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
              <FavoriteButton id={ item.id } />
            </div>
          ))))}
        { (all || drink) && (favoriteRecipes.map((item, index) => (item
          .type === 'drinks'
          && (
            <div key={ item.id }>
              <Link to={ `/drinks/${item.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt={ item.name }
                />
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              </Link>
              <p>{item.alcoholicOrNot}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
              <ShareButton index={ index } id={ item.id } type={ item.type } />
              <FavoriteButton id={ item.id } />
            </div>
          )))
        )}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
