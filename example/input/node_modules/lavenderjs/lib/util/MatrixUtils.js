"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var MathUtils_1 = require("./MathUtils");
var Matrix_1 = require("./Matrix");
var MatrixUtils = (function () {
    function MatrixUtils() {
    }
    MatrixUtils.rotate = function (matrix, degAngle, point) {
        return matrix.rotate(MathUtils_1.MathUtils.degreeToRadian(degAngle), point);
    };
    MatrixUtils.matrixToCSS = function (matrix) {
        var coeffs = ['a', 'b', 'c', 'd', 'tx', 'ty'];
        var values = [];
        for (var i in coeffs) {
            values.push(MathUtils_1.MathUtils.toFixed(matrix[coeffs[i]]));
        }
        return 'matrix(' + values.join(',') + ')';
    };
    MatrixUtils.getRotationAngleForElement = function (element) {
        var matrix = element.style["-webkit-transform"] ||
            element.style["-moz-transform"] ||
            element.style["-ms-transform"] ||
            element.style["-o-transform"] ||
            element.style["transform"];
        var angle;
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }
        else {
            angle = 0;
        }
        return angle;
    };
    MatrixUtils.getRotationAngle = function (matrix) {
        return MathUtils_1.MathUtils.toFixed(MathUtils_1.MathUtils.radianToDegree(Math.atan2(matrix.b, matrix.a)));
    };
    MatrixUtils.getMatrix = function (cssTransformMatrix) {
        var values = cssTransformMatrix.split('(')[1];
        values = values.split(')')[0];
        var valuesArray = values.split(',');
        var a = parseFloat(valuesArray[0]);
        var b = parseFloat(valuesArray[1]);
        var c = parseFloat(valuesArray[2]);
        var d = parseFloat(valuesArray[3]);
        var tx = parseFloat(valuesArray[4]);
        var ty = parseFloat(valuesArray[5]);
        return new Matrix_1.Matrix(a, b, c, d, tx, ty);
    };
    return MatrixUtils;
}());
exports.MatrixUtils = MatrixUtils;
//# sourceMappingURL=MatrixUtils.js.map