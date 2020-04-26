import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useStoreon } from 'storeon/react';

import { Code } from './code';

export function Preview() {
  const { dispatch, data } = useStoreon('data');

  return (
    <ReactMarkdown
      className="markdown"
      renderers={{ code: Code }}
      source={data}
    />
  );
}
