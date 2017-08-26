"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/11/17.
 */
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    ;
    ObjectUtils.extend = function (base, sub) {
        // Avoid instantiating the base class just to setup inheritance
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
        sub.prototype = Object.create(base.prototype);
        // Remember the constructor property was set wrong, let's fix it
        sub.prototype.constructor = sub;
    };
    ObjectUtils.mixin = function (base, sub, subInstance, overwriteInstanceVariables) {
        if (overwriteInstanceVariables === void 0) { overwriteInstanceVariables = false; }
        var objectToExtend = new base();
        //Grab methods and properties defined through prototypal inheritance
        for (var prop in base.prototype) {
            if (base.prototype.hasOwnProperty(prop)) {
                sub.prototype[prop] = base.prototype[prop];
            }
        }
        //grab instance variables and function
        for (var prop in objectToExtend) {
            if (objectToExtend.hasOwnProperty(prop)) {
                //if an object defines an instance variable or function we don't want to overwrite it unless specified
                if (subInstance[prop] !== null && subInstance[prop] !== undefined && !overwriteInstanceVariables) {
                    continue;
                }
                subInstance[prop] = objectToExtend[prop];
            }
        }
        return subInstance;
    };
    ObjectUtils.hasFunction = function (obj, prop) {
        return (obj && typeof obj[prop] === 'function');
    };
    ObjectUtils.isPropDefined = function (obj, prop) {
        if (obj && obj.hasOwnProperty(prop) && obj[prop] != undefined && obj[prop] != null && obj[prop] != NaN) {
            return true;
        }
        return false;
    };
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=ObjectUtils.js.map