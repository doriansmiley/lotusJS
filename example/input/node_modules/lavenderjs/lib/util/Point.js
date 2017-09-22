"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 6/30/17.
 */
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.distance = function (p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };
    Point.direction = function (p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    };
    Point.prototype.equal = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    Point.prototype.add = function (other) {
        return new Point(this.x + other.x, this.y + other.y);
    };
    Point.prototype.subtract = function (other) {
        return new Point(this.x - other.x, this.y - other.y);
    };
    Point.prototype.scale = function (scalar) {
        return new Point(this.x * scalar, this.y * scalar);
    };
    Point.prototype.magnitude = function () {
        return Point.distance(new Point(0, 0), this);
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=Point.js.map