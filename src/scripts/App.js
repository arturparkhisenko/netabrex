import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { useStoreon } from 'storeon/react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

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
          {mode === Constants.MODE_PREVIEW ? (
            <EditOutlinedIcon />
          ) : (
            <VisibilityOutlinedIcon />
          )}
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
