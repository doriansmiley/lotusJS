"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractComponent_1 = require("./AbstractComponent");
const SkinPart_1 = require("./SkinPart");
const ComponentEvent_1 = require("../control/events/ComponentEvent");
/**
 * Created by dsmiley on 7/26/17.
 */
class Button extends AbstractComponent_1.AbstractComponent {
    constructor() {
        super();
    }
    get buttonSkinPart() {
        return this._buttonSkinPart;
    }
    set buttonSkinPart(value) {
        this._buttonSkinPart = value;
        this.notify(value, 'buttonSkinPart');
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
        this.notify(value, 'type');
    }
    onClick(event) {
        console.log('Lotus.Button.prototype.onClick: event is ' + event);
        console.log('Lotus.Button.prototype.onClick: my id is ' + this.id);
        console.log('Lotus.Button.prototype.onClick: this ' + this);
        this.dispatch(new ComponentEvent_1.ComponentEvent(ComponentEvent_1.ComponentEvent.CLICK, { target: this.buttonSkinPart, originalEvent: event }));
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('button', this, 'buttonSkinPart'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'button':
                //add button event listener or whatever else yo want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Button.prototype.onSkinPartAdded: part: ' + part);
                console.log('Lotus.Button.prototype.onSkinPartAdded: skinPart: ' + part);
                this.addEventListeners();
                break;
        }
    }
    addEventListeners() {
        super.addEventListeners();
        this.buttonSkinPart.addEventListener('click', this.onClick.bind(this));
    }
    removeEventListeners() {
        super.removeEventListeners();
        this.buttonSkinPart.removeEventListener('click', this.onClick);
    }
    destroy() {
        super.destroy();
        this.buttonSkinPart = null;
    }
}
exports.Button = Button;
//# sourceMappingURL=Button.js.map