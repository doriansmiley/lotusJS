"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.substitute = function (str, rest) {
        if (str === null) {
            return '';
        }
        // Replace all of the parameters in the msg string.
        var len = rest.length;
        var args = [];
        if (len == 1 && rest[0] instanceof Array) {
            args = rest[0];
            len = args.length;
        }
        else {
            args = rest;
        }
        for (var i = 0; i < len; i++) {
            str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i]);
        }
        return str;
    };
    StringUtil.compressSpaces = function (str) {
        return str.replace(/[\s\r\t\n]+/gm, ' ');
    };
    StringUtil.trim = function (str) {
        if (str == null)
            return '';
        var startIndex = 0;
        while (StringUtil.isWhitespace(str.charAt(startIndex)))
            ++startIndex;
        var endIndex = str.length - 1;
        while (StringUtil.isWhitespace(str.charAt(endIndex)))
            --endIndex;
        if (endIndex >= startIndex)
            return str.slice(startIndex, endIndex + 1);
        else
            return '';
    };
    StringUtil.isWhitespace = function (character) {
        switch (character) {
            case ' ':
            case '\t':
            case '\r':
            case '\n':
            case '\f':
                return true;
            default:
                return false;
        }
    };
    StringUtil.convertCharCodesToString = function (codes) {
        var charArray = codes.split('_');
        var returnValue = new String();
        //this first position in the array is the prefix spi_
        for (var i = 1; i < charArray.length; i++) {
            returnValue += String.fromCharCode(parseInt(charArray[i], 10));
        }
        return returnValue;
    };
    StringUtil.fixedCharCodeAt = function (str, idx) {
        // ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
        // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // false
        idx = idx || 0;
        var code = str.charCodeAt(idx);
        var hi, low;
        // High surrogate (could change last hex to 0xDB7F to treat high
        // private surrogates as single characters)
        if (0xD800 <= code && code <= 0xDBFF) {
            hi = code;
            low = str.charCodeAt(idx + 1);
            if (isNaN(low)) {
                throw new Error('StringUtil.fixedCharCodeAt: High surrogate not followed by low surrogate in fixedCharCodeAt()');
            }
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }
        if (0xDC00 <= code && code <= 0xDFFF) {
            // We return false to allow loops to skip this iteration since should have
            // already handled high surrogate above in the previous iteration
            return false;
            /*hi = str.charCodeAt(idx-1);
             low = code;
             return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
        }
        return code;
    };
    return StringUtil;
}());
exports.StringUtil = StringUtil;
//# sourceMappingURL=StringUtil.js.map