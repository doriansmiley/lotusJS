"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Geometry_1 = require("./Geometry");
var Matrix_1 = require("./Matrix");
var MatrixUtils_1 = require("./MatrixUtils");
var Point_1 = require("./Point");
var TransformUtils = (function () {
    function TransformUtils() {
    }
    TransformUtils.calculateMovement = function (originalState, delta) {
        if (!delta) {
            return null;
        }
        var deltaX = delta.x || 0;
        var deltaY = delta.y || 0;
        var res = null;
        if (originalState.hasOwnProperty('left') && originalState.hasOwnProperty('top')) {
            res = { 'geometry': new Geometry_1.Geometry({ left: originalState.left + deltaX, top: originalState.top + deltaY }) };
        }
        else if (originalState.hasOwnProperty('left')) {
            res = { 'left': originalState.left + deltaX };
        }
        else if (originalState.hasOwnProperty('top')) {
            res = { 'top': originalState.top + deltaY };
        }
        return res;
    };
    TransformUtils.calculateResizeAroundAnchorPoint = function (originalState, sizeDelta, anchorPos, proportionalResizer) {
        var dWidth = sizeDelta.width || 0;
        var dHeight = sizeDelta.height || 0;
        anchorPos = anchorPos || TransformUtils.getDefaultAnchorPos();
        if (!originalState.hasOwnProperty('width') || !originalState.hasOwnProperty('height')
            || !originalState.hasOwnProperty('top') || !originalState.hasOwnProperty('left')
            || (!dWidth && !dHeight)) {
            return null;
        }
        var geometry = new Geometry_1.Geometry({ width: originalState.width + dWidth, height: originalState.height + dHeight });
        if (proportionalResizer) {
            proportionalResizer.applyConstraint(originalState, null, geometry, anchorPos);
        }
        var pos = this.getPosAfterResizeAroundAnchorPoint(originalState, geometry, anchorPos);
        if (pos) {
            geometry.update(pos);
        }
        return { geometry: geometry };
    };
    TransformUtils.calculateRotate = function (originalState, deltaAngle) {
        if (!deltaAngle) {
            return null;
        }
        var res = null;
        if (originalState.hasOwnProperty('rotation')) {
            res = { 'rotation': originalState.rotation + deltaAngle };
        }
        return res;
    };
    TransformUtils.getPosAfterResizeAroundAnchorPoint = function (originalState, sizeAfterTransform, anchorPos) {
        if (!originalState.hasOwnProperty('width') || !originalState.hasOwnProperty('height')) {
            return null;
        }
        var dWidth = sizeAfterTransform.hasOwnProperty('width') ? sizeAfterTransform.width - originalState.width : 0;
        var dHeight = sizeAfterTransform.hasOwnProperty('height') ? sizeAfterTransform.height - originalState.height : 0;
        anchorPos = anchorPos || TransformUtils.getDefaultAnchorPos();
        if (!dWidth && !dHeight) {
            return null;
        }
        var posOffset = new Point_1.Point(dWidth * anchorPos.x, dHeight * anchorPos.y);
        if (originalState.hasOwnProperty('rotation') && originalState.rotation) {
            var originalCenterPoint = new Point_1.Point(originalState.width / 2, originalState.height / 2);
            var newCenterPoint = new Point_1.Point(posOffset.x + (originalState.width + dWidth) / 2, posOffset.y + (originalState.height + dHeight) / 2);
            var rotMatrix = new Matrix_1.Matrix();
            // Rotates object around original center point
            rotMatrix = MatrixUtils_1.MatrixUtils.rotate(rotMatrix, originalState.rotation, originalCenterPoint);
            // New left top point position after rotation
            var rotPosOffset = rotMatrix.transformPoint(posOffset);
            // New center point after rotation
            var rotNewCenterPoint = rotMatrix.transformPoint(newCenterPoint);
            var unrotMatrix = new Matrix_1.Matrix();
            // Unrotates object around new center
            unrotMatrix = MatrixUtils_1.MatrixUtils.rotate(unrotMatrix, -originalState.rotation, rotNewCenterPoint);
            posOffset = unrotMatrix.transformPoint(rotPosOffset);
        }
        var pos = { left: originalState.left + posOffset.x, top: originalState.top + posOffset.y };
        return pos;
    };
    TransformUtils.getDefaultAnchorPos = function () {
        return new Point_1.Point(-0.5, -0.5);
    };
    TransformUtils.applyConstraints = function (originalState, currentState, stateAfterTransform, anchorPos, constraints) {
        if (constraints) {
            constraints.forEach(function (constraint) {
                constraint.applyConstraint(originalState, currentState, stateAfterTransform, anchorPos);
            });
        }
    };
    TransformUtils.applyTransform = function (obj, stateAfterTransform) {
        if (!stateAfterTransform) {
            return;
        }
        for (var prop in stateAfterTransform) {
            if (stateAfterTransform.hasOwnProperty(prop) && obj.hasOwnProperty(prop)) {
                obj[prop] = stateAfterTransform[prop];
            }
        }
    };
    return TransformUtils;
}());
exports.TransformUtils = TransformUtils;
;
//# sourceMappingURL=TransformUtils.js.map