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
var AbstractValidator_1 = require("./AbstractValidator");
var Lavender = require("lavenderjs/lib");
var ValidationError_1 = require("./ValidationError");
/**
 * Created by dsmiley on 10/10/17.
 */
var TextInputValidator = (function (_super) {
    __extends(TextInputValidator, _super);
    function TextInputValidator() {
        return _super.call(this) || this;
    }
    TextInputValidator.prototype.setUpBindings = function () {
        for (var i = 0; i < this.source.collection.length; i++) {
            //ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'value', this, 'validateOnChange');
        }
    };
    //iterate over model objects and ensure all required objects have some text
    TextInputValidator.prototype.getValidationErrors = function () {
        var returnList = new Lavender.ArrayList();
        for (var i = 0; i < this.source.collection.length; i++) {
            var item = this.source.collection.getItemAt(i);
            if (item.required && (!item.nonFormattedValue || item.nonFormattedValue.length <= 0)) {
                returnList.addItem(new ValidationError_1.ValidationError('required', 'form.required', item.label + ' is required'));
            }
        }
        return returnList; //returns ArrayList of SpiSdk.ValidationError instances
    };
    return TextInputValidator;
}(AbstractValidator_1.AbstractValidator));
exports.TextInputValidator = TextInputValidator;
//# sourceMappingURL=TextInputValidator.js.map