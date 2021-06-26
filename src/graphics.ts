import * as PIXI from 'pixi.js';

export class Graphics {
  private _target: HTMLDivElement;
  private _pixelWidth = 256;
  private _pixelHeight = 256;
  private _pixelScale = 8;
  private _pixelsW: number;
  private _pixelsH: number;
  private _graphicsApplication: PIXI.Application;

  constructor() {
    // Graphics view window
    let state = document.getElementById('state')
    this._target = document.createElement('div')
    this._target.className = 'container state-view'
    state?.appendChild(this._target)

    // Create a Pixi Application
    this._graphicsApplication = new PIXI.Application({width: this._pixelWidth, height: this._pixelHeight});

    // Append the canvas
    this._target.appendChild(this._graphicsApplication.view);

    this._pixelsW = this._pixelWidth / this._pixelScale;
    this._pixelsH = this._pixelHeight / this._pixelScale;

    this.setupView();
  }

  setupView() {
    let rectangles = new PIXI.Graphics()
    for (let x = 0; x < this._pixelsW; x++) {
      for (let y = 0; y < this._pixelsH; y++) {
        rectangles.beginFill(0x000000);
        rectangles.drawRect(x * this._pixelScale, y * this._pixelScale, this._pixelScale, this._pixelScale);
        rectangles.endFill();
      }
    }
    this._graphicsApplication.stage.addChild(rectangles);
  }

  setPixel(_x: number, _y: number, _colour: string) {
    let rectangle = new PIXI.Graphics()
    let _fill = 0x000000
    switch (_colour) {
      case 'black': {
        _fill = 0x000000
        break
      }
      case 'white': {
        _fill = 0xFFFFFF
        break
      }
      default: {
        _fill = 0x000000
        break
      }
    }
    rectangle.beginFill(_fill);
    rectangle.drawRect(_x * this._pixelScale, _y * this._pixelScale, this._pixelScale, this._pixelScale);
    rectangle.endFill();
    this._graphicsApplication.stage.addChild(rectangle)
  }

  getDimensions() {
    return [this._pixelsW, this._pixelsH]
  }
}