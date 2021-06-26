export enum COMMANDS {
  MOV = 'MOV'
}

export enum DESTINATIONS {
  STR = 'STR',
  FLG = 'FLG',
  R0 = 'R0',
  R1 = 'R1'
}

export class State {
  private _view: HTMLElement
  private _values: any

  constructor() {
    let viewContainer = document.getElementById('state')

    // State view window
    this._view = document.createElement('div')
    this._view.className = 'container'
    viewContainer?.appendChild(this._view)

    this._values = {}
    for (let _destination in DESTINATIONS) {
      this._values[_destination] = 0
    }
  }

  setupView() {
    for (let _destination in DESTINATIONS) {
      this._createLabel(_destination)
    }
  }

  _createLabel(_id: string) {
    let div = document.createElement('div')
    let label = document.createElement('p')
    label.innerHTML = `<b>${_id}: </b>`
    div.appendChild(label)
    let value = document.createElement('span')
    value.id = `${_id}-value`
    value.innerHTML = this._values[_id]
    label.appendChild(value)
    this._view.appendChild(div)
  }

  updateView() {
    for (let _destination in DESTINATIONS) {
      let value = document.getElementById(`${_destination}-value`)
      if (value !== null) {
        value.innerHTML = this._values[_destination]
      }
    }
  }

  handleCommand(_command: string) {
    let _parts = _command.split(' ')

    switch (_parts[0]) {
      case COMMANDS.MOV: {
        this._logCommand(_command)
        this._handleMOV(_parts)
        break
      }
      default: {
        this._logError(`Unknown command '${_parts[0]}'.`)
        break
      }
    }
  }

  _logCommand(_text: string) {
    // Log and handle the command
    let commandText = document.createElement('p')
    commandText.innerHTML = _text
    commandText.className = 'command-text'
    let commandWindow = document.getElementById('history-window')
    if (commandWindow !== null) {
      commandWindow.appendChild(commandText)
    }
  }

  _logError(_error: string) {
    let commandText = document.createElement('p')
    commandText.className = 'error-text'
    commandText.innerHTML = _error
    document.getElementById('history-window')?.appendChild(commandText)
  }

  _handleMOV(_parts: string[]) {
    // Should have two items
    let _args = _parts[1].split(',')

    if (_args.length !== 2) {
      console.error(`Invalid.`)
      return
    }

    // Extract the source and destination
    let _src = _args[0]
    let _dest = _args[1]

    if (this._isLabel(_src) && this._isLabel(_dest)) {
      // If both are labels
      this._values[_dest] = this._values[_src]
      if (_src !== _dest) {
        this._values[_src] = 0
      }
    } else if (this._isLabel(_dest)) {
      // If destination is a label, source is a value
      this._values[_dest] = parseInt(_src)
    } else {
      this._logError(`Invalid destination '${_dest}'.`)
      return
    }

    this.updateView()
  }

  /**
   * Check if an argument is a destination or a 
   * value
   * @param _part string
   */
  _isLabel(_part: string) {
    if (!isNaN(parseInt(_part))) {
      return false
    }

    for (let _destination in DESTINATIONS) {
      if (_destination === _part) {
        return true
      }
    }
    return false
  }
}