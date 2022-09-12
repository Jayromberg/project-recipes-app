import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RecipeDetails.css';

function IngredientsProgress({ ingredient, measure, done, setDone, id, type,
  dataDetail }) {
  const [get, setGet] = useState([]);
  const [object, setObject] = useState({});
  const [counter, setCounter] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [disabledBtn, setDisableBtn] = useState(true);
  const onClick = ({ target }) => {
    if (target.checked === true) {
      setCounter(counter + 1);
      setDone([...done, target.value]);
    } else {
      setCounter(counter - 1);
      const result = done.filter((item) => item !== target.value);
      setDone(result);
    }
  };

  useEffect(() => {
    setObject(
      {
        cocktails: {},
        meals: {},
      },
    );
    if (done.length === 0 && localStorage.getItem('inProgressRecipes')) {
      if (get.length === 1) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...object, [type]: { ...object[type], [id]: done },
        }));
      }
      if (Object.keys(JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      )[type]).includes(id)) {
        setGet(JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id]);
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...JSON.parse(localStorage.getItem('inProgressRecipes')),
          [type]: {
            ...JSON.parse(localStorage.getItem('inProgressRecipes'))[type], [id]: done },
        }));
      }
    }
    if (done.length > 0 && !localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...object, [type]: { ...object[type], [id]: done } },
      ));
      setGet(JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id]);
    }
    if (done.length > 0 && localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...JSON.parse(localStorage.getItem('inProgressRecipes')),
        [type]: {
          ...JSON.parse(localStorage.getItem('inProgressRecipes'))[type], [id]: done },
      }));
      setGet(JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id]);
    }
  }, [done]);

  useEffect(() => {
    const getinProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (getinProgressRecipes.meals[id] && getinProgressRecipes.meals[id]
      .length !== ingredient.length) {
      setDisableBtn(true);
    }
    if (getinProgressRecipes.cocktails[id] && getinProgressRecipes
      .cocktails[id].length !== ingredient.length) {
      setDisableBtn(true);
    }
    if (getinProgressRecipes.meals[id] && getinProgressRecipes.meals[id]
      .length === ingredient.length) {
      setDisableBtn(false);
    }
    if (getinProgressRecipes.cocktails[id] && getinProgressRecipes
      .cocktails[id].length === ingredient.length) {
      setDisableBtn(false);
    }
  });

  const SaveRecipe = () => {
    const getinProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || [];

    if (getinProgressRecipes.meals[id]) {
      const obj = {
        id: dataDetail[0].idMeal,
        type: 'food',
        nationality: dataDetail[0].strArea,
        category: dataDetail[0].strCategory,
        name: dataDetail[0].strMeal,
        image: dataDetail[0].strMealThumb,
        doneDate: '01/01/2022',
        tags: [dataDetail[0].strTags || ''],
      };

      const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      const newDones = [...getDoneRecipes, obj];
      localStorage.setItem('doneRecipes', JSON.stringify(newDones));
    }
    if (getinProgressRecipes.cocktails[id]) {
      const obj = {
        id: dataDetail[0].idDrink,
        type: 'drink',
        category: dataDetail[0].strCategory,
        alcoholicOrNot: dataDetail[0].strAlcoholic,
        name: dataDetail[0].strDrink,
        image: dataDetail[0].strDrinkThumb,
        doneDate: '01/01/2022',
      };
      const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const newArray = [...getDoneRecipes, obj];
      localStorage.setItem('doneRecipes', JSON.stringify(newArray));
    }
    setRedirect(true);
  };

  return (
    <div>
      {
        ingredient
          .map((item, index) => (
            measure[index]
              ? (
                <li
                  key={ item[0] }
                  data-testid={ `${index}-ingredient-step` }
                  style={ {
                    textDecoration: get.includes(item[1]) ? 'line-through' : '',
                  } }
                >
                  <input
                    type="checkbox"
                    onClick={ onClick }
                    value={ item[1] }
                    checked={
                      get.some((ingr) => ingr === item[1])
                    }
                  />
                  {`${item[1]} ${measure[index][1]}`}
                </li>

              ) : (
                <li
                  key={ item[0] }
                  data-testid={ `${index}-ingredient-step` }
                  style={ {
                    textDecoration: get.includes(item[1]) ? 'line-through' : '',
                  } }
                >
                  <input
                    type="checkbox"
                    onClick={ onClick }
                    value={ item[1] }
                    checked={
                      get.some((ingr) => ingr === item[1])
                    }

                  />
                  { item[1] }
                </li>
              )
          ))
      }
      <button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabledBtn }
        onClick={ () => SaveRecipe() }
      >
        Finalizar Receita
      </button>
      {redirect && <Redirect to="/done-recipes" />}

    </div>
  );
}

IngredientsProgress.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.array).isRequired,
  measure: PropTypes.arrayOf(PropTypes.array).isRequired,
  done: PropTypes.arrayOf(PropTypes.array).isRequired,
  setDone: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  dataDetail: PropTypes.arrayOf(Object).isRequired,
};

export default IngredientsProgress;
