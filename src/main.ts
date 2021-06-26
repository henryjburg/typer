import './style.css'
import { Input } from './input'
import { State } from './state'

export class Main {
  start() {
    let state = new State()
    state.setupView()

    let input = new Input(state)
    input.setupView()
  }
}

let typer = new Main()
typer.start()