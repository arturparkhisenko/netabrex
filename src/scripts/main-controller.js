import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { StoreContext } from 'storeon/react';

import * as Constants from './constants';
import { App } from './app';
import { createStore } from './store';

export class MainController {
  constructor() {
    this.store = createStore();

    // Make sure to bind modal to your appElement @see http://reactcommunity.org/react-modal/accessibility/
    Modal.setAppElement('#root');
  }

  main() {
    ReactDOM.render(
      <React.StrictMode>
        <StoreContext.Provider value={this.store}>
          <App toggleMode={this.toggleMode} />
        </StoreContext.Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  toggleMode = () => {
    let mode = Constants.MODE_PREVIEW;
    let state = this.store.get();

    if (state.mode === Constants.MODE_PREVIEW) {
      mode = Constants.MODE_EDITOR;
    }

    this.store.dispatch('setMode', mode);
  };
}
