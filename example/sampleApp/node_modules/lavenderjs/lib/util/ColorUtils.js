"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/18/17.
 */
var ColorUtils = (function () {
    function ColorUtils() {
    }
    ColorUtils.rgb2hex = function (rgb) {
        var result = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (result === null || result === undefined || result.length <= 0) {
            return null;
        }
        return "#" +
            ("0" + parseInt(result[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(result[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(result[3], 10).toString(16)).slice(-2);
    };
    ColorUtils.hexToRgb = function (hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            var returnValue = Number('0x' + c.join(''));
            return 'rgb(' + [(returnValue >> 16) & 255, (returnValue >> 8) & 255, returnValue & 255].join(',') + ')';
        }
        throw new Error('Bad Hex');
    };
    ColorUtils.hexToRgbA = function (hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            var returnValue = Number('0x' + c.join(''));
            return 'rgba(' + [(returnValue >> 16) & 255, (returnValue >> 8) & 255, returnValue & 255].join(',') + ',1)';
        }
        throw new Error('Bad Hex');
    };
    ColorUtils.hexToRgbArray = function (hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            var returnValue = Number('0x' + c.join(''));
            return [(returnValue >> 16) & 255, (returnValue >> 8) & 255, returnValue & 255];
        }
        throw new Error('Bad Hex');
    };
    ColorUtils.rgbToHsl = function (r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
    };
    ColorUtils.rgbToHsv = function (r, g, b) {
        var min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, v = max;
        v = Math.floor(max / 255 * 100);
        if (max != 0)
            s = Math.floor(delta / max * 100);
        else {
            // black
            return [0, 0, 0];
        }
        if (r == max)
            h = (g - b) / delta; // between yellow & magenta
        else if (g == max)
            h = 2 + (b - r) / delta; // between cyan & yellow
        else
            h = 4 + (r - g) / delta; // between magenta & cyan
        h = Math.floor(h * 60); // degrees
        if (h < 0)
            h += 360;
        return [h, s, v];
    };
    return ColorUtils;
}());
exports.ColorUtils = ColorUtils;
//# sourceMappingURL=ColorUtils.js.map