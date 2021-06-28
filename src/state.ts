import { Graphics } from './graphics'

export enum COMMANDS {
  MOV = 'MOV',
  CPY = 'CPY',
  ADD = 'ADD',
  FLG = 'FLG',
  INC = 'INC',
  MUL = 'MUL',
  SUB = 'SUB',
  DIV = 'DIV',
  POKE = 'POKE',
  PLCE = 'PLCE'
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
  private _graphics: Graphics

  constructor(_graphics: Graphics) {
    this._graphics = _graphics
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
      case COMMANDS.CPY: {
        this._logCommand(_command)
        this._handleCPY(_parts)
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
      case COMMANDS.POKE: {
        this._logCommand(_command)
        this._handlePOKE(_parts)
        break
      }
      case COMMANDS.PLCE: {
        this._logCommand(_command)
        this._handlePLCE(_parts)
        break
      }
      default: {
        this._logError(`Unknown command '${_parts[0]}'.`)
        break
      }
    }

    this.updateView()
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
      if (_dest === DESTINATIONS.FLG) {
        console.debug(_src)
        this._handleFLG([_parts[0], this._values[_src].toString()])
        return
      }

      // If both are labels
      this._values[_dest] = this._values[_src]
      if (_src !== _dest) {
        this._values[_src] = 0
      }
      return
    } else if (this._isLabel(_dest)) {
      // If destination is a label, source is a value
      if (_dest === DESTINATIONS.FLG) {
        this._handleFLG([_parts[0], _src])
        return
      }
      this._values[_dest] = parseInt(_src)
      return
    }

    this._logError(`Invalid destination '${_dest}'.`)
    return
  }

  _handleCPY(_parts: string[]) {
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
      if (_dest === DESTINATIONS.FLG) {
        console.debug(_src)
        this._handleFLG([_parts[0], this._values[_src].toString()])
        return
      }

      // If both are labels
      this._values[_dest] = this._values[_src]
      return
    } else if (this._isLabel(_dest)) {
      // If destination is a label, source is a value
      if (_dest === DESTINATIONS.FLG) {
        this._handleFLG([_parts[0], _src])
        return
      }
      this._values[_dest] = parseInt(_src)
      return
    }

    this._logError(`Invalid destination '${_dest}'.`)
    return
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
      return
    } else if(this._isLabel(_src)) {
      this._values[_dest] += this._values[_src]
      return
    }
    this._logError(`Invalid destination '${_dest}'.`)
    return
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
      return
    } else if(this._isLabel(_src)) {
      this._values[_dest] *= this._values[_src]
      return
    }
    this._logError(`Invalid destination '${_dest}'.`)
    return
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
      return
    } else if(this._isLabel(_src)) {
      this._values[_dest] -= this._values[_src]
      return
    }
    this._logError(`Invalid destination '${_dest}'.`)
    return
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
      return
    } else if(this._values[_src] !== 0 && this._isLabel(_src)) {
      this._values[_dest] /= this._values[_src]
      return
    }
    this._logError(`Invalid operation.`)
    return
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
  }

  _handlePOKE(_parts: string[]) {
    let _args = _parts[1].split(',')

    if (_args.length !== 2) {
      this._logError(`Invalid arguments.`)
      return
    }

    let _coords = this._validCoordinates(_args)
    if (_coords[0] >= 0 && _coords[1] >= 0) {
      this._graphics.setPixel(_coords[0], _coords[1], 'black')
    }
  }

  _handlePLCE(_parts: string[]) {
    let _args = _parts[1].split(',')

    if (_args.length !== 2) {
      this._logError(`Invalid arguments.`)
      return
    }

    let _coords = this._validCoordinates(_args)
    if (_coords[0] >= 0 && _coords[1] >= 0) {
      this._graphics.setPixel(_coords[0], _coords[1], 'white')
    }
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

  _graphicsInRange(_value: string) {
    if (isNaN(parseInt(_value)) || this._graphics.getDimensions()[0] - 1 < parseInt(_value) || parseInt(_value) < 0) {
      return false
    }
    return true
  }

  _validCoordinates(_args: string[]) {
    let _x = -1, _y = -1;

    // X-values
    if (this._isLabel(_args[0])) {
      // Check X-value for label
      if (!this._graphicsInRange(this._values[_args[0]].toString())) {
        this._logError(`Value of '${_args[0]}' is an invalid X-value.`)
        return [_x, _y]
      }
      _x = this._values[_args[0]]
    } else if (!this._isLabel(_args[0])) {
      // Check X-value for value
      if (!this._graphicsInRange(_args[0])) {
        this._logError(`Value '${_args[0]}' is an invalid X-value.`)
        return [_x, _y]
      }
      _x = parseInt(_args[0])
    } 

    // Y-values
    if (this._isLabel(_args[1])) {
      // Check Y-value for label
      if (!this._graphicsInRange(this._values[_args[1]].toString())) {
        this._logError(`Value of '${_args[1]}' is an invalid Y-value.`)
        return [_x, _y]
      }
      _y = this._values[_args[1]]
    } else if (!this._isLabel(_args[0])) {
      // Check Y-value for value
      if (!this._graphicsInRange(_args[1])) {
        this._logError(`Value '${_args[1]}' is an invalid Y-value.`)
        return [_x, _y]
      }
      _y = parseInt(_args[1])
    }
    return [_x, _y]
  }
}