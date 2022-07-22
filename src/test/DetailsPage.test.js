import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import acbDrinkData from './acbMock';
import poutineData from './poutineMock';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';

const URL_FOOD = '/foods/52804';
const URL_DRINK = '/drinks/13501';

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
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52804') {
          return poutineData;
        }
      },
    }));
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  it('testa os elementos da página de detalhe', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/drinks');
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
    const { history } = await renderWithRouter(<App />);
    history.push('/drinks');
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
    const { history } = await renderWithRouter(<App />);
    history.push('/drinks');
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

    history.push(URL_DRINK);

    const favBtn2 = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn2);
    const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(getlocal).toEqual([]);
  });
  test('Testa o remover item do favorito', async () => {
    const { history } = await renderWithRouter(<App />);
    const favoriteRecipes = [{
      id: '52804',
      type: 'food',
      nationality: 'Canadian',
      category: 'Miscellaneous',
      alcoholicOrNot: '',
      name: 'Poutine',
      image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    history.push(URL_FOOD);

    const nameFood = await screen.findByRole('heading', { name: /poutine/i });
    const blackHeart = screen.getByRole('img', { name: /blackhearticon/i });
    expect(nameFood).toBeInTheDocument();
    expect(blackHeart).toBeInTheDocument();

    userEvent.click(blackHeart);

    const newLocalStorege = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(newLocalStorege).toEqual([]);
  });
  test('Testa a função copy', async () => {
    // https://cursos.alura.com.br/forum/topico-como-testar-o-que-tem-na-area-de-transferencia-e-um-select-multiplo-150788
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    const { history } = await renderWithRouter(<App />);
    history.push(URL_FOOD);

    const shareButton = await screen.findByRole('img', { name: /share button/i });
    userEvent.click(shareButton);
    expect(shareButton).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52804');
  });
  test('Testa o start', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push(URL_FOOD);

    const startButton = await screen.findByRole('button', { name: /start recipe/i });
    expect(startButton).toBeInTheDocument();

    userEvent.click(startButton);

    expect(history.location.pathname).toBe('/foods/52804/in-progress');
  });
  test('Testa o continue', async () => {
    const inProgressRecipes = {
      meals: {
        52804: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    const { history } = await renderWithRouter(<App />);
    history.push(URL_FOOD);

    const ContinueButton = await screen
      .findByRole('button', { name: /Continue Recipe/i });
    expect(ContinueButton).toBeInTheDocument();
  });
  test('Testa o continue na page drink', async () => {
    const inProgressRecipes = {
      cocktails: {
        13501: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    const { history } = await renderWithRouter(<App />);
    history.push(URL_DRINK);

    const ContinueButton = await screen
      .findByRole('button', { name: /Continue Recipe/i });
    expect(ContinueButton).toBeInTheDocument();
  });
  test('Testa o start não está na tela', async () => {
    const doneRecipes = [{
      id: '13501',
      type: 'drink',
      nationality: '',
      category: 'Shot',
      alcoholicOrNot: 'Alcoholic',
      name: 'ABC',
      image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
      doneDate: '23/6/2020',
      tags: [],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const { history } = await renderWithRouter(<App />);
    history.push(URL_DRINK);

    const nameRecipe = await screen.findByRole('heading', { name: /abc/i });
    expect(nameRecipe).toBeInTheDocument();
    const startButton = screen.queryByRole('button', { name: /start recipe/i });
    expect(startButton).not.toBeInTheDocument();
  });
});
