import React from 'react';
import PropTypes from 'prop-types';

function IngredientsProgress({ ingredient, measure, done, onClick }) {
  return (
    <div>
      <ul>
        {ingredient
          .map((item, index) => (
            measure[index]
              ? (
                <li
                  key={ item[0] }
                  data-testid={ `data-testid=${index}-ingredient-step` }
                  style={ {
                    textDecoration: done.includes(item[1]) ? 'line-through' : '' } }
                >
                  <input type="checkbox" onClick={ onClick } value={ item[1] } />
                  {`${item[1]} ${measure[index][1]}`}
                </li>
              ) : (
                <li
                  key={ item[0] }
                  data-testid={ `data-testid=${index}-ingredient-step` }
                  style={ {
                    textDecoration: done.includes(item[1]) ? 'line-through' : '' } }
                >
                  <input type="checkbox" onClick={ onClick } value={ item[1] } />
                  { item[1] }
                </li>
              )
          ))}
      </ul>
    </div>
  );
}

IngredientsProgress.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.array).isRequired,
  measure: PropTypes.arrayOf(PropTypes.array).isRequired,
  done: PropTypes.arrayOf(PropTypes.array).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientsProgress;
