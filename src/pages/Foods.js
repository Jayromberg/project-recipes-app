import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

function Foods() {
  const { setIsFood } = useContext(RecipesContext);

  useEffect(() => {
    setIsFood(true);

    return (() => {
      setIsFood(false);
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

export default Foods;
