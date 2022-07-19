import React from 'react';
import './RecomendationCard.css';
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
    <div
      className="item"
      data-testid={ `${index}-recomendation-card` }
    >
      {strMeal ? (
        <>
          <img
            src={ strMealThumb }
            alt={ strMeal }
          />
          <p>{strCategory}</p>
          <h4 data-testid={ `${index}-recomendation-title` }>{strMeal}</h4>
        </>
      ) : (
        <>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
          />
          <p>{strAlcoholic}</p>
          <h4 data-testid={ `${index}-recomendation-title` }>{strDrink}</h4>
        </>
      )}
    </div>
  );
}

RecomendationCard.defaultProps = {
  strMealThumb: '',
  strMeal: '',
  strCategory: '',
  strDrinkThumb: '',
  strDrink: '',
  strAlcoholic: '',
};

RecomendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  strMealThumb: PropTypes.string,
  strMeal: PropTypes.string,
  strCategory: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strDrink: PropTypes.string,
  strAlcoholic: PropTypes.string,
};

export default RecomendationCard;
