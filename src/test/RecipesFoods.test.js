import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import beefMeals from '../../cypress/mocks/beefMeals';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import App from '../App';
import dessertMeals from '../../cypress/mocks/dessertMeals';

describe('testa o componente Recipes na página Foods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return meals;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
          return mealCategories;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
          return beefMeals;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') {
          return dessertMeals;
        }
      },
    }));
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  it('testa se aparecem as principais receitas na página foods', async () => {
    const corbaEl = await screen.findByRole('img', { name: /corba/i });
    const kumpirEl = await screen.findByRole('img', { name: /kumpir/i });
    const corbaTextEl = await screen.findByRole('img', { name: /corba/i });
    const kumpirTextEl = await screen.findByText(/kumpir/i);

    await waitFor(() => {
      expect(kumpirEl).toBeInTheDocument();
      expect(corbaEl).toBeInTheDocument();
      expect(corbaTextEl).toBeInTheDocument();
      expect(kumpirTextEl).toBeInTheDocument();
    });
  });
  it('testa se existem 5 botões com 5 categorias e um botão All', async () => {
    const catBtnEl01 = await screen.findByRole('button', { name: /beef/i });
    const catBtnEl02 = await screen.findByRole('button', { name: /breakfast/i });
    const catBtnEl03 = await screen.findByRole('button', { name: /chicken/i });
    const catBtnEl04 = await screen.findByRole('button', { name: /dessert/i });
    const catBtnEl05 = await screen.findByRole('button', { name: /goat/i });
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
    const corbaEl = screen.queryByRole('img', { name: /corba/i });
    expect(corbaEl).toBeInTheDocument();

    const catBtnEl01 = await screen.findByRole('button', { name: /beef/i });
    userEvent.click(catBtnEl01);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /beef and mustard Pie/i }))
        .toBeInTheDocument();
      expect(screen.getByText(/beef and mustard pie/i)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /big mac/i })).toBeInTheDocument();
      expect(corbaEl).not.toBeInTheDocument();
    });

    const allBtn = await screen.findByRole('button', { name: /all/i });
    userEvent.click(allBtn);

    await waitFor(() => {
      expect(screen.queryByRole('img', { name: /beef and mustard pie/i }))
        .not.toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /corba/i })).toBeInTheDocument();
    });
  });
  it('testa o toggle das categorias', async () => {
    const corbaEl = screen.queryByRole('img', { name: /corba/i });
    expect(corbaEl).toBeInTheDocument();
    const catBtnEl04 = await screen.findByRole('button', { name: /dessert/i });

    userEvent.click(catBtnEl04);

    await waitFor(() => {
      expect(screen
        .getByRole('img', { name: /apple & blackberry crumble/i })).toBeInTheDocument();
      expect(screen
        .getByText(/apple & blackberry crumble/i)).toBeInTheDocument();
      expect(corbaEl).not.toBeInTheDocument();
    });

    userEvent.click(catBtnEl04);
    await waitFor(() => {
      expect(screen
        .queryByRole('img', { name: /apple & blackberry crumble/i })).not
        .toBeInTheDocument();
      expect(screen
        .queryByText(/apple & blackberry crumble/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /corba/i })).toBeInTheDocument();
    });
  });
  it(`testa se ao clicar em uma receita ela redireciona 
  para a página de detalhes da receita`, async () => {
    // const { history } = renderWithRouter(<App />);
    // history.push('/foods');
    const foodEl = await screen.findByText(/poutine/i);
    expect(foodEl).toBeInTheDocument();

    userEvent.click(foodEl);

    await waitFor(() => {
      expect(screen.getByText(/fooddetail/i)).toBeInTheDocument();
      // expect(history.location.pathname).toBe('/foods/52804');
    });
  });
});
