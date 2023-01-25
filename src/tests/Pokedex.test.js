import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  // afterEach(cleanup);
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  test('É exibido na tela uma tag h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemonList={ pokemonList }
    />);

    const text = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(text).toBeDefined();
  });
});
