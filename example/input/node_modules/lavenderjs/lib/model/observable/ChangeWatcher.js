"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChangeWatcher = (function () {
    function ChangeWatcher(hostProp, chainInstance, chainPropToWatch, isCSS, cssProperty) {
        if (isCSS === void 0) { isCSS = false; }
        if (isCSS && !cssProperty) {
            throw new Error('cssProperty property is required when isCSS param is true');
        }
        this.chain = hostProp;
        this.instance = chainInstance;
        this.chainProp = chainPropToWatch;
        this.isCSS = isCSS;
        this.cssProperty = cssProperty;
    }
    ;
    ChangeWatcher.prototype.update = function (value, chain) {
        if (this.isCSS) {
            this.instance[this.chainProp](this.cssProperty, value);
        }
        else if (typeof (this.instance[this.chainProp]) == "function") {
            this.instance[this.chainProp](value, chain);
        }
        else {
            if (this.instance[this.chainProp] != value) {
                this.instance[this.chainProp] = value;
            }
        }
    };
    return ChangeWatcher;
}());
exports.ChangeWatcher = ChangeWatcher;
//# sourceMappingURL=ChangeWatcher.js.map