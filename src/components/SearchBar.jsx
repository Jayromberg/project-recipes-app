import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ setHeaderState, headerState }) {
  const { fetchFoodsOrDrinksRecipesFilter } = useContext(RecipesContext);
  const history = useHistory();

  function searchClick() {
    const { searchRadio, searchText } = headerState;
    const { pathname } = history.location;
    fetchFoodsOrDrinksRecipesFilter(searchRadio, searchText, pathname);
  }

  return (
    <div>
      <form>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            id="ingredient-search-radio"
            name="searchRadio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ (e) => setHeaderState({
              ...headerState, searchRadio: e.target.value }) }
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            id="name-search-radio"
            name="searchRadio"
            value="name"
            data-testid="name-search-radio"
            onChange={ (e) => setHeaderState({
              ...headerState, searchRadio: e.target.value }) }
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            id="first-letter-search-radio"
            name="searchRadio"
            value="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ (e) => setHeaderState({
              ...headerState, searchRadio: e.target.value }) }
          />
          Primeira Letra
        </label>
      </form>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ searchClick }
        >
          Busca
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  setHeaderState: PropTypes.func.isRequired,
  headerState: PropTypes.shape({
    title: PropTypes.string,
    hasProfile: PropTypes.bool,
    hasSearch: PropTypes.bool,
    isVisible: PropTypes.bool,
    searchText: PropTypes.string,
    searchRadio: PropTypes.string,
  }).isRequired,
};

export default SearchBar;
