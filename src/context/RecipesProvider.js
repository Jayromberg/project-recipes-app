import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './RecipesContext';

const INICIAL_STATE = {};

function RecipesProvider({ Children }) {
  const [state, setState] = useState(INICIAL_STATE);
  const context = {
    state,
  };

  return (
    <recipesContext.Provider value={ context }>
      {Children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  Children: PropTypes.node.isRequired,
};

export default RecipesProvider;
