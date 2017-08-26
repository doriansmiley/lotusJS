"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtils_1 = require("./MathUtils");
var StringUtil_1 = require("./StringUtil");
var Matrix_1 = require("./Matrix");
var Point_1 = require("./Point");
var PathUtils = (function () {
    function PathUtils() {
    }
    PathUtils.parsePathFromString = function (strPath) {
        strPath = StringUtil_1.StringUtil.trim(StringUtil_1.StringUtil.compressSpaces(strPath));
        var arr = strPath.split(" ");
        var curElement;
        var counter = 0;
        var result = [];
        var len = arr.length;
        do {
            curElement = arr[counter];
            var value = parseFloat(curElement);
            if (isNaN(value) || value == undefined) {
                // command
                result.push(curElement);
            }
            else {
                // point
                var y = parseFloat(arr[++counter]);
                result.push(new Point_1.Point(MathUtils_1.MathUtils.toFixed(value), MathUtils_1.MathUtils.toFixed(y)));
            }
        } while (++counter < len);
        return result;
    };
    PathUtils.isPoint = function (obj) {
        return (obj.hasOwnProperty("x") && obj.hasOwnProperty("y"));
    };
    PathUtils.convertPathToString = function (arrPath) {
        var res = "";
        arrPath.forEach(function (elem) {
            if (PathUtils.isPoint(elem)) {
                res += MathUtils_1.MathUtils.toFixed(elem.x) + " " + MathUtils_1.MathUtils.toFixed(elem.y);
            }
            else {
                res += elem;
            }
            res += " ";
        });
        return StringUtil_1.StringUtil.trim(res);
    };
    PathUtils.movePath = function (arrPath, dx, dy, updateSource) {
        updateSource = updateSource != undefined ? updateSource : true;
        var res = [];
        arrPath.forEach(function (elem) {
            if (PathUtils.isPoint(elem)) {
                if (updateSource) {
                    elem.x += dx;
                    elem.y += dy;
                }
                else {
                    res.push(new Point_1.Point(elem.x + dx, elem.y + dy));
                }
            }
            else if (!updateSource) {
                res.push(elem);
            }
        });
        return updateSource ? arrPath : res;
    };
    PathUtils.scalePath = function (arrPath, scaleX, scaleY, aroundPoint, updateSource) {
        updateSource = updateSource != undefined ? updateSource : true;
        aroundPoint = aroundPoint || new Point_1.Point(0, 0);
        var matrix = new Matrix_1.Matrix();
        matrix = matrix.scale(scaleX, scaleY, aroundPoint);
        var zero = matrix.transformPoint(new Point_1.Point(0, 0));
        var res = [];
        arrPath.forEach(function (obj) {
            if (PathUtils.isPoint(obj)) {
                var newPoint = matrix.transformPoint(obj);
                if (updateSource) {
                    obj.x = newPoint.x - zero.x;
                    obj.y = newPoint.y - zero.y;
                }
                else {
                    res.push(new Point_1.Point(newPoint.x - zero.x, newPoint.y - zero.y));
                }
            }
            else if (!updateSource) {
                res.push(obj);
            }
        });
        return updateSource ? arrPath : res;
    };
    PathUtils.rotatePath = function (arrPath, aroundPoint, degAngle, updateSource) {
        updateSource = updateSource != undefined ? updateSource : true;
        var matrix = new Matrix_1.Matrix();
        matrix = matrix.rotate(MathUtils_1.MathUtils.degreeToRadian(degAngle), aroundPoint);
        var res = [];
        arrPath.forEach(function (obj) {
            if (PathUtils.isPoint(obj)) {
                var newPoint = matrix.transformPoint(obj);
                if (updateSource) {
                    obj.x = newPoint.x;
                    obj.y = newPoint.y;
                }
                else {
                    res.push(newPoint);
                }
            }
            else if (!updateSource) {
                res.push(obj);
            }
        });
        return updateSource ? arrPath : res;
    };
    /*
    * containerParams : {width, height, rotation, top, left}
    * */
    PathUtils.convertPathFromLocalToGlobal = function (arrPath, containerParams) {
        // Move to global coords
        var res = PathUtils.movePath(arrPath, containerParams.left, containerParams.top, false);
        var globalCenter = new Point_1.Point(containerParams.left + containerParams.width / 2, containerParams.top + containerParams.height / 2);
        // Rotate around global center
        PathUtils.rotatePath(res, globalCenter, containerParams.rotation);
        return res;
    };
    /*
    * containerParams : {width, height, rotation, top, left}
    * */
    PathUtils.convertPathFromGlobalToLocal = function (arrPath, containerParams) {
        // Unrotate around global center
        var globalCenter = new Point_1.Point(containerParams.left + containerParams.width / 2, containerParams.top + containerParams.height / 2);
        var res = PathUtils.rotatePath(arrPath, globalCenter, -containerParams.rotation, false);
        // Move to local coords
        PathUtils.movePath(res, -containerParams.left, -containerParams.top);
        return res;
    };
    return PathUtils;
}());
exports.PathUtils = PathUtils;
var PathParser = (function () {
    function PathParser(arrPath) {
        this.arrPath = arrPath;
        this.i = -1;
        this.command = '';
        this.previousCommand = '';
        this.start = new Point_1.Point(0, 0);
        this.control = new Point_1.Point(0, 0);
        this.current = new Point_1.Point(0, 0);
    }
    PathParser.prototype.isEnd = function () {
        return this.i >= this.arrPath.length - 1;
    };
    PathParser.prototype.isCommandOrEnd = function () {
        if (this.isEnd()) {
            return true;
        }
        var value = this.arrPath[this.i + 1];
        return ((typeof value == 'string' || value instanceof String) && value.match(/^[A-Za-z]$/) != null);
    };
    PathParser.prototype.isRelativeCommand = function () {
        switch (this.command) {
            case 'm':
            case 'l':
            case 'h':
            case 'v':
            case 'c':
            case 's':
            case 'q':
            case 't':
            case 'a':
            case 'z':
                return true;
        }
        return false;
    };
    PathParser.prototype.getToken = function () {
        this.i++;
        return this.arrPath[this.i];
    };
    PathParser.prototype.nextCommand = function () {
        this.previousCommand = this.command;
        this.command = this.getToken();
    };
    PathParser.prototype.getPoint = function () {
        var p = this.getToken();
        return this.makeAbsolute(p);
    };
    PathParser.prototype.getAsControlPoint = function () {
        var p = this.getPoint();
        this.control = p;
        return p;
    };
    PathParser.prototype.getAsCurrentPoint = function () {
        var p = this.getPoint();
        this.current = p;
        return p;
    };
    PathParser.prototype.getReflectedControlPoint = function () {
        if (this.previousCommand instanceof String &&
            this.previousCommand.toLowerCase() != 'c' &&
            this.previousCommand.toLowerCase() != 's' &&
            this.previousCommand.toLowerCase() != 'q' &&
            this.previousCommand.toLowerCase() != 't') {
            return this.current;
        }
        // reflect point
        var p = new Point_1.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
        return p;
    };
    PathParser.prototype.makeAbsolute = function (p) {
        if (this.isRelativeCommand()) {
            p.x += this.current.x;
            p.y += this.current.y;
        }
        return p;
    };
    return PathParser;
}());
exports.PathParser = PathParser;
//# sourceMappingURL=PathUtils.js.map