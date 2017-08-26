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
var AsyncOperationModel = (function (_super) {
    __extends(AsyncOperationModel, _super);
    function AsyncOperationModel() {
        var _this = _super.call(this) || this;
        _this._asyncOperationCount = 0;
        _this._asyncOperationComplete = true;
        return _this;
    }
    Object.defineProperty(AsyncOperationModel.prototype, "asyncOperationCount", {
        get: function () {
            return this._asyncOperationCount;
        },
        set: function (value) {
            this._asyncOperationCount = value;
            this.notify(value, "asyncOperationCount");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncOperationModel.prototype, "asyncOperationComplete", {
        get: function () {
            return this.asyncOperationCount <= 0;
        },
        set: function (value) {
            this._asyncOperationComplete = value;
            this.notify(value, 'asyncOperationComplete');
        },
        enumerable: true,
        configurable: true
    });
    AsyncOperationModel.prototype.addAsyncOperation = function () {
        this.asyncOperationComplete = false;
        this.asyncOperationCount += 1;
    };
    AsyncOperationModel.prototype.removeAsyncOperation = function () {
        this.asyncOperationCount -= 1;
        if (!this.asyncOperationCount) {
            this.asyncOperationComplete = true;
        }
    };
    return AsyncOperationModel;
}(Subject_1.Subject));
exports.AsyncOperationModel = AsyncOperationModel;
//# sourceMappingURL=AsyncOperationModel.js.map