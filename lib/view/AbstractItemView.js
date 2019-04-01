"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractComponent_1 = require("./AbstractComponent");
/**
 * Created by dsmiley on 8/4/17.
 */
class AbstractItemView extends AbstractComponent_1.AbstractComponent {
    constructor() {
        super();
    }
    get model() {
        return this._model;
    }
    set model(val) {
        this._model = val;
        this.onModelChange(val);
        this.notify(val, 'model');
    }
    setElementDisplay(element, display) {
        //at some points in the items lifecycle element could be null, se we require this check
        if (element !== null && element !== undefined) {
            element.style.display = display;
        }
    }
    //stub for override
    onModelChange(value) {
    }
    //stub for override
    resetState() {
    }
    destroy() {
        super.destroy();
        if (this.model && this.model['destroy']) {
            this.model['destroy']();
        }
        this.model = null;
    }
}
exports.AbstractItemView = AbstractItemView;
//# sourceMappingURL=AbstractItemView.js.map