"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 10/5/17.
 */
const Lavender = require("lavenderjs/lib");
class InputModel extends Lavender.Subject {
    constructor(label, value, name, selected = false, required = false) {
        super();
        this._selected = false;
        this._required = false;
        this.label = label;
        this.value = value;
        this.name = name;
        this.selected = selected;
        this.required = required;
    }
    get nonFormattedValue() {
        return this._nonFormattedValue;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
        this.notify(value, 'label');
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._nonFormattedValue = value;
        if (this.format) {
            value = this.format(value);
        }
        this._value = value;
        this.notify(value, 'value');
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this.notify(value, 'name');
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.notify(value, 'selected');
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = value;
        this.notify(value, 'required');
    }
}
exports.InputModel = InputModel;
//# sourceMappingURL=InputModel.js.map