import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente About.js ', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
  });
});
