import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: '0px' } }>
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          type="image/svg+xml"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Link>
      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          type="image/svg+xml"
          src={ mealIcon }
          alt="mealIcon"
        />
      </Link>

    </footer>
  );
}

export default Footer;
