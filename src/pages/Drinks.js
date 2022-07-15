import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { setIsDrink } = useContext(RecipesContext);
  useEffect(() => {
    setIsDrink(true);

    return (() => {
      setIsDrink(false);
    });
  }, []);

  return (
    <div>
      <p>DRINKS</p>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
