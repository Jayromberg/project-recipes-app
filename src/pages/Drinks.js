import React, { useCallback, useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Drinks() {
  const { setIsDrink, withCategory, setWithCategory,
    // toggleCategory, settoggleCategory
  } = useContext(RecipesContext);

  const setTrue = useCallback(() => {
    setIsDrink(true);
    setWithCategory(false);
    // toggleCategory.forEach((item) => (settoggleCategory([item.toggleCategory]: false)));
  }, [setIsDrink, setWithCategory]);

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
      <Recipes setWithCategory={ setWithCategory } withCategory={ withCategory } />
      <Footer />
    </div>
  );
}

export default Drinks;
