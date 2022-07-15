import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const INICIAL_STATE_HEADER = {
  title: null,
  hasProfile: true,
  hasSearch: true,
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
      {headerState.title && <h1 data-testid="page-title">{headerState.title}</h1>}
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
        && <img
          type="image/svg+xml"
          src={ searchIcon }
          alt="searchIcon"
          data-testid="search-top-btn"
        />}
      </div>
    </section>
  );
}

export default Header;
