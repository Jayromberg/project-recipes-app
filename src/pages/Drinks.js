import React, { useCallback, useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Drinks() {
  const { setIsDrink, setWithCategory, setAll,
  } = useContext(RecipesContext);

  const setTrue = useCallback(() => {
    setIsDrink(true);
    setAll(true);
    setWithCategory(false);
  }, [setIsDrink, setWithCategory, setAll]);

  const setFalse = useCallback(() => {
    setIsDrink(false);
  }, [setIsDrink]);

  useEffect(() => {
    setTrue();

    return (() => {
      setFalse();
    });
  }, [setTrue, setFalse]);

  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
