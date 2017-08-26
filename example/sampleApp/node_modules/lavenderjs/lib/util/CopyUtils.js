"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var CopyUtils = (function () {
    function CopyUtils() {
    }
    CopyUtils.copyInheredValues = function (child, parent) {
        for (var prop in parent) {
            if (child.hasOwnProperty(prop) && (child[prop] === undefined || child[prop] === null || child[prop] === '' || child[prop] === NaN)) {
                child[prop] = parent[prop];
            }
        }
    };
    CopyUtils.overwriteValues = function (child, parent, excludeObjects) {
        if (excludeObjects === void 0) { excludeObjects = {}; }
        for (var prop in parent) {
            if (child.hasOwnProperty(prop)) {
                var value = (excludeObjects.hasOwnProperty(prop)) ? child[prop] : parent[prop];
                child[prop] = value;
            }
        }
    };
    CopyUtils.concatObjects = function (objects) {
        var ret = {};
        var len = objects.length;
        for (var i = 0; i < len; i++) {
            for (var p in objects[i]) {
                if (objects[i].hasOwnProperty(p)) {
                    ret[p] = objects[i][p];
                }
            }
        }
        return ret;
    };
    CopyUtils.copyProperties = function (target, source) {
        for (var prop in source) {
            if (typeof source[prop] !== 'function') {
                target[prop] = source[prop];
            }
        }
    };
    return CopyUtils;
}());
exports.CopyUtils = CopyUtils;
//# sourceMappingURL=CopyUtils.js.map