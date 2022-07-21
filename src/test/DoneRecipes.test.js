import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import acbDrinkData from './acbMock';
import poutineData from './poutineMock';
import meals from '../../cypress/mocks/meals';
import App from '../App';

describe('testa a página de receitas Prontas', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return drinks;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501') {
          return acbDrinkData;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return meals;
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
  it('testa se os elementos aparecem na tela', async () => {
    const doneRecipes = [
      {
        id: '52804',
        type: 'food',
        nationality: 'Canadian',
        category: 'Miscellaneous',
        alcoholicOrNot: '',
        name: 'Poutine',
        image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
        doneDate: '23/06/2020',
        tags: ['UnHealthy', 'Speciality', 'HangoverFood'],
      },
      {
        id: '13501',
        type: 'drink',
        nationality: '',
        category: 'Shot',
        alcoholicOrNot: 'Alcoholic',
        name: 'ABC',
        image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
        doneDate: '21/06/2020',
        tags: [],
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const { history } = await renderWithRouter(<App />);
    history.push('/done-recipes');

    const favFood = await screen.findByText(/poutine/i);
    const nationalityItem = await screen.findByText(/canadian - miscellaneous/i);
    const foodTag = await screen.findByText(/unhealthy/i);
    const foodTag2 = await screen.findByText(/speciality/i);
    const favDrink = await screen.findByText(/abc/i);
    const drinkTag = await screen.findByText(/alcoholic - shot/i);

    expect(favFood).toBeInTheDocument();
    expect(nationalityItem).toBeInTheDocument();
    expect(foodTag).toBeInTheDocument();
    expect(foodTag2).toBeInTheDocument();
    expect(favDrink).toBeInTheDocument();
    expect(drinkTag).toBeInTheDocument();
  });
  it('testa os filtros da página de receitas feitas', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/done-recipes');

    const favFood = await screen.findByText(/poutine/i);
    const favDrink = await screen.findByText(/abc/i);
    expect(favDrink).toBeInTheDocument();
    expect(favFood).toBeInTheDocument();

    const allBtn = await screen.findByRole('button', { name: /all/i });
    const foodBtn = await screen.findByRole('button', { name: /food/i });
    const drinKBtn = await screen.findByRole('button', { name: /drinks/i });

    userEvent.click(foodBtn);
    await waitFor(() => {
      expect(screen.queryByText(/poutine/i)).toBeInTheDocument();
      expect(screen.queryByText(/abc/i)).not.toBeInTheDocument();
    });

    userEvent.click(drinKBtn);
    await waitFor(() => {
      expect(screen.queryByText(/poutine/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/abc/i)).toBeInTheDocument();
    });

    userEvent.click(allBtn);
    await waitFor(() => {
      expect(screen.queryByText(/poutine/i)).toBeInTheDocument();
      expect(screen.queryByText(/abc/i)).toBeInTheDocument();
    });
  });
});
