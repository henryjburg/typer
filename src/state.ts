export enum COMMANDS {
  MOV = 'MOV',
  ADD = 'ADD',
  FLG = 'FLG',
  INC = 'INC',
  MUL = 'MUL',
  SUB = 'SUB',
  DIV = 'DIV'
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
  private _previous: string[]

  constructor() {
    let viewContainer = document.getElementById('state')

    // State view window
    this._view = document.createElement('div')
    this._view.className = 'container state-view'
    viewContainer?.appendChild(this._view)

    this._values = {}
    for (let _destination in DESTINATIONS) {
      this._values[_destination] = 0
    }

    this._previous = []
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
      case COMMANDS.ADD: {
        this._logCommand(_command)
        this._handleADD(_parts)
        break
      }
      case COMMANDS.MUL: {
        this._logCommand(_command)
        this._handleMUL(_parts)
        break
      }
      case COMMANDS.SUB: {
        this._logCommand(_command)
        this._handleSUB(_parts)
        break
      }
      case COMMANDS.DIV: {
        this._logCommand(_command)
        this._handleDIV(_parts)
        break
      }
      case COMMANDS.FLG: {
        this._logCommand(_command)
        this._handleFLG(_parts)
        break
      }
      case COMMANDS.INC: {
        this._logCommand(_command)
        this._handleINC(_parts)
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
      this._previous.push(_text)
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
      this._logError(`Invalid arguments.`)
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
   * Add the values of two labels or numbers
   * @param _parts command
   * @returns Null if invalid
   */
  _handleADD(_parts: string[]) {
    let _args = _parts[1].split(',')

    if (_args.length !== 2) {
      this._logError(`Invalid arguments.`)
      return
    }

    // Extract the source and destination
    let _src = _args[0]
    let _dest = _args[1]

    // Second argument must be a destination
    if (!this._isLabel(_dest)) {
      this._logError(`Invalid destination '${_dest}'.`)
      return
    }

    if (!this._isLabel(_src)) {
      this._values[_dest] += parseInt(_src)
    } else if(this._isLabel(_src)) {
      this._values[_dest] += this._values[_src]
    } else {
      this._logError(`Invalid destination '${_dest}'.`)
      return
    }

    this.updateView()
  }

  /**
   * Multiply the values of two labels or numbers
   * @param _parts command
   * @returns Null if invalid
   */
   _handleMUL(_parts: string[]) {
    let _args = _parts[1].split(',')

    if (_args.length !== 2) {
      this._logError(`Invalid arguments.`)
      return
    }

    // Extract the source and destination
    let _src = _args[0]
    let _dest = _args[1]

    // Second argument must be a destination
    if (!this._isLabel(_dest)) {
      this._logError(`Invalid destination '${_dest}'.`)
      return
    }

    if (!this._isLabel(_src)) {
      this._values[_dest] *= parseInt(_src)
    } else if(this._isLabel(_src)) {
      this._values[_dest] *= this._values[_src]
    } else {
      this._logError(`Invalid destination '${_dest}'.`)
      return
    }
    this.updateView()
  }

  /**
   * Subtract the values of two labels or numbers
   * @param _parts command
   * @returns Null if invalid
   */
   _handleSUB(_parts: string[]) {
    let _args = _parts[1].split(',')

    if (_args.length !== 2) {
      this._logError(`Invalid arguments.`)
      return
    }

    // Extract the source and destination
    let _src = _args[0]
    let _dest = _args[1]

    // Second argument must be a destination
    if (!this._isLabel(_dest)) {
      this._logError(`Invalid destination '${_dest}'.`)
      return
    }

    if (!this._isLabel(_src)) {
      this._values[_dest] -= parseInt(_src)
    } else if(this._isLabel(_src)) {
      this._values[_dest] -= this._values[_src]
    } else {
      this._logError(`Invalid destination '${_dest}'.`)
      return
    }

    this.updateView()
  }

  /**
   * Divide the values of two labels or numbers
   * @param _parts command
   * @returns Null if invalid
   */
   _handleDIV(_parts: string[]) {
    let _args = _parts[1].split(',')

    if (_args.length !== 2) {
      this._logError(`Invalid arguments.`)
      return
    }

    // Extract the source and destination
    let _src = _args[0]
    let _dest = _args[1]

    // Second argument must be a destination
    if (!this._isLabel(_dest)) {
      this._logError(`Invalid destination '${_dest}'.`)
      return
    }

    if (parseInt(_src) !== 0 && !this._isLabel(_src)) {
      this._values[_dest] /= parseInt(_src)
    } else if(this._values[_src] !== 0 && this._isLabel(_src)) {
      this._values[_dest] /= this._values[_src]
    } else {
      this._logError(`Invalid operation.`)
      return
    }

    this.updateView()
  }

  /**
   * Set the value of the FLG label to 0 or 1
   * @param _parts command
   * @returns Null if invalid
   */
  _handleFLG(_parts: string[]) {
    let _args = _parts[1]

    if (_args !== '1' && _args !== '0') {
      this._logError(`Invalid flag value.`)
      return
    }

    let _dest = COMMANDS.FLG
    this._values[_dest] = parseInt(_args)

    this.updateView()
  }

  /**
   * Increment the value of a label
   * @param _parts command
   * @returns Null if invalid
   */
  _handleINC(_parts: string[]) {
    let _args = _parts[1]

    if (!this._isLabel(_args)) {
      this._logError(`Invalid destination '${_args}'.`)
      return
    }

    this._values[_args] += 1

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