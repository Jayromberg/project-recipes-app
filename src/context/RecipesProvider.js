import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './RecipesContext';

const INICIAL_STATE = {};

function RecipesProvider({ children }) {
  const [state, setState] = useState(INICIAL_STATE);
  const context = {
    state,
  };

  return (
    <recipesContext.Provider value={ context }>
      {children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
