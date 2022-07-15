import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <div>
      <object
        type="image/svg+xml"
        data={ profileIcon }
        data-testid="profile-top-btn"
      >
        profile
      </object>
      <object
        type="image/svg+xml"
        data={ searchIcon }
        data-testid="search-top-btn"
      >
        search
      </object>
    </div>
  );
}

export default Header;
