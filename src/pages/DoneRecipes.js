import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

const MOCKDONE = [{
  id: '1234',
  type: 'foods',
  nationality: 'nacionalidade',
  category: 'categoria-da-receita',
  alcoholicOrNot: '',
  name: 'Comida Massas',
  image: 'httpss%3A%2F%2Fwww.remesM&djVAAAAAB0AAAAAEAc',
  doneDate: 'feita em 30/10',
  tags: ['facil', 'deliciosa', 'servem 4'],
}, {
  id: '5678',
  type: 'drinks',
  nationality: 'frança',
  category: '',
  alcoholicOrNot: 'alcoholic',
  name: 'batida de vinho',
  image: 'https://www.tudoreceitas.com/receita-de-batida-de-vinho-com-leite-condensado-9825.html',
  doneDate: 'feita em junho',
  tags: ['array-de-tags-da-receita', 'ou-array-vazio'],
}];

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [drink, setDrink] = useState(false);
  const [food, setFood] = useState(false);
  const [all, setAll] = useState(true);
  // const doneRecipes = MOCKDONE;

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
        <p>DoneRecipes</p>
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
        { (all || food) && (doneRecipes.map((item, index) => (item.type === 'foods' && (
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
          </div>
        ))))}
        { (all || drink) && (doneRecipes.map((item, index) => (item.type === 'drinks' && (
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
          </div>
        )))
        )}
      </section>
    </div>
  );
}

export default DoneRecipes;
