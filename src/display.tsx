import React, { createRef } from 'react';
import { render } from 'react-dom';

import { Container } from 'semantic-ui-react';

const LEAD = '$~>  ';

export const CommandInput = (props: any) => {
  const inputField = createRef();

  function handleInput(event: any) {
    // Create a new 'div' to contain the feedback text
    const submittedCommand = document.createElement("div");

    // Handle 'enter' keypress to submit
    if (event.code === "Enter") {
      submittedCommand.innerText = inputField.current.value;
      inputField.current.value = "";
    }
    props.inputRegion.current.append(submittedCommand);
    submittedCommand.scrollIntoView({ behavior: 'smooth' });
  }

  // Add 'keydown' event listener
  document.addEventListener('keydown', handleInput);

  return (
    <div className="command-input">
      {LEAD} <input autoFocus ref={inputField}></input>
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
            <div ref={commandInput} className="input-scrolling"></div>
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