import React, { useCallback, useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

function Foods() {
  const { setIsFood } = useContext(RecipesContext);
  const [withCategory, setWithCategory] = useState(false);

  // https://dmitripavlutin.com/dont-overuse-react-usecallback/
  // https://infinitypaul.medium.com/reactjs-useeffect-usecallback-simplified-91e69fb0e7a3
  const setTrue = useCallback(() => {
    setIsFood(true);
    setWithCategory(false);
  }, [setIsFood, setWithCategory]);

  const setFalse = useCallback(() => {
    setIsFood(false);
  }, [setIsFood]);

  useEffect(() => {
    setTrue();

    return (() => {
      setFalse();
    });
  }, [setFalse, setTrue]);

  return (
    <div>
      <Header />
      <Recipes setWithCategory={ setWithCategory } withCategory={ withCategory } />
      <Footer />
    </div>
  );
}

export default Foods;
