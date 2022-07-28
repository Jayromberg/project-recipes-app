import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ index, type, id }) {
  const [wasCopied, setWasCopied] = useState(false);
  const link = useRouteMatch();

  function copyLink() {
    if (type) {
      setWasCopied(true);
      copy(`http://localhost:3000/${type}s/${id}`);
    }
    setWasCopied(true);
    console.log((link.url).split('/')[1]);
    const param1 = (link.url).split('/')[1];
    const param2 = (link.url).split('/')[2];
    copy(`http://localhost:3000/${param1}/${param2}`);
  }

  return (
    <div>
      { type ? (
        <button
          type="button"
          onClick={ copyLink }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share Button"
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
