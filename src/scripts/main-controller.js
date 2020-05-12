import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { StoreContext } from 'storeon/react';

import * as Constants from './constants';
import { App } from './app';
import { createStore, SET_DARK_MODE } from './store';

export class MainController {
  constructor() {
    this.store = createStore();
    this.theme = createMuiTheme({});

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

  darkModeDidChange(value) {
    let operation = value === true ? 'add' : 'remove';

    document.body.classList[operation]('dark');
  }

  main() {
    ReactDOM.render(
      <React.StrictMode>
        <CssBaseline />
        <StoreContext.Provider value={this.store}>
          <ThemeProvider theme={this.theme}>
            <App toggleMode={this.toggleMode} />
          </ThemeProvider>
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

  triggerInitialState() {
    let state = this.store.get();

    this.darkModeDidChange(state.darkMode);
  }
}
