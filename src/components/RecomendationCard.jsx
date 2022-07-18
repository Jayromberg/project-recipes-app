import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCard(props) {
  const {
    index,
    strMealThumb,
    strMeal,
    strCategory,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
  } = props;
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      {strMeal ? (
        <div>
          <img
            width="40%"
            height="150"
            src={ strMealThumb }
            alt={ strMeal }
          />
          <p>{strCategory}</p>
          <h4 data-testid={ `${index}-recomendation-title` }>{strMeal}</h4>
        </div>
      ) : (
        <div>
          <img
            width="40%"
            height="150"
            src={ strDrinkThumb }
            alt={ strDrink }
          />
          <p>{strAlcoholic}</p>
          <h4 data-testid={ `${index}-recomendation-title` }>{strDrink}</h4>
        </div>
      )}
    </div>
  );
}

RecomendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strAlcoholic: PropTypes.string.isRequired,
};

export default RecomendationCard;
