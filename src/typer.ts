import { Graphics } from "./graphics";
import { EventType } from "./io";
import { Listener } from "./io";
import { Processor } from "./processor";

/**
 * Boot function for Typer.
 */
export function boot() {
  let listener = new Listener();
  let graphics = new Graphics();
  new Processor(graphics);

  listener.createEvent(EventType.KEYBOARD, 'KeyboardHandler', {
    callback: function(event: any) {
      listener.handleKeyPress(event.code)
    }
  });
}