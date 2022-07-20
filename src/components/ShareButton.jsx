import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
  const history = useHistory();
  const [wasCopied, setWasCopied] = useState(false);

  function copyLink() {
    const { pathname } = history.location;
    setWasCopied(true);
    copy(`http://localhost:3000${pathname}`);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLink }
      >
        <img src={ shareIcon } alt="Share Button" />
      </button>
      {wasCopied && (
        <p>Link copied!</p>
      )}
    </div>
  );
}

export default ShareButton;
