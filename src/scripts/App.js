import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useStoreon } from 'storeon/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import * as Constants from './constants';
import { Editor } from './editor';
import { Preview } from './preview';
import { Settings } from './settings';

export function App(props) {
  const { dispatch, mode, darkMode } = useStoreon('mode', 'darkMode');
  let modeText = mode === Constants.MODE_PREVIEW ? 'Edit' : 'Preview';
  let theme = useMemo(() => {
    return createMuiTheme({
      palette: { type: darkMode === true ? 'dark' : 'light' }
    });
  }, [darkMode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <nav className="navigation">
          <Button
            className="navigation__button navigation__button-mode"
            onClick={props.toggleMode}
            title={modeText}
          >
            {mode === Constants.MODE_PREVIEW ? (
              <EditOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </Button>

          <Settings />
        </nav>

        {mode === Constants.MODE_PREVIEW ? <Preview /> : <Editor />}
      </ThemeProvider>
    </div>
  );
}

App.propTypes = {
  toggleMode: PropTypes.func.isRequired
};
