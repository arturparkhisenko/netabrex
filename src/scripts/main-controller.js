import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import * as Constants from './constants';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${Constants.colorLight};
    font-family: ${Constants.fontStack};
    font-size: ${Constants.fontSize};
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`;

export class MainController {
  main() {
    ReactDOM.render(
      <React.StrictMode>
        <GlobalStyle />
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
}
