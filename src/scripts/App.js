import { Text } from '@primer/components';
import Octicon, { Markdown } from '@primer/octicons-react';
import React from 'react';
import styled from 'styled-components';

import Logo from '../icons/logo.svg';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppHeader = styled.div`
  text-align: center;
`;

function App() {
  return (
    <AppWrapper>
      <AppHeader>netabrex</AppHeader>
      <Logo />
      <Octicon icon={Markdown} />
      <Text>The browser extension to replace browser new Tab</Text>
    </AppWrapper>
  );
}

export default App;
