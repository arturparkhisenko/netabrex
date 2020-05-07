import hljs from 'highlight.js/lib/core';
import markdown from 'highlight.js/lib/languages/markdown';
import PropTypes from 'prop-types';
import React from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import { connectStoreon } from 'storeon/react';

hljs.registerLanguage('markdown', markdown);

// The React Pure Component could not be used there because Simple Code Editor isn't pure
class Editor extends React.Component {
  editorChange = code => this.props.dispatch('setData', code);

  highlight = code => hljs.highlight('markdown', code).value;

  render() {
    return (
      <SimpleCodeEditor
        className="editor"
        highlight={this.highlight}
        onValueChange={this.editorChange}
        placeholder="Type some code…"
        value={this.props.data}
      />
    );
  }
}

Editor.propTypes = {
  data: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const connectedEditor = connectStoreon('data', Editor);

export { connectedEditor as Editor };
