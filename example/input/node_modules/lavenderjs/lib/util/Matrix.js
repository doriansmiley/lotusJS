"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var Point_1 = require("./Point");
var Matrix = (function () {
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    Matrix.rotation = function (theta, aboutPoint) {
        if (aboutPoint === void 0) { aboutPoint = null; }
        var rotationMatrix = new Matrix(Math.cos(theta), Math.sin(theta), -Math.sin(theta), Math.cos(theta));
        if (aboutPoint) {
            rotationMatrix =
                Matrix.translation(aboutPoint.x, aboutPoint.y).concat(rotationMatrix).concat(Matrix.translation(-aboutPoint.x, -aboutPoint.y));
        }
        return rotationMatrix;
    };
    Matrix.scale = function (sx, sy, aboutPoint) {
        sy = sy || sx;
        var scaleMatrix = new Matrix(sx, 0, 0, sy);
        if (aboutPoint) {
            scaleMatrix =
                Matrix.translation(aboutPoint.x, aboutPoint.y).concat(scaleMatrix).concat(Matrix.translation(-aboutPoint.x, -aboutPoint.y));
        }
        return scaleMatrix;
    };
    Matrix.translation = function (tx, ty) {
        return new Matrix(1, 0, 0, 1, tx, ty);
    };
    ;
    Matrix.prototype.concat = function (matrix) {
        return new Matrix(this.a * matrix.a + this.c * matrix.b, this.b * matrix.a + this.d * matrix.b, this.a * matrix.c + this.c * matrix.d, this.b * matrix.c + this.d * matrix.d, this.a * matrix.tx + this.c * matrix.ty + this.tx, this.b * matrix.tx + this.d * matrix.ty + this.ty);
    };
    Matrix.prototype.deltaTransformPoint = function (point) {
        return new Point_1.Point(this.a * point.x + this.c * point.y, this.b * point.x + this.d * point.y);
    };
    Matrix.prototype.inverse = function () {
        var determinant = this.a * this.d - this.b * this.c;
        return new Matrix(this.d / determinant, -this.b / determinant, -this.c / determinant, this.a / determinant, (this.c * this.ty - this.d * this.tx) / determinant, (this.b * this.tx - this.a * this.ty) / determinant);
    };
    Matrix.prototype.rotate = function (theta, aboutPoint) {
        return this.concat(Matrix.rotation(theta, aboutPoint));
    };
    Matrix.prototype.scale = function (sx, sy, aboutPoint) {
        return this.concat(Matrix.scale(sx, sy, aboutPoint));
    };
    Matrix.prototype.transformPoint = function (point) {
        return new Point_1.Point(this.a * point.x + this.c * point.y + this.tx, this.b * point.x + this.d * point.y + this.ty);
    };
    Matrix.prototype.translate = function (tx, ty) {
        return this.concat(Matrix.translation(tx, ty));
    };
    Matrix.IDENTITY = new Matrix();
    Matrix.HORIZONTAL_FLIP = new Matrix(-1, 0, 0, 1);
    Matrix.VERTICAL_FLIP = new Matrix(1, 0, 0, -1);
    return Matrix;
}());
exports.Matrix = Matrix;
//# sourceMappingURL=Matrix.js.map