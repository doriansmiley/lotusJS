"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractValidator_1 = require("./AbstractValidator");
const Lavender = require("lavenderjs/lib");
const ValidationError_1 = require("./ValidationError");
/**
 * Created by dsmiley on 10/10/17.
 */
class TextInputValidator extends AbstractValidator_1.AbstractValidator {
    constructor() {
        super();
    }
    setUpBindings() {
        this.binder.bind(this, 'isValid', this.source, 'isValid');
        this.source.isValid = this.isValid;
        for (let i = 0; i < this.source.collection.length; i++) {
            //ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'value', this, 'validateOnChange');
        }
    }
    //iterate over model objects and ensure all required objects have some text
    getValidationErrors() {
        let returnList = new Lavender.ArrayList();
        for (let i = 0; i < this.source.collection.length; i++) {
            let item = this.source.collection.getItemAt(i);
            if (item.required && (!item.nonFormattedValue || item.nonFormattedValue.length <= 0)) {
                returnList.addItem(new ValidationError_1.ValidationError('required', 'form.required', item.label + ' is required'));
            }
        }
        return returnList; //returns ArrayList of SpiSdk.ValidationError instances
    }
}
exports.TextInputValidator = TextInputValidator;
//# sourceMappingURL=TextInputValidator.js.map