import React from 'react';
import { render } from '@testing-library/react';

import { App } from '../scripts/App';
import { StoreContext } from 'storeon/react';
import { createStore } from './../scripts/store';

let Wrapper;

beforeEach(() => {
  Wrapper = function Wrapper() {
    return (
      <React.StrictMode>
        <StoreContext.Provider value={createStore()}>
          <App toggleMode={() => undefined} />
        </StoreContext.Provider>
      </React.StrictMode>
    );
  };
});

test('renders navigation', () => {
  let { getByTitle } = render(<Wrapper />);
  let element = getByTitle(/Netabrex/i);

  expect(element).toBeInTheDocument();
});

test('renders editor', () => {
  let { getAllByText } = render(<Wrapper />);
  let element = getAllByText(/Hello/i);

  expect(element).resolves;
});
