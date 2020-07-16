import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'storeon/react';
import { ThemeProvider } from '@material-ui/core/styles';

import * as Constants from './constants';
import { App } from './app';
import { createStore, SET_DARK_MODE } from './store';
import { getTheme } from './utils';

export class MainController {
  constructor() {
    this.store = createStore();
    this.theme = getTheme();

    this.addObservers();
    this.triggerInitialState();
  }

  addObservers() {
    this.store.on('@dispatch', (state, [event, data]) => {
      switch (event) {
        case SET_DARK_MODE:
          this.darkModeDidChange(data);
          break;
        default:
          break;
      }
    });
  }

  darkModeDidChange(value) {
    let operation = value === true ? 'add' : 'remove';

    document.body.classList[operation]('dark');
    this.theme = getTheme(value === true ? 'dark' : 'light');

    // FIXME apply the new theme, ther's some weird theme issue if you'll change it dynamically
    this.main();
  }

  main() {
    ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={this.theme}>
          <StoreContext.Provider value={this.store}>
            <App toggleMode={this.toggleMode} />
          </StoreContext.Provider>
        </ThemeProvider>
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

  triggerInitialState() {
    let state = this.store.get();

    this.darkModeDidChange(state.darkMode);
  }
}
