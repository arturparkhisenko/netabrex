import hljs from 'highlight.js';
import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';

export class Code extends PureComponent {
  constructor() {
    super();

    this.elCode = createRef();
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
