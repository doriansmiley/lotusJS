"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractValidator_1 = require("./AbstractValidator");
const Lavender = require("lavenderjs/lib");
const ValidationError_1 = require("./ValidationError");
/**
 * Created by dsmiley on 10/10/17.
 */
class SelectableInputValidator extends AbstractValidator_1.AbstractValidator {
    constructor() {
        super();
    }
    setUpBindings() {
        this.binder.bind(this, 'isValid', this.source, 'isValid');
        this.source.isValid = this.isValid;
        for (let i = 0; i < this.source.collection.length; i++) {
            //ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'selected', this, 'validateOnChange');
        }
    }
    //iterate over model objects and ensure all required objects have some text
    getValidationErrors() {
        let returnList = new Lavender.ArrayList();
        //if the model requires a selection ensure there is one
        if (this.source.selectionRequired) {
            let itemSelected = false;
            let groupName;
            for (let i = 0; i < this.source.collection.length; i++) {
                groupName = this.source.collection.getItemAt(i).name; //group name is the same for all items
                if (this.source.collection.getItemAt(i).selected) {
                    itemSelected = true;
                    break;
                }
            }
            //at least one item must be selected
            if (!itemSelected) {
                returnList.addItem(new ValidationError_1.ValidationError('selected', 'form.selectionRequired', groupName + ' must have a selection.'));
            }
        }
        return returnList; //returns ArrayList of SpiSdk.ValidationError instances
    }
}
exports.SelectableInputValidator = SelectableInputValidator;
//# sourceMappingURL=SelectableInputValidator.js.map