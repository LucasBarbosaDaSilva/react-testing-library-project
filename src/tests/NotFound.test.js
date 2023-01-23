import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente NotFound.js', () => {
  test('É exibido na tela uma tag h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    screen.getByRole('heading', { level: 2, name: /Page requested not found/i });
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', async () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const saveImg = getByRole('img', { src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif' });
    expect(saveImg).not.toBeNull();
    expect(saveImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
