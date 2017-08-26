"use strict";
/**
 * Created by dsmiley on 5/18/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserInfo = (function () {
    function BrowserInfo(browser, version) {
        this.browser = browser;
        this.version = version;
    }
    return BrowserInfo;
}());
exports.BrowserInfo = BrowserInfo;
var BrowserUtils = (function () {
    function BrowserUtils() {
    }
    BrowserUtils.uaMatch = function (ua) {
        ua = ua.toLowerCase();
        var match = /(ipad).*(?:safari)[ \/]([\w.]+)/.exec(ua) ||
            /(android)[ chrome\/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(firefox)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            /trident.*rv[ :]*[1-9]\d\./.exec(ua.toLowerCase()) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];
        //IE 11+ changed user agents, AWESOME!!! More info here: http://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
        //We need to reset to the expected id forIE
        if (/trident.*rv[ :]*[1-9]\d\./.exec(ua.toLowerCase())) {
            match[1] = 'msie'; //reset to msie
            match[2] = /[1-9]\d\./.exec(ua);
        }
        var browser = match[1] || "";
        var version = match[2] || "0";
        return new BrowserInfo(browser, version);
    };
    BrowserUtils.getBrowser = function () {
        var returnValue = new BrowserInfo('nodeJS', 'nodeJS');
        try {
            if (navigator) {
                returnValue = BrowserUtils.uaMatch(navigator.userAgent);
            }
        }
        catch (e) {
            console.log(e.stack);
        }
        return returnValue;
    };
    return BrowserUtils;
}());
exports.BrowserUtils = BrowserUtils;
//# sourceMappingURL=BrowserUtils.js.map