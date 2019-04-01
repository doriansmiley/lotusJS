"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/21/17.
 */
const Lavender = require("lavenderjs/lib");
class InputEvent extends Lavender.AbstractEvent {
    constructor(type, payload) {
        super(type, payload);
    }
    clone(type, payload) {
        return new InputEvent(this.type, this.payload);
    }
}
InputEvent.CHANGE = 'change';
exports.InputEvent = InputEvent;
//# sourceMappingURL=InputEvent.js.map