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
var TextInputValidator_1 = require("./TextInputValidator");
var Lavender = require("lavenderjs/lib");
var ValidationError_1 = require("./ValidationError");
/**
 * Created by dsmiley on 10/10/17.
 */
var PhoneNumberValidator = (function (_super) {
    __extends(PhoneNumberValidator, _super);
    function PhoneNumberValidator() {
        return _super.call(this) || this;
    }
    //iterate over model objects and ensure all required objects have some text
    PhoneNumberValidator.prototype.getValidationErrors = function () {
        var returnList = new Lavender.ArrayList();
        for (var i = 0; i < this.source.collection.length; i++) {
            var item = this.source.collection.getItemAt(i);
            //new String('(555) 555-5555').replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/)
            if (item.required && (!item.nonFormattedValue || item.nonFormattedValue.length <= 0 || !item.nonFormattedValue.replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/))) {
                returnList.addItem(new ValidationError_1.ValidationError('required', 'form.invalidPhone', item.label + ' is not a valid phone number'));
            }
        }
        return returnList; //returns ArrayList of SpiSdk.ValidationError instances
    };
    return PhoneNumberValidator;
}(TextInputValidator_1.TextInputValidator));
exports.PhoneNumberValidator = PhoneNumberValidator;
//# sourceMappingURL=PhoneNumberValidator.js.map