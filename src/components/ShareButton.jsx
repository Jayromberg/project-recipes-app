import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ index, type, id }) {
  const history = useHistory();
  const [wasCopied, setWasCopied] = useState(false);

  function copyLink() {
    const { pathname } = history.location;
    if (type) {
      setWasCopied(true);
      console.log(`http://localhost:3000/${type}/${id}`);
      copy(`http://localhost:3000/${type}/${id}`);
    }
    setWasCopied(true);
    copy(`http://localhost:3000${pathname}`);
  }

  return (
    <div>
      { index ? (
        <button
          type="button"
          onClick={ copyLink }
        >
          <img
            src={ shareIcon }
            alt="Share Button"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={ copyLink }
        >
          <img
            src={ shareIcon }
            data-testid="share-btn"
            alt="Share Button"
          />
        </button>
      ) }
      {wasCopied && (
        <p>Link copied!</p>
      )}
    </div>
  );
}
ShareButton.defaultProps = {
  index: 1,
  type: '',
  id: '',
};

ShareButton.propTypes = {
  index: PropTypes.number,
  type: PropTypes.string,
  id: PropTypes.string,
};
export default ShareButton;
