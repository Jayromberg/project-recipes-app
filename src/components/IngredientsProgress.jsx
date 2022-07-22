import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientsProgress({ ingredient, measure, done, setDone, id, type }) {
  const [get, setGet] = useState([]);
  const [object, setObject] = useState({});
  const [counter, setCounter] = useState(0);
  const [redirect, setRedirect] = useState(false);
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
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ counter !== ingredient.length }
        onClick={ () => setRedirect(true) }
        // style={ {
        //   marginLeft: '600px',
        //   position: 'fixed',
        //   bottom: '0px',
        // } }
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
};

export default IngredientsProgress;
