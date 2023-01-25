import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente PokemonDetails.js', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsButton);
    const detailsPokemon = screen.getByRole('heading', { level: 2, name: /Pikachu Details/i });
    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i);

    expect(summary).toBeDefined();
    expect(paragraph).toBeDefined();
    expect(detailsButton).not.toBeInTheDocument();
    expect(detailsPokemon).toBeDefined();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsButton);
    const locationNamePokemon = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });

    const pokeImg = screen.getAllByAltText(/Pikachu location/i);
    const imgOne = screen.getByText(/Kanto Viridian Forest/i);
    const imgTwo = screen.getByText(/Kanto Power Plant/i);

    expect(locationNamePokemon).toBeDefined();
    expect(detailsButton).not.toBeInTheDocument();
    expect(pokeImg).toHaveLength(2);
    expect(imgOne).toBeDefined();
    expect(imgTwo).toBeDefined();
    expect(pokeImg[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokeImg[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pokeImg[0].alt).toBe('Pikachu location');
    expect(pokeImg[1].alt).toBe('Pikachu location');
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsButton);
    const checkButton = screen.getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    userEvent.click(checkButton);
    const favoritePoke = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    userEvent.click(checkButton);

    expect(favoritePoke).not.toBeInTheDocument();
  });
});
