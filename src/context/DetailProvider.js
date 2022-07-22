import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import DetailContext from './DetailContext';

function DetailProvider({ children }) {
  const [dataDetail, setDataDetail] = useState([]);
  const [allDatas, setAllDatas] = useState([]);

  const fetchDetailFoods = useCallback(async (id) => {
    const resolve = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await resolve.json();
    if (data) {
      setDataDetail(data.meals);
      setAllDatas((prev) => ([...prev, data.meals[0]]));
    }
  }, []);

  const fetchDetailDrinks = useCallback(async (id) => {
    const resolve = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await resolve.json();
    if (data) {
      setDataDetail(data.drinks);
    }
  }, []);

  const detailContext = {
    dataDetail,
    fetchDetailFoods,
    fetchDetailDrinks,
    allDatas,
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
