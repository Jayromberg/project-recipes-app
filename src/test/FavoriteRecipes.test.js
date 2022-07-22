import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import acbDrinkData from './acbMock';
import poutineData from './poutineMock';
import meals from '../../cypress/mocks/meals';
import App from '../App';

describe('testa o componente de receitas Favoritas', () => {
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
    const { history } = await renderWithRouter(<App />);
    history.push('/favorite-recipes');
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('testa se é possível favoritar uma bebiba e uma comida', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/foods');

    const foodEl = await screen.findByText(/poutine/i);
    expect(foodEl).toBeInTheDocument();
    userEvent.click(foodEl);

    const poutine = await screen.findByText(/poutine/i);
    expect(poutine).toBeInTheDocument();

    const ShareButton = await screen.findByRole('img', { name: /whitehearticon/i });
    userEvent.click(ShareButton);

    history.push('/drinks');

    const drinlEl = await screen.findByText(/abc/i);
    userEvent.click(drinlEl);

    const ShareDrinkBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(ShareDrinkBtn);

    history.push('/favorite-recipes');
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

  it('testa os filtros da página de favoritos', async () => {
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

  it('testa se é possível desfavoritar a receita', async () => {
    const favFood = await screen.findByText(/poutine/i);
    const favDrink = await screen.findByText(/abc/i);
    expect(favDrink).toBeInTheDocument();
    expect(favFood).toBeInTheDocument();

    const favFoodBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    userEvent.click(favFoodBtn);

    await waitFor(() => {
      expect(screen.queryByText(/poutine/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/abc/i)).toBeInTheDocument();
    });

    const favDrinkBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    userEvent.click(favDrinkBtn);

    await waitFor(() => {
      expect(screen.queryByText(/poutine/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/abc/i)).not.toBeInTheDocument();
    });
  });

  test('Testa o remover item do favorito', async () => {
    const favoriteRecipes = [{
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const nameFood = await screen.findByText(/spicy arrabiata penne/i);
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

    const favoriteRecipes = [{
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const shareButton = await screen.findByRole('img', { name: /share button/i });
    userEvent.click(shareButton);
    expect(shareButton).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/favorite-recipes');
  });
});
