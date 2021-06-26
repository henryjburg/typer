import './style.css'
import { State } from './state'
import { Graphics } from './graphics'

export class Main {
  start() {
    // Instantiate components
    let graphics = new Graphics()
    let state = new State(graphics)

    // History window
    let history = document.getElementById('history')
    let historyWindow = document.createElement('div')
    historyWindow.className = 'column container scrolling-history'
    historyWindow.id = 'history-window'
    history?.appendChild(historyWindow)
  
    // Input
    let point = document.createElement('p')
    point.innerHTML = '\> '
    let input = document.createElement('input')
    input.addEventListener('keyup', function(event) {
      if (event.code === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault()

        // Handle the command
        state.handleCommand(input.value)
  
        // Reset the value of the input
        input.value = ''
      }
    });

    // Configure graphical layout
    point.appendChild(input)
    history?.appendChild(point)
    graphics.setupView()
    state.setupView()
  }
}

let typer = new Main()
typer.start()