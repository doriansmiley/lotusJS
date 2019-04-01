"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 8/1/17.
 */
const Lavender = require("lavenderjs/lib");
class SkinPart extends Lavender.Subject {
    constructor(label, instance, attribute) {
        super();
        this._label = label;
        this._instance = instance;
        this._attribute = attribute;
    }
    get label() {
        return this._label;
    }
    get element() {
        return this._instance[this._attribute];
    }
    set element(val) {
        this._instance[this._attribute] = val;
        this.notify(val, 'element');
    }
}
exports.SkinPart = SkinPart;
//# sourceMappingURL=SkinPart.js.map