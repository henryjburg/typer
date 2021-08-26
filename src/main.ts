import 'semantic-ui-css/semantic.min.css'
import './style.css'

import { Core } from './core'
import { Graphics } from './graphics'
import { start } from './display'

export class Main {
  start() {
    // Instantiate components
    let graphics = new Graphics()
    let core = new Core(graphics)

    // Start the display
    start()

    // History window
    // let history = document.getElementById('history')
    // let historyWindow = document.createElement('div')
    // historyWindow.className = 'column container scrolling-history'
    // historyWindow.id = 'history-window'
    // history?.appendChild(historyWindow)
  
    // // Input
    // let point = document.createElement('p')
    // point.innerHTML = '\> '
    // let input = document.createElement('input')
    // input.addEventListener('keyup', function(event) {
    //   if (event.code === 'Enter') {
    //     // Cancel the default action, if needed
    //     event.preventDefault()

    //     // Handle the command
    //     core.handleCommand(input.value)
  
    //     // Reset the value of the input
    //     input.value = ''
    //   }
    // });

    // // Configure graphical layout
    // point.appendChild(input)
    // history?.appendChild(point)
    // graphics.setupView()
    // core.setupView()
  }
}

let typer = new Main()
typer.start()