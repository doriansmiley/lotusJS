"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/11/17.
 */
var URLUtils = (function () {
    function URLUtils() {
    }
    URLUtils.getQuerystring = function (location, key, defaultValue) {
        key = key.toLowerCase();
        if (defaultValue === null || defaultValue === undefined) {
            defaultValue = '';
        }
        key = key.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
        var qs = regex.exec(location.toLowerCase()); //usually window.location.href.toLowerCase()
        if (qs == null) {
            return defaultValue;
        }
        else {
            return qs[1];
        }
    };
    return URLUtils;
}());
exports.URLUtils = URLUtils;
//# sourceMappingURL=URLUtils.js.map