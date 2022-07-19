import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';
// import mealCategories from '../../cypress/mocks/mealCategories';
// import beefMeals from '../../cypress/mocks/beefMeals';
import drinks from '../../cypress/mocks/drinks';
// import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';
import { acbDrinkData, burekData, poutineData } from './Mocks';

describe('testa as rotas dentro do componente App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return meals;
        }
        // if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        //   return mealCategories;
        // }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return drinks;
        }
        // if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        //   return drinkCategories;
        // }
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53060') {
          return burekData;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52804') {
          return poutineData;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=13501') {
          return acbDrinkData;
        }
      },
    }));
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  it('testa se redireciona para a tela detalhada pelo filtro do header', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchEl = await screen.findByRole('img', { name: /searchicon/i });
    expect(searchEl).toBeInTheDocument();
    userEvent.click(searchEl);

    const inputEl = await screen.findByRole('textbox');
    const radioEl = await screen.findByRole('radio', { name: /nome/i });
    const buttonEl = await screen.findByRole('button', { name: /busca/i });
    expect(inputEl).toBeInTheDocument();
    expect(radioEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
    userEvent.type(inputEl, 'burek');
    userEvent.click(radioEl);
    userEvent.click(buttonEl);

    // await waitFor(() => {
    //   expect(screen.getByText(/fooddetail/i)).toBeInTheDocument();
    // });
  });
  it(`testa se ao clicar em uma receita ela redireciona 
  para a página de detalhes da receita`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const foodEl = await screen.findByText(/poutine/i);
    expect(foodEl).toBeInTheDocument();

    userEvent.click(foodEl);

    // await waitFor(() => {
    //   expect(screen.getByText(/fooddetail/i)).toBeInTheDocument();
    //   // expect(history.location.pathname).toBe('/foods/52804');
    // });
  });
  it(`testa se ao clicar em uma receita ela redireciona 
  para a página de detalhes da receita`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const drinlEl = await screen.findByText(/abc/i);
    expect(drinlEl).toBeInTheDocument();

    userEvent.click(drinlEl);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /abc/i })).toBeInTheDocument();
    });
  });
});
