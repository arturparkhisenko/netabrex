import Octicon, { Markdown } from '@primer/octicons-react';
import React from 'react';

import Logo from '../icons/logo.svg';

export default function App() {
  return (
    <div className="app">
      <div className="app-header">netabrex</div>
      <Logo />
      <span style={{ color: 'red' }}>
        <Octicon icon={Markdown} />
      </span>
      The browser extension to replace browser new Tab
    </div>
  );
}
