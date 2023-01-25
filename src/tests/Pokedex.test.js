import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
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
  test('É possível clicar no botão de filtragem All', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemonList={ pokemonList }
    />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeEnabled();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isPokemonFavoriteById }
        pokemonList={ pokemonList }
      />,
    );
    const filterButtons = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(7);

    filterButtons.forEach((e) => {
      const btns = screen.getByRole('button', { name: e });
      expect(btns).toBeInTheDocument();

      userEvent.click(btns);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(e);
    });
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemonList={ pokemonList }
    />);

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(nextButton).toBeEnabled();

    pokemonList.forEach((e) => {
      const pokemonsName = screen.getByText(e.name);
      expect(pokemonsName).toBeDefined();
      userEvent.click(nextButton);
    });
    const firstPokemon = screen.getByText(pokemonList[0].name);
    expect(firstPokemon).toBeDefined();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemonList={ pokemonList }
    />);

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(nextButton).toBeDefined();

    const animalPokemon = screen.getByText(/Pikachu/i);
    expect(animalPokemon).toBeDefined();

    const wrongPokemon = screen.queryByText(/Caterpie/i);
    expect(wrongPokemon).not.toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemonList={ pokemonList }
    />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeEnabled();

    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);
    const dragonPokemon = screen.getByText(/Dragonair/i);
    expect(dragonPokemon).toBeDefined();

    userEvent.click(buttonAll);
    const firstPokemon = screen.getByText(pokemonList[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });
});
