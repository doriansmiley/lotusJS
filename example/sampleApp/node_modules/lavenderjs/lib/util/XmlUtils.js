"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/11/17.
 */
var XmlUtils = (function () {
    function XmlUtils() {
    }
    XmlUtils.createXMLDocument = function (sMyString) {
        var oParser = new DOMParser();
        return oParser.parseFromString(sMyString, "text/xml");
    };
    XmlUtils.getXmlStringFromElement = function (element) {
        var xmlString = (new XMLSerializer()).serializeToString(element);
        return xmlString;
    };
    return XmlUtils;
}());
exports.XmlUtils = XmlUtils;
//# sourceMappingURL=XmlUtils.js.map