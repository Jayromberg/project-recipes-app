import React, { useEffect, useState } from 'react';
// import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientsProgress({ ingredient, measure, done, setDone, id }) {
  // const history = useRouteMatch().path;
  const [get, setGet] = useState([]);
  const onClick = ({ target }) => {
    if (target.checked === true) {
      setDone([...done, target.value]);
    } else {
      const result = done.filter((item) => item !== target.value);
      setDone(result);
    }
  };
  useEffect(() => {
    // const type = history.split(('/'))[1];
    if (done.length === 0 && localStorage.getItem('inProgressRecipes')) {
      if (get.length === 1) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          [id]: done,
        }));
      }
      if (Object.keys(
        JSON.parse(localStorage.getItem('inProgressRecipes')),
      ).includes(id)) {
        setGet(JSON.parse(localStorage.getItem('inProgressRecipes'))[id]);
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...JSON.parse(localStorage.getItem('inProgressRecipes')),
          [id]: done,
        }));
      }
    }
    if (done.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...JSON.parse(localStorage.getItem('inProgressRecipes')),
        [id]: done,
      }));
      setGet(JSON.parse(localStorage.getItem('inProgressRecipes'))[id]);
    }
  }, [done]);
  return (
    <div>
      {console.log(done, get)}
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
    </div>
  );
}

IngredientsProgress.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.array).isRequired,
  measure: PropTypes.arrayOf(PropTypes.array).isRequired,
  done: PropTypes.arrayOf(PropTypes.array).isRequired,
  setDone: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default IngredientsProgress;
