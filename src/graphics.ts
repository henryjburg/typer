import { Instruction, InstructionSet } from "./instruction";
import * as PIXI from 'pixi.js';

class Graphics {
  private _pixelWidth = 256;
  private _pixelHeight = 256;
  private _pixelScale = 8;
  private _pixelsW: number;
  private _pixelsH: number;
  private _frameCache: any[];
  private _graphicsApplication: PIXI.Application;
  private _graphicsContext: PIXI.Graphics;

  constructor() {
    this._frameCache = [];

    // Obtain graphics target.
    document.getElementById('display');

    // Create a Pixi Application
    this._graphicsApplication = new PIXI.Application({width: this._pixelWidth, height: this._pixelHeight});

    // Append the canvas
    document.body.appendChild(this._graphicsApplication.view);

    // Get the graphics context
    this._graphicsContext = new PIXI.Graphics();

    this._pixelsW = this._pixelWidth / this._pixelScale;
    this._pixelsH = this._pixelHeight / this._pixelScale;

    this._graphicsApplication.stage.addChild(this._graphicsContext);

    this._setupView();
  }

  private _pushFrame(frame: any) {
    this._frameCache.push(frame);
  }

  private _popFrame() {
    if (this._frameCache.length > 0) {
      let frame = this._frameCache.pop();
      return frame;
    }
    return null;
  }

  private _setupView() {
    for (let x = 0; x < this._pixelsW; x++) {
      for (let y = 0; y < this._pixelsH; y++) {
        Math.random() > 0.5 ? this._graphicsContext.beginFill(0x4287F5) : this._graphicsContext.beginFill(0x393F47);
        this._graphicsContext.drawRect(x * this._pixelScale, y * this._pixelScale, this._pixelScale, this._pixelScale);
        this._graphicsContext.endFill();
      }
    }
  }

  instruct(_instruction: Instruction) {
    switch (_instruction.getID()) {
      case InstructionSet.POKE:
        {
          this._POKE(_instruction);
          break;
        }
      default:
        console.error(`Unknown instruction with ID '${_instruction.getID()}'`);
        break;
    }
  }

  private _POKE(_instruction: Instruction) {
    console.debug(_instruction.getData());
  }

  poll() {
    return this._popFrame();
  }

  render(_frame: any) {
    console.debug(`[Graphics : ${Date.now()}] Rendering frame`);
  }

  dimentions() {
    return [this._pixelWidth, this._pixelHeight];
  }
}

export { Graphics };