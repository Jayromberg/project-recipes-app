import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';

const renderWithRouter = async (component) => {
  const history = createMemoryHistory();

  const returnFromRender = await act(async () => (render(
    <Router history={ history }>
      {component}
    </Router>,
  )));

  return { ...returnFromRender, history };
};

export default renderWithRouter;
