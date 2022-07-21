import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente Footer', () => {
  it('testa se o componente Footer não aparece na página de Login', async () => {
    await renderWithRouter(<App />);
    const Footer = screen.queryByTestId('footer');
    expect(Footer).not.toBeInTheDocument();
  });

  it('testa se há um footer na página principal das receitas', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/foods');
    const Footer = screen.queryByTestId('footer');
    expect(Footer).toBeInTheDocument();

    const drinkIcon = screen.getByRole('img', { name: /drinkicon/i });
    const mealIcon = screen.getByRole('img', { name: /mealicon/i });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();

    userEvent.click(drinkIcon);
    expect(await screen.findByText(/gg/i)).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();
  });

  it('testa se há um footer na página principal das receitas', async () => {
    const { history } = await renderWithRouter(<App />);
    history.push('/Drinks');
    const Footer = screen.queryByTestId('footer');
    expect(Footer).toBeInTheDocument();

    const drinkIcon = screen.getByRole('img', { name: /drinkicon/i });
    const mealIcon = screen.getByRole('img', { name: /mealicon/i });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();

    userEvent.click(mealIcon);
    expect(await screen.findByRole('img', { name: /kumpir/i })).toBeInTheDocument();
    expect(await screen.findByText(/kumpir/i)).toBeInTheDocument();
  });
});
