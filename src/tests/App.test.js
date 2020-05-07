import React from 'react';
import { render } from '@testing-library/react';

import { App } from '../scripts/App';
import { StoreContext } from 'storeon/react';
import { createStore } from './../scripts/store';

let element, Wrapper, store, toggleMode;

beforeEach(() => {
  store = createStore();
  toggleMode = function (){};
  Wrapper = function Wrapper() {
    return (
      <React.StrictMode>
        <StoreContext.Provider value={store}>
          <App toggleMode={toggleMode} />
        </StoreContext.Provider>
      </React.StrictMode>
    );
  };
});

test('renders navigation', () => {
  let { getByTitle } = render(<Wrapper />);
  element = getByTitle(/Preview/i);

  expect(element).toBeInTheDocument();
});

test('renders editor', () => {
  let { getAllByText } = render(<Wrapper />);
  element = getAllByText(/Hello/i);

  expect(element).resolves;
});

test('renders preview', () => {
  store.dispatch('setMode', 'preview');

  let { getAllByText } = render(<Wrapper />);
  element = getAllByText(/Edit/i);

  expect(element).resolves;
});
