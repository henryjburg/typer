import React, { createRef } from 'react';
import { render } from 'react-dom';

import { Container } from 'semantic-ui-react';

const LEAD = '>>  ';

export const CommandInput = (props: any) => {
  function handleInput(event: any) {
    props.inputRegion.current.append("Hello!");
  }

  // Add 'keydown' event listener
  document.addEventListener('keydown', handleInput);

  return (
    <div className="command-input">
      {LEAD} <input autoFocus></input>
    </div>
  );
}

export function start() {
  const commandInput = createRef();

  render(
    (
      <>
        <Container className="display-container">
          <Container className="display-inner crt">
            <div ref={commandInput}></div>
            <CommandInput inputRegion={commandInput} />
          </Container>
        </Container>
        <Container className="status-container">
          <Container className="status-inner">
            <h1>Status</h1>
            <p>Bytes Free: 5938</p>
          </Container>
        </Container>
      </>
    ),
    document.getElementById('app')
  );
}