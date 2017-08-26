"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/11/17.
 */
var UuidUtils = (function () {
    function UuidUtils() {
    }
    UuidUtils.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    UuidUtils.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return UuidUtils;
}());
exports.UuidUtils = UuidUtils;
//# sourceMappingURL=UuidUtils.js.map