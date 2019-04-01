"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextInputValidator_1 = require("./TextInputValidator");
const Lavender = require("lavenderjs/lib");
const ValidationError_1 = require("./ValidationError");
/**
 * Created by dsmiley on 10/10/17.
 */
class PhoneNumberValidator extends TextInputValidator_1.TextInputValidator {
    constructor() {
        super();
    }
    //iterate over model objects and ensure all required objects have some text
    getValidationErrors() {
        let returnList = new Lavender.ArrayList();
        for (let i = 0; i < this.source.collection.length; i++) {
            let item = this.source.collection.getItemAt(i);
            //new String('(555) 555-5555').replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/)
            if (item.required && (!item.nonFormattedValue || item.nonFormattedValue.length <= 0 || !item.nonFormattedValue.replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/))) {
                returnList.addItem(new ValidationError_1.ValidationError('required', 'form.invalidPhone', item.label + ' is not a valid phone number'));
            }
        }
        return returnList; //returns ArrayList of SpiSdk.ValidationError instances
    }
}
exports.PhoneNumberValidator = PhoneNumberValidator;
//# sourceMappingURL=PhoneNumberValidator.js.map