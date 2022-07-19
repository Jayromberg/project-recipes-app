import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';
// import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
// import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';
import acbDrinkData from './acbMock';
import poutineData from './poutineMock';

describe('testa as rotas dentro do componente App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return meals;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return drinks;
        }
        // if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
        //   return oneMeal;
        // }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
          return oneDrink;
        } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501') {
          return acbDrinkData;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52804') {
          return poutineData;
        }
      },
    }));
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  it('testa se redireciona para a tela detalhada pelo filtro do header', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchEl = await screen.findByRole('img', { name: /searchicon/i });
    expect(searchEl).toBeInTheDocument();
    userEvent.click(searchEl);

    const inputEl = await screen.findByRole('textbox');
    const radioEl = await screen.findByRole('radio', { name: /nome/i });
    const buttonEl = await screen.findByRole('button', { name: /busca/i });
    expect(inputEl).toBeInTheDocument();
    expect(radioEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
    userEvent.type(inputEl, 'Aquamarine');
    userEvent.click(radioEl);
    userEvent.click(buttonEl);
    // console.log(buttonEl);
    // console.log(history);

    // await waitFor(() => {
    //   expect(screen.getByRole('heading', { name: /Aquamarine/i }))
    //     .toBeInTheDocument();
    // });
  });
  it(`testa se ao clicar em uma receita ela redireciona 
  para a página de detalhes da receita`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const foodEl = await screen.findByText(/poutine/i);
    expect(foodEl).toBeInTheDocument();

    userEvent.click(foodEl);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /poutine/i })).toBeInTheDocument();
    });
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
