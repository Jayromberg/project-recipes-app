import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';

const SEARCH_INPUT_ID = 'search-input';
const SEARCH_TOP_BTN_ID = 'search-top-btn';
const INGREDIENT_SEARCH_RADIO_ID = 'ingredient-search-radio';
const NAME_SEARCH_RADIO_ID = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO_ID = 'first-letter-search-radio';
const EXEC_SEARCH_BTN_ID = 'exec-search-btn';
const MOCK_MEALS = meals;
const MOCK_DRINKS = drinks;

describe('Testes do componente SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(async (url) => ({
        json: async () => {
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
            return MOCK_MEALS;
          }
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
            return MOCK_DRINKS;
          }
          if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=onion') {
            return { meals: [{
              idMeal: '52885',
              strMeal: ' Bubble & Squeak',
              strMealThumb: 'https://www.themealdb.com/images/media/meals/xusqvw1511638311.jpg' },
            { idMeal: '52807',
              strMeal: 'Baingan Bharta',
              strMealThumb: 'https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg' },
            { idMeal: '52874',
              strMeal: 'Beef and Mustard Pie',
              strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
            }] };
          }
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=co') {
            return MOCK_MEALS;
          }
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=c') {
            return MOCK_MEALS;
          }
        },
      }));
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  test('Testa se os inputs são visíveis ao acessar a uma pagina', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/foods');
    const searchButton = await screen.findByTestId(SEARCH_TOP_BTN_ID);
    const execSearch = screen.queryByTestId(EXEC_SEARCH_BTN_ID);
    expect(searchButton).toBeInTheDocument();
    expect(execSearch).not.toBeInTheDocument();
    userEvent.click(searchButton);
    expect(screen.getByTestId(EXEC_SEARCH_BTN_ID)).toBeInTheDocument();
  });
  test('Testa a pesquisa do radio ingredient', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/foods');
    const searchButton = await screen.findByTestId(SEARCH_TOP_BTN_ID);
    userEvent.click(searchButton);
    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN_ID);
    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'onion');
    userEvent.click(execSearch);
    expect(await screen.findByText(/bubble & squeak/i)).toBeInTheDocument();
  });
  test('Testa a pesquisa do radio name', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/foods');
    const searchButton = await screen.findByTestId(SEARCH_TOP_BTN_ID);
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN_ID);
    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'co');
    userEvent.click(execSearch);
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
  });
  test('Testa a pesquisa do radio first letter', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/foods');
    const searchButton = await screen.findByTestId(SEARCH_TOP_BTN_ID);
    userEvent.click(searchButton);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    const execSearch = screen.getByTestId(EXEC_SEARCH_BTN_ID);
    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'c');
    userEvent.click(execSearch);
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
  });
});
