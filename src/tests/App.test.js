import React from 'react';
import { render } from '@testing-library/react';

import App from '../scripts/App';

test('renders content', () => {
  const { getByText } = render(<App />);
  const element = getByText(/netabrex/i);

  expect(element).toBeInTheDocument();
});
