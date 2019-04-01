"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/31/17.
 */
const Lavender = require("lavenderjs/lib");
class ComponentEvent extends Lavender.AbstractEvent {
    constructor(type, payload) {
        super(type, payload);
    }
    clone(type, payload) {
        return new ComponentEvent(this.type, this.payload);
    }
}
ComponentEvent.READY = 'lotusComponentReady';
ComponentEvent.CLICK = 'click';
exports.ComponentEvent = ComponentEvent;
//# sourceMappingURL=ComponentEvent.js.map