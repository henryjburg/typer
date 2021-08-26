import React from 'react';
import { render } from 'react-dom';

import { Container } from 'semantic-ui-react';

export function start() {
  render(
    (
      <>
        <Container className="display-container">
          <Container className="display-inner crt">
            <h1>hello world</h1>
          </Container>
        </Container>
        <Container className="status-container">
          <Container className="status-inner">
            <h1>Status</h1>
            <p>ON</p>
            <p>Bytes Free: 5938</p>
          </Container>
        </Container>
      </>
    ),
    document.getElementById('app')
  )
}