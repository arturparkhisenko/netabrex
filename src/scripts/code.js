import hljs from 'highlight.js';
import PropTypes from 'prop-types';
import React from 'react';

export class Code extends React.PureComponent {
  constructor(props) {
    super(props);

    this.elCode = React.createRef();
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.elCode.current);
  }

  render() {
    return (
      <pre>
        <code ref={this.elCode} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}

Code.defaultProps = {
  language: ''
};

Code.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};
