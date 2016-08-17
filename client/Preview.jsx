import React from 'react';
import { render } from 'react-dom';

import { generateCode } from './common/tools';

const Preview = () => {
  const workPanel = JSON.parse(window.localStorage.getItem('workPanel'));
  const canvasesData = JSON.parse(window.localStorage.getItem('canvasesData'));
  const template = generateCode(workPanel, canvasesData);
  return (
    <div dangerouslySetInnerHTML={{ __html: template }} />
  );
};

render(
  <Preview />,
  window.document.getElementById('preview')
);
