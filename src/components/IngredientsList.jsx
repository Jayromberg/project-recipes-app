import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ ingredient, measure }) {
  return (
    <div>
      <ul>
        {ingredient
          .map((item, index) => (
            measure[index]
              ? (
                <li
                  key={ item[0] }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${item[1]} ${measure[index][1]}`}
                </li>
              ) : (
                <li
                  key={ item[0] }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { item[1] }
                </li>
              )
          ))}
      </ul>
    </div>
  );
}

IngredientsList.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.array).isRequired,
  measure: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default IngredientsList;
