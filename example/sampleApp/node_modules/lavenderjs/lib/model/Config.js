"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 5/17/17.
 */
var Subject_1 = require("./observable/Subject");
var Config = (function (_super) {
    __extends(Config, _super);
    function Config() {
        var _this = _super.call(this) || this;
        _this._webRoot = ''; //path relative to webroot where the application is deployed
        _this._parserCode = undefined; //used to handle service results using a factory patter, see lotusJS examples
        _this._exporterCode = undefined; //used to serialize objects for service payloads using a factory patter, see lotusJS examples
        _this._token = undefined; //used for oAuth authentication scemes and similar token based authentication systems
        _this._serviceCode = undefined; //used for assigning a concrete service implementation
        _this._asyncOperationModel = undefined; //used for assigning a concrete service implementation
        _this._errorModel = undefined; //used for assigning a concrete service implementation
        return _this;
    }
    Object.defineProperty(Config.prototype, "errorModel", {
        get: function () {
            return this._errorModel;
        },
        set: function (value) {
            this._errorModel = value;
            this.notify(value, "errorModel");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "asyncOperationModel", {
        get: function () {
            return this._asyncOperationModel;
        },
        set: function (value) {
            this._asyncOperationModel = value;
            this.notify(value, "asyncOperationModel");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "serviceCode", {
        get: function () {
            return this._serviceCode;
        },
        set: function (value) {
            this._serviceCode = value;
            this.notify(value, "serviceCode");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "baseUrl", {
        get: function () {
            return this._baseUrl;
        },
        set: function (value) {
            this._baseUrl = value;
            this.notify(value, "baseUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "webRoot", {
        get: function () {
            return this._webRoot;
        },
        set: function (value) {
            this._webRoot = value;
            this.notify(value, "webRoot");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "parserCode", {
        get: function () {
            return this._parserCode;
        },
        set: function (value) {
            this._parserCode = value;
            this.notify(value, "parserCode");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "exporterCode", {
        get: function () {
            return this._exporterCode;
        },
        set: function (value) {
            this._exporterCode = value;
            this.notify(value, "exporterCode");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (value) {
            this._token = value;
            this.notify(value, "token");
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}(Subject_1.Subject));
exports.Config = Config;
//# sourceMappingURL=Config.js.map