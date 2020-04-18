import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'storeon/react';

import App from './app';
import { createStore } from './store';

export class MainController {
  constructor() {
    this.store = createStore();
  }

  main() {
    ReactDOM.render(
      <React.StrictMode>
        <StoreContext.Provider value={this.store}>
          <App />
        </StoreContext.Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}
