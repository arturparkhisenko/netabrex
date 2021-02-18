import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'storeon/react';

import { App } from './app';
import * as Constants from './constants';
import { createStore, SET_THEME } from './store';

export class MainController {
  constructor() {
    this.store = createStore();

    this.addObservers();
    this.triggerInitialState();
  }

  addObservers() {
    this.store.on('@dispatch', (state, [event, data]) => {
      switch (event) {
        case SET_THEME:
          this.themeDidChange(data);
          break;
        default:
          break;
      }
    });
  }

  main() {
    ReactDOM.render(
      <StrictMode>
        <StoreContext.Provider value={this.store}>
          <App toggleMode={this.toggleMode} />
        </StoreContext.Provider>
      </StrictMode>,
      document.getElementById('root')
    );
  }

  themeDidChange(value) {
    let operation = value === Constants.THEME_DARK ? 'add' : 'remove';

    document.body.classList[operation]('dark');
  }

  toggleMode = () => {
    let mode = Constants.MODE_PREVIEW;
    let state = this.store.get();

    if (state.mode === Constants.MODE_PREVIEW) {
      mode = Constants.MODE_EDITOR;
    }

    this.store.dispatch('setMode', mode);
  };

  triggerInitialState() {
    this.themeDidChange(this.store.get().theme);
  }
}
