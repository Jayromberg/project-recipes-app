import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Profile from '../pages/Profile';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('testa o componente Profile', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return meals;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
          return mealCategories;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return drinks;
        }
      },
    }));
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  it('testa se os componente aparecem na tela ', () => {
    renderWithRouter(<Profile />);
    const profileIcon = screen.getByRole('img', { name: /profileicon/i });
    const doneRecipeButton = screen.getByRole('button', { name: /done recipes/i });
    const favoriteRecipeBtn = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    const drinkicon = screen.getByRole('img', { name: /drinkicon/i });
    const mealIcon = screen.getByRole('img', { name: /mealicon/i });

    expect(profileIcon).toBeInTheDocument();
    expect(doneRecipeButton).toBeInTheDocument();
    expect(favoriteRecipeBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(drinkicon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
  it('testa se é possível redirecionar para a página foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Profile');

    const mealIcon = screen.getByRole('img', { name: /mealicon/i });
    userEvent.click(mealIcon);

    await waitFor(() => {
      const corbaEl = screen.getByRole('img', { name: /corba/i });
      expect(corbaEl).toBeInTheDocument();
    });
  });

  it('testa se é possível redirecionar para a página drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Profile');

    const drinkicon = screen.getByRole('img', { name: /drinkicon/i });
    userEvent.click(drinkicon);

    await waitFor(() => {
      const drinkGGEl = screen.getByRole('img', { name: /gg/i });
      expect(drinkGGEl).toBeInTheDocument();
    });
  });
  it('testa se é possível redirecionar para a página done Recipes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Profile');

    const doneRecipeButton = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneRecipeButton);

    await waitFor(() => {
      const titleEl = screen.getByRole('heading', { name: /done recipes/i });
      expect(titleEl).toBeInTheDocument();
    });
  });
  it('testa se é possível redirecionar para a página favorite Recipes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Profile');

    const favoriteRecipeBtn = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favoriteRecipeBtn);

    await waitFor(() => {
      const titleEl = screen.getByRole('heading', { name: /favorite recipes/i });
      expect(titleEl).toBeInTheDocument();
    });
  });
  it('testa se é possível redirecionar para a página logout', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Profile');

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);

    await waitFor(() => {
      const emailInputEl = screen.getByTestId('email-input');
      const passwordInputEl = screen.getByTestId('password-input');
      const enterBtnEl = screen.getByTestId('login-submit-btn');
      expect(emailInputEl).toBeInTheDocument();
      expect(passwordInputEl).toBeInTheDocument();
      expect(enterBtnEl).toBeInTheDocument();
    });
  });
  it('testa se o email do login aparece na tela', async () => {
    renderWithRouter(<App />);
    const emailInputEl = screen.getByTestId('email-input');
    const passwordInputEl = screen.getByTestId('password-input');
    const enterBtnEl = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInputEl, 'teste@trybe.com');
    userEvent.type(passwordInputEl, '1234567');
    userEvent.click(enterBtnEl);

    const profileIcon = await screen.findByRole('img', { name: /profileicon/i });
    userEvent.click(profileIcon);

    const emailEl = await screen.findByText('teste@trybe.com');
    expect(emailEl).toBeInTheDocument();
  });
});
