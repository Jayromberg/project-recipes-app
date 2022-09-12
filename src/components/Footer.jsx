import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ { position: 'fixed', bottom: '0px' } }
      className="Footer"
    >
      <Link to="/drinks">
        <img
          className="links"
          data-testid="drinks-bottom-btn"
          type="image/svg+xml"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Link>
      <Link to="/foods">
        <img
          className="links"
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
