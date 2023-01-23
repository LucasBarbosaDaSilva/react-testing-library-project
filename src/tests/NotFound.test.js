import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente NotFound.js', () => {
  test('É exibido na tela um h2 com o texto Page requested not found', () => {
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
