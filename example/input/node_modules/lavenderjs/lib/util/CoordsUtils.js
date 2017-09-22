"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/19/17.
 */
var CoordsUtils = (function () {
    function CoordsUtils() {
    }
    CoordsUtils.globalToLocal = function (container, pageX, pageY) {
        var position = CoordsUtils.offset(container);
        return new Offset(pageX - position.left, pageY - position.top);
    };
    CoordsUtils.offset = function (element) {
        var win, box = { top: 0, left: 0 }, elem = element, doc = elem && elem.ownerDocument;
        if (!doc) {
            return;
        }
        var docElem = doc.documentElement;
        // Make sure it's not a disconnected DOM node
        if (!docElem.contains(elem)) {
            return box;
        }
        box = elem.getBoundingClientRect();
        win = CoordsUtils.getWindow(doc);
        return {
            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        };
    };
    CoordsUtils.getWindow = function (elem) {
        var returnValue = CoordsUtils.isWindow(elem) ?
            elem :
            elem.nodeType === 9 ?
                elem['defaultView'] || elem['parentWindow'] : null;
        return returnValue;
    };
    CoordsUtils.isWindow = function (elem) {
        return elem != null && elem.hasOwnProperty('window') && elem == elem['window'];
    };
    return CoordsUtils;
}());
exports.CoordsUtils = CoordsUtils;
var Offset = (function () {
    function Offset(top, left) {
        this.top = top;
        this.left = left;
    }
    return Offset;
}());
exports.Offset = Offset;
//# sourceMappingURL=CoordsUtils.js.map