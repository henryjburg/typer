import { Graphics } from "./graphics";

class Processor {
  private _speed = 64;
  private _graphics: Graphics;

  private _stack: any[];

  constructor(_graphics: Graphics) {
    this._stack = [];
    this._graphics = _graphics;

    // Configure the timer handler.
    setInterval(this.update, 1000 / this._speed, this);
  }

  update(_this: Processor) {
    _this.pollAll();
  }

  pollAll() {
    // Poll the Graphics module for an updated frame.
    if (this._graphics) {
      let frame = this._graphics.poll();
      if (frame !== null) {
        this._stack.push({
          operation: this._graphics.render,
          args: [frame]
        })
      }
    }
  }
}

export { Processor };