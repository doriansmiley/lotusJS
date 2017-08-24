"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractComponent_1 = require("./AbstractComponent");
var SkinPart_1 = require("./SkinPart");
var ComponentEvent_1 = require("../control/events/ComponentEvent");
/**
 * Created by dsmiley on 7/26/17.
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Button.prototype, "buttonSkinPart", {
        get: function () {
            return this._buttonSkinPart;
        },
        set: function (value) {
            this._buttonSkinPart = value;
            this.notify(value, 'buttonSkinPart');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.notify(value, 'type');
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.onClick = function (event) {
        console.log('Lotus.Button.prototype.onClick: event is ' + event);
        console.log('Lotus.Button.prototype.onClick: my id is ' + this.id);
        this.dispatch(new ComponentEvent_1.ComponentEvent('click', { target: this.buttonSkinPart, originalEvent: event }));
    };
    Button.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('button', this, 'buttonSkinPart'));
    };
    Button.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'button':
                //add button event listener or whatever else yo want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Button.prototype.onSkinPartAdded: part: ' + part);
                console.log('Lotus.Button.prototype.onSkinPartAdded: skinPart: ' + part);
                this.addEventListeners();
                break;
        }
    };
    Button.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.buttonSkinPart.addEventListener('click', this.onClick);
    };
    Button.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.buttonSkinPart.removeEventListener('click', this.onClick);
    };
    Button.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.buttonSkinPart = null;
    };
    return Button;
}(AbstractComponent_1.AbstractComponent));
exports.Button = Button;
//# sourceMappingURL=Button.js.map