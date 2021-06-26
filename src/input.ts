import { State } from "./state"

export class Input {
  private _state: State

  constructor(_state: State) {
    this._state = _state
  }

  setupView() {
    let history = document.getElementById('history')

    // History window
    let historyWindow = document.createElement('div')
    historyWindow.className = 'column container scrolling-history'
    historyWindow.id = 'history-window'
    history?.appendChild(historyWindow)
  
    // Input
    let point = document.createElement('p')
    point.innerHTML = '\> '
    let input = document.createElement('input')
    let _this = this
    input.addEventListener('keyup', function(event) {
      if (event.code === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault()

        // Handle the command
        _this._state.handleCommand(input.value)
  
        // Reset the value of the input
        input.value = ''
      }
    });
    point.appendChild(input)
    history?.appendChild(point)
  }
}