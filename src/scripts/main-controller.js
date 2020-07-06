import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { StoreContext } from 'storeon/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import * as Constants from './constants';
import { App } from './app';
import { createStore, SET_DARK_MODE } from './store';

export class MainController {
  constructor() {
    this.store = createStore();
    this.themes = {};
    this.theme = this.getTheme();

    // Make sure to bind modal to your appElement @see http://reactcommunity.org/react-modal/accessibility/
    Modal.setAppElement('#root');

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

  getTheme(theme = 'light') {
    let result = this.themes[theme] || null;

    if (result === null) {
      this.themes[theme] = createMuiTheme({ palette: { type: theme } });
      result = this.themes[theme];
    }

    return result;
  }

  darkModeDidChange(value) {
    let operation = value === true ? 'add' : 'remove';
    let theme = value === true ? 'dark' : 'light';

    document.body.classList[operation]('dark');
    this.theme = this.getTheme(theme);
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
