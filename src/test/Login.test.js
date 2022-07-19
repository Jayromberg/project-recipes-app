import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa a página login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return meals;
        }
      },
    }));
  });
  it('testa os elementos presentes na tela e se é possível fazer o login', async () => {
    const emailInputEl = screen.getByTestId('email-input');
    const passwordInputEl = screen.getByTestId('password-input');
    const enterBtnEl = screen.getByTestId('login-submit-btn');

    expect(emailInputEl).toBeInTheDocument();
    expect(passwordInputEl).toBeInTheDocument();
    expect(enterBtnEl).toBeInTheDocument();
    expect(enterBtnEl).toBeDisabled();

    userEvent.type(emailInputEl, 'teste@trybe.com');
    userEvent.type(passwordInputEl, '1234567');
    expect(screen.getByTestId('login-submit-btn')).toBeEnabled();

    userEvent.click(enterBtnEl);

    const foodEl = await screen.findByRole('img', { name: /corba/i });
    expect(foodEl).toBeInTheDocument();
  });
});
