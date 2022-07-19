import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import App from '../App';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';

describe('testa o componente Recipes na página Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return drinks;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
          return drinkCategories;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') {
          return cocoaDrinks;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') {
          return cocktailDrinks;
        }
      },
    }));
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('testa se aparecem as principais receitas na página drinks', async () => {
    const drinkGGEl = await screen.findByRole('img', { name: /gg/i });
    const drinkGGTextEl = await screen.findByText(/gg/i);
    const a1El = await screen.findByRole('img', { name: /a1/i });
    const a1TextEl = await screen.findByText(/a1/i);

    await waitFor(() => {
      expect(drinkGGEl).toBeInTheDocument();
      expect(drinkGGTextEl).toBeInTheDocument();
      expect(a1El).toBeInTheDocument();
      expect(a1TextEl).toBeInTheDocument();
    });
  });
  it('testa se existem 5 botões com 5 categorias e um botão All', async () => {
    const catBtnEl01 = await screen.findByRole('button', { name: /ordinary drink/i });
    const catBtnEl02 = await screen.findByRole('button', { name: /cocktail/i });
    const catBtnEl03 = await screen.findByRole('button', { name: /shake/i });
    const catBtnEl04 = await screen.findByRole('button', { name: /other\/unknown/i });
    const catBtnEl05 = await screen.findByRole('button', { name: /cocoa/i });
    const allBtn = await screen.findByRole('button', { name: /all/i });

    expect(catBtnEl01).toBeInTheDocument();
    expect(catBtnEl02).toBeInTheDocument();
    expect(catBtnEl03).toBeInTheDocument();
    expect(catBtnEl04).toBeInTheDocument();
    expect(catBtnEl05).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
  });
  it(`testa se é possível selecionar uma categoria e se o botão All 
  retorna desta categoria`, async () => {
    const drinkGGEl = await screen.findByRole('img', { name: /gg/i });
    expect(drinkGGEl).toBeInTheDocument();

    const catBtnEl05 = await screen.findByRole('button', { name: /cocoa/i });
    userEvent.click(catBtnEl05);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /castillian hot chocolate/i }))
        .toBeInTheDocument();
      expect(screen.getByRole('img', { name: /chocolate beverage/i }))
        .toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /gg/i })).not.toBeInTheDocument();
    });

    const allBtn = await screen.findByRole('button', { name: /all/i });
    userEvent.click(allBtn);

    await waitFor(() => {
      expect(screen.queryByRole('img', { name: /castillian hot chocolate/i }))
        .not.toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /chocolate beverage/i }))
        .not.toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /gg/i })).toBeInTheDocument();
    });
  });
  it('testa o toggle das categorias', async () => {
    const drinkGGEl = await screen.findByRole('img', { name: /gg/i });
    expect(drinkGGEl).toBeInTheDocument();

    const catBtnEl02 = await screen.findByRole('button', { name: /cocktail/i });
    userEvent.click(catBtnEl02);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /155 belmont/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /747 drink/i })).toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /gg/i })).not.toBeInTheDocument();
    });

    userEvent.click(catBtnEl02);
    await waitFor(() => {
      expect(screen.queryByRole('img', { name: /155 belmont/i }))
        .not.toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /747 drink/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /gg/i })).toBeInTheDocument();
    });
  });
});
