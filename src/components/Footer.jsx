import React from 'react';
import '../images/drinkIcon.svg';

function Footer() {
  return (
    <div data-testid="footer">
      <img
        data-testid="drinks-bottom-btn"
        alt="drinkIcon"
        src="/drinkIcon.svg"
      />
      <img data-testid="food-bottom-btn" alt="Icon" src="/mealIcon.svg" />
    </div>
  );
}

export default Footer;
