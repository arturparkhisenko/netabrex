import { Button } from 'reakit/Button';
import Octicon, { Markdown, Pencil } from '@primer/octicons-react';
import PropTypes from 'prop-types';
import React from 'react';
import { useStoreon } from 'storeon/react';

import * as Constants from './constants';
import { Editor } from './editor';
import Logo from '../icons/logo.svg';
import { Preview } from './preview';

export function App(props) {
  const { dispatch, mode } = useStoreon('mode');
  let modeText = mode === Constants.MODE_PREVIEW ? 'Edit' : 'Preview';

  return (
    <div className="app">
      <nav className="navigation">
        <Button
          className="button navigation-button"
          onClick={props.toggleMode}
          title={modeText}
        >
          <Octicon
            icon={mode === Constants.MODE_PREVIEW ? Pencil : Markdown}
            aria-hidden="true"
          />
          &nbsp;
          {modeText}
        </Button>

        <a
          className="logo navigation-button"
          href="https://arturparkhisenko.github.io/netabrex/"
          rel="noopener noreferrer"
          target="_blank"
          title="Netabrex"
        >
          <Logo />
        </a>
      </nav>

      {mode === Constants.MODE_PREVIEW ? <Preview /> : <Editor />}
    </div>
  );
}

App.propTypes = {
  toggleMode: PropTypes.func.isRequired
};
