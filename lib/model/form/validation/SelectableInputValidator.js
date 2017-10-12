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
var SelectableInputValidator = (function (_super) {
    __extends(SelectableInputValidator, _super);
    function SelectableInputValidator() {
        return _super.call(this) || this;
    }
    SelectableInputValidator.prototype.setUpBindings = function () {
        for (var i = 0; i < this.source.collection.length; i++) {
            //ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'selected', this, 'validateOnChange');
        }
    };
    //iterate over model objects and ensure all required objects have some text
    SelectableInputValidator.prototype.getValidationErrors = function () {
        var returnList = new Lavender.ArrayList();
        //if the model requires a selection ensure there is one
        if (this.source.selectionRequired) {
            var itemSelected = false;
            var groupName = void 0;
            for (var i = 0; i < this.source.collection.length; i++) {
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
    };
    return SelectableInputValidator;
}(AbstractValidator_1.AbstractValidator));
exports.SelectableInputValidator = SelectableInputValidator;
//# sourceMappingURL=SelectableInputValidator.js.map