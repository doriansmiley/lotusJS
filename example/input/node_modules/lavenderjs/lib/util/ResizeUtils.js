"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResizeUtils = (function () {
    function ResizeUtils() {
    }
    ResizeUtils.getScaleToFill = function (objSize, sizeToFill) {
        var scale = (sizeToFill.height / sizeToFill.width) > (objSize.height / objSize.width) ? (sizeToFill.height / objSize.height) : (sizeToFill.width / objSize.width);
        return scale;
    };
    ResizeUtils.getScaleToFit = function (objSize, sizeToFit) {
        return Math.min(sizeToFit.width / objSize.width, sizeToFit.height / objSize.height);
    };
    return ResizeUtils;
}());
exports.ResizeUtils = ResizeUtils;
;
//# sourceMappingURL=ResizeUtils.js.map