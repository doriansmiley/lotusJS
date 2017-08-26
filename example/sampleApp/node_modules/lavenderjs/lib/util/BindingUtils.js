"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChangeWatcher_1 = require("../model/observable/ChangeWatcher");
var BindingUtils = (function () {
    function BindingUtils() {
    }
    BindingUtils.bind = function (host, hostProp, chain, chainProp, isCSS, cssProperty) {
        var observer = new ChangeWatcher_1.ChangeWatcher(hostProp, chain, chainProp, isCSS, cssProperty);
        host.addObserver(observer);
        return observer;
    };
    return BindingUtils;
}());
exports.BindingUtils = BindingUtils;
//# sourceMappingURL=BindingUtils.js.map