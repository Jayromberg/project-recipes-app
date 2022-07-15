import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

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
      <Header />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
