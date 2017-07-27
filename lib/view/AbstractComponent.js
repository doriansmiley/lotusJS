"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/26/17.
 */
var AbstractComponent = (function () {
    function AbstractComponent() {
    }
    AbstractComponent.prototype.destroy = function () {
        console.log('AbstractComponent.destroy called');
    };
    AbstractComponent.prototype.created = function (element) {
        console.log('AbstractComponent.created called');
    };
    AbstractComponent.prototype.inserted = function (element) {
        console.log('AbstractComponent.inserted called');
    };
    AbstractComponent.prototype.removed = function (element) {
        console.log('AbstractComponent.removed called');
    };
    AbstractComponent.prototype.attributeChanged = function (element) {
        console.log('AbstractComponent.attributeChanged called');
    };
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
//# sourceMappingURL=AbstractComponent.js.map