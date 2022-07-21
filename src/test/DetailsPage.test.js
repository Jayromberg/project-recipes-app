import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import acbDrinkData from './acbMock';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';
// import RecipeDetails, { drinkRecipes } from '../components/RecipeDetails';

describe('testa a página de detalhes', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) => ({
      json: async () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return drinks;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return meals;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
          return drinkCategories;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501') {
          return acbDrinkData;
        }
      },
    }));

    const { history } = await renderWithRouter(<App />);
    history.push('/drinks');
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  it('testa os elementos da página de detalhe', async () => {
    const drinkEl = await screen.findByText(/abc/i);
    userEvent.click(drinkEl);

    const ingredient01 = await screen.findByText('Amaretto 1/3');
    const ingredient02 = await screen.findByText('Baileys irish cream 1/3');
    const ingredient03 = await screen.findByText('Cognac 1/3');
    const recipe = await screen.findByText('Layered in a shot glass.');

    expect(ingredient01).toBeInTheDocument();
    expect(ingredient02).toBeInTheDocument();
    expect(ingredient03).toBeInTheDocument();
    expect(recipe).toBeInTheDocument();
  });
  it('testa o card de recomendações', async () => {
    const drinkEl = await screen.findByText(/abc/i);
    userEvent.click(drinkEl);

    const recomedantion0 = await screen.findByTestId('0-recomendation-card');
    const recomedantion1 = screen.getByTestId('1-recomendation-card');
    const recomedantion2 = screen.queryByTestId('2-recomendation-card');
    const recomedantion3 = screen.getByTestId('3-recomendation-card');
    const recomedantion4 = screen.getByTestId('4-recomendation-card');
    const recomedantion5 = screen.getByTestId('5-recomendation-card');
    expect(recomedantion0).toBeInTheDocument();
    expect(recomedantion1).toBeInTheDocument();
    expect(recomedantion2).toBeInTheDocument();
    expect(recomedantion3).toBeInTheDocument();
    expect(recomedantion4).toBeInTheDocument();
    expect(recomedantion5).toBeInTheDocument();
  });
  it('testa se é possível favoritar uma receita', async () => {
    const local = {
      alcoholicOrNot: 'Alcoholic',
      category: 'Shot',
      id: '13501',
      image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
      name: 'ABC',
      nationality: '',
      type: 'drink',
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([local]));
    const { history } = await renderWithRouter(<App />);

    history.push('/drinks/13501');

    const favBtn2 = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn2);
    const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(getlocal).toEqual([]);
  });
});
