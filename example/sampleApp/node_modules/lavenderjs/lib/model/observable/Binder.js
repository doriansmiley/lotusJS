"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 4/18/17.
 */
var BindingUtils_1 = require("../../util/BindingUtils");
var Binding = (function () {
    function Binding(host, watcher) {
        this.host = host;
        this.watcher = watcher;
    }
    return Binding;
}());
var Binder = (function () {
    function Binder() {
        this.bindingGroups = {};
    }
    ;
    Binder.prototype.bind = function (host, hostProp, chain, chainProp, isCSS, cssProperty, group) {
        if (isCSS === void 0) { isCSS = false; }
        if (cssProperty === void 0) { cssProperty = null; }
        if (group === void 0) { group = 'default'; }
        var changeWatcher = BindingUtils_1.BindingUtils.bind(host, hostProp, chain, chainProp, isCSS, cssProperty);
        if (!this.bindingGroups.hasOwnProperty(group)) {
            this.bindingGroups[group] = [];
        }
        var binding = new Binding(host, changeWatcher);
        this.bindingGroups[group].push(binding);
    };
    Binder.prototype.unbind = function (group) {
        if (group === void 0) { group = 'default'; }
        var bindings = this.bindingGroups[group];
        if (bindings) {
            bindings.forEach(function (bindingData) {
                bindingData.host.removeObserver(bindingData.watcher);
            });
            delete this.bindingGroups[group];
        }
    };
    Binder.prototype.unbindAll = function () {
        for (var group in this.bindingGroups) {
            this.unbind(group);
        }
    };
    return Binder;
}());
exports.Binder = Binder;
//# sourceMappingURL=Binder.js.map