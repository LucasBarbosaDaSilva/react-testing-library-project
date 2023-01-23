import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente App.js', () => {
  test('É exibido na tela um link com o texto Home', async () => {
    renderWithRouter(<App />);

    // const home = screen.getByRole('link', {
    //   name: 'Home',
    // });
    // userEvent.click(home);

    screen.getByRole('link', {
      name: /home/i,
    });
  });
  test('É exibido na tela um link com o texto About', async () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(about);

    screen.getByRole('heading', {
      name: /about/i,
    });
  });
  test('É exibido na tela um link com o texto Favorite Pokémon', async () => {
    renderWithRouter(<App />);

    const favorite = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });
    userEvent.click(favorite);

    screen.getByRole('heading', {
      name: /Favorite Pokémon/i,
    });
  });
  test('É redirecionada para a página Not Found', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/testaPáginaDeErro');
    });

    screen.getByRole('heading', {
      name: /Not Found/i,
    });
  });
});
