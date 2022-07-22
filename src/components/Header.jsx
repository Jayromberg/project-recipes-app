import React, { useCallback, useEffect, useState } from 'react';
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
  const { pathname } = history.location;

  const isElementVisible = useCallback((router) => {
    switch (router) {
    case '/foods':
      setHeaderState((oldHeaderState) => ({
        ...oldHeaderState,
        title: 'Foods',
      }));
      break;
    case '/drinks':
      setHeaderState((oldHeaderState) => ({
        ...oldHeaderState,
        title: 'Drinks',
      }));
      break;
    case '/profile':
      setHeaderState((oldHeaderState) => ({
        ...oldHeaderState,
        title: 'Profile',
        hasSearch: false,
      }));
      break;
    case '/done-recipes':
      setHeaderState((oldHeaderState) => ({
        ...oldHeaderState,
        title: 'Done Recipes',
        hasSearch: false,
      }));
      break;
    case '/favorite-recipes':
      setHeaderState((oldHeaderState) => ({
        ...oldHeaderState,
        title: 'Favorite Recipes',
        hasSearch: false,
      }));
      break;
    default:
    case '/foods/:id/in-progress':
      setHeaderState((oldHeaderState) => ({
        ...oldHeaderState,
        title: 'In Progress Recipe',
        hasSearch: false,
      }));
      break;
    }
  }, []);

  useEffect(() => {
    isElementVisible(pathname);
  }, [isElementVisible, pathname]);

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
