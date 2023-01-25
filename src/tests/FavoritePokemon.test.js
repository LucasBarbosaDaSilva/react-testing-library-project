import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FavoritePokemon } from '../pages';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente FavoritePokemon.js', () => {
  test('É exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);
    screen.getByText(/No favorite pokémon found/i);
  });
  test('São exibidos na tela apenas os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const homeButton = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeButton);
    const detailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsButton);
    const checkButton = screen.getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    userEvent.click(checkButton);
    const favoritePoke = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favoritePoke);
    screen.getByText(/Electric/i);
    userEvent.click(checkButton);
  });
});
