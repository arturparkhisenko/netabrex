import { Button } from 'reakit/Button';
import Octicon, { Markdown, Pencil } from '@primer/octicons-react';
import PropTypes from 'prop-types';
import React from 'react';
import { useStoreon } from 'storeon/react';

import { Clock } from './clock';
import * as Constants from './constants';
import { Editor } from './editor';
import { Preview } from './preview';
import { Settings } from './settings';

export function App(props) {
  const { dispatch, mode } = useStoreon('mode');
  let modeText = mode === Constants.MODE_PREVIEW ? 'Edit' : 'Preview';

  return (
    <div className="app">
      <nav className="navigation">
        <Button
          className="button navigation__button navigation__button-mode"
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

        <Settings />
      </nav>

      <Clock />

      {mode === Constants.MODE_PREVIEW ? <Preview /> : <Editor />}
    </div>
  );
}

App.propTypes = {
  toggleMode: PropTypes.func.isRequired
};
