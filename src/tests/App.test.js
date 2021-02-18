import { StrictMode } from 'react';
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
      <StrictMode>
        <StoreContext.Provider value={store}>
          <App toggleMode={toggleMode} />
        </StoreContext.Provider>
      </StrictMode>
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

  let { getAllByTitle } = render(<Wrapper />);
  element = getAllByTitle(/Edit/i);

  expect(element).resolves;
});
