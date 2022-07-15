import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const INICIAL_STATE_HEADER = {
  title: '',
  hasProfile: true,
  hasSearch: true,
  isVisible: false,
  searchText: '',
  searchRadio: '',
};

function Header() {
  const [headerState, setHeaderState] = useState(INICIAL_STATE_HEADER);
  const history = useHistory();

  function isElementVisible() {
    const { pathname } = history.location;
    switch (pathname) {
    case '/foods':
      setHeaderState({
        ...headerState,
        title: 'Foods',
      });
      break;
    case '/drinks':
      setHeaderState({
        ...headerState,
        title: 'Drinks',
      });
      break;
    case '/profile':
      setHeaderState({
        ...headerState,
        title: 'Profile',
        hasSearch: false,
      });
      break;
    case '/done-recipes':
      setHeaderState({
        ...headerState,
        title: 'Done Recipes',
        hasSearch: false,
      });
      break;
    default:
    case '/favorite-recipes':
      setHeaderState({
        ...headerState,
        title: 'Favorite Recipes',
        hasSearch: false,
      });
      break;
    }
  }

  useEffect(() => {
    isElementVisible();
  }, []);

  return (
    <section>
      <h1 data-testid="page-title">{headerState.title}</h1>
      <div>
        {headerState.hasProfile
        && (
          <Link to="/profile">
            <img
              type="image/svg+xml"
              src={ profileIcon }
              alt="profileIcon"
              data-testid="profile-top-btn"
            />
          </Link>)}
        {headerState.hasSearch
        && (
          <button
            type="button"
            onClick={ () => setHeaderState({
              ...headerState,
              isVisible: !headerState.isVisible }) }
          >
            <img
              type="image/svg+xml"
              src={ searchIcon }
              alt="searchIcon"
              data-testid="search-top-btn"
            />
          </button>)}
      </div>
      {headerState.isVisible
      && (
        <div>
          <input
            type="text"
            data-testid="search-input"
            value={ headerState.searchText }
            onChange={ (e) => setHeaderState({
              ...headerState, searchText: e.target.value }) }
          />
          <SearchBar
            setHeaderState={ setHeaderState }
            headerState={ headerState }
          />
        </div>)}
    </section>
  );
}

export default Header;
