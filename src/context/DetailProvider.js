import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailContext from './DetailContext';

function DetailProvider({ children }) {
  const [dataDetail, setDataDetail] = useState([]);

  const fetchDetailFoods = async (id) => {
    const resolve = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await resolve.json();
    setDataDetail(data.meals);
  };

  const fetchDetailDrinks = async (id) => {
    const resolve = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await resolve.json();
    setDataDetail(data.drinks);
  };

  const detailContext = {
    dataDetail,
    fetchDetailFoods,
    fetchDetailDrinks,
  };

  return (
    <DetailContext.Provider value={ detailContext }>
      {children}
    </DetailContext.Provider>
  );
}

DetailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailProvider;
