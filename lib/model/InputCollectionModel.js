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
 * Created by dsmiley on 10/10/17.
 */
var Lavender = require("lavenderjs/lib");
var InputCollectionModel = (function (_super) {
    __extends(InputCollectionModel, _super);
    function InputCollectionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InputCollectionModel.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.notify(value, 'type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputCollectionModel.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (value) {
            this._collection = value;
            this.notify(value, 'collection');
        },
        enumerable: true,
        configurable: true
    });
    InputCollectionModel.prototype.validate = function () {
        var results = [];
        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection.getItemAt(i);
            if (item.validate && !item.validate()) {
                //model is invalid, add to invalid results
                results.push(item);
            }
        }
        //return the failed results
        return results;
    };
    InputCollectionModel.prototype.clear = function () {
        //reset all form fields by clearing InputModel values
        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection.getItemAt(i);
            switch (this.type) {
                case InputCollectionModel.TYPE_INPUT:
                    item.value = '';
                    break;
                case InputCollectionModel.TYPE_FILE:
                    //TODO: fogure out how to reset file collection view using model. Probably need a ne wmodel attribute
                    break;
                case InputCollectionModel.TYPE_RADIO_GROUP:
                case InputCollectionModel.TYPE_LIST:
                    item.selected = false;
                    break;
            }
        }
    };
    InputCollectionModel.TYPE_INPUT = 0;
    InputCollectionModel.TYPE_LIST = 1;
    InputCollectionModel.TYPE_RADIO_GROUP = 2;
    InputCollectionModel.TYPE_FILE = 3;
    return InputCollectionModel;
}(Lavender.Subject));
exports.InputCollectionModel = InputCollectionModel;
//# sourceMappingURL=InputCollectionModel.js.map