import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente About.js ', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', async () => {
    const { getByRole } = renderWithRouter(<About />);
    const saveImg = getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(saveImg).not.toBeNull();
    expect(saveImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
