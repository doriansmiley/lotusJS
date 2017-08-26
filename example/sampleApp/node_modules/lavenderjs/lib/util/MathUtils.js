"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.degreeToRadian = function (degAngle) {
        return degAngle * Math.PI / 180;
    };
    MathUtils.radianToDegree = function (radAngle) {
        return radAngle * 180 / Math.PI;
    };
    MathUtils.toFixed = function (number, precision) {
        if (precision === void 0) { precision = 10; }
        var multiplier = Math.pow(10, precision);
        return Math.round(number * multiplier) / multiplier;
    };
    MathUtils.isEven = function (value) {
        return ((value % 2) == 0);
    };
    return MathUtils;
}());
exports.MathUtils = MathUtils;
//# sourceMappingURL=MathUtils.js.map