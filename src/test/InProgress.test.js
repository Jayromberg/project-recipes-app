import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import acbDrinkData from './acbMock';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';

describe('testa a página de Progresso', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return drinks;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
          return drinkCategories;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501') {
          return acbDrinkData;
        }
      },
    }));
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  it('testa os elementos da página de Progresso', async () => {
    const drinkEl = await screen.findByText(/abc/i);
    userEvent.click(drinkEl);
    const drinkEl2 = await screen.findByText(/abc/i);
    userEvent.click(drinkEl2);
    const start = await screen.findByText(/Start Recipe/i);
    userEvent.click(start);

    const ingredient01 = await screen.findByText('Amaretto 1/3');
    const ingredient02 = await screen.findByText('Baileys irish cream 1/3');
    const ingredient03 = await screen.findByText('Cognac 1/3');
    const recipe = await screen.findByText('Layered in a shot glass.');
    const finish = await screen.findByText(/Finalizar Receita/i);

    expect(ingredient01).toBeInTheDocument();
    expect(ingredient02).toBeInTheDocument();
    expect(ingredient03).toBeInTheDocument();
    expect(recipe).toBeInTheDocument();
    expect(finish).toBeInTheDocument();
  });
});
