import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PropTypes from 'prop-types';
import { useStoreon } from 'storeon/react';
import { ThemeProvider } from '@material-ui/core/styles';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import * as Constants from './constants';
import { Editor } from './editor';
import { Preview } from './preview';
import { Settings } from './settings';
import { createTheme } from './utils';

export function App(props) {
  const { mode, theme } = useStoreon('mode', 'theme');
  let modeText = mode === Constants.MODE_PREVIEW ? 'Edit' : 'Preview';
  let muiTheme = createTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="app">
        <nav className="navigation">
          <Button
            className="navigation__button"
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
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  toggleMode: PropTypes.func.isRequired
};
