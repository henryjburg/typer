enum EventType {
  CLICK = 'click',
  KEYBOARD = 'keyboard',
}

class Listener {
  private _eventBank: any[];

  constructor() {
    // Initialise the Event listener storage
    this._eventBank = [];
  }

  createEvent(_type: EventType, _id: string, _data: any) {
    switch (_type) {
      case EventType.KEYBOARD:
        {
          this._createKeyEvent(_id, _data);
          break;
        }
      default:
        break;
    }
  }

  cancelEvent(_id: string) {
    this._eventBank.forEach(el => {
      if (el._id === _id) {
        console.debug(`Located event: '${_id}'`);
        return;
      }
    });
  }

  private _createKeyEvent(_id: string, _data: any) {
    console.debug(`[Event : ${Date.now()}]`, _data);
    this._eventBank.push({
      id: _id,
      type: EventType.KEYBOARD,
      listener: document.addEventListener('keypress', _data.callback)
    });
  }

  handleKeyPress(_code: string) {
    console.debug(_code)
  }
}

export { EventType, Listener };