"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lavender = require("lavenderjs/lib");
/**
 * Created by dsmiley on 10/10/17.
 */
class AbstractValidator extends Lavender.Subject {
    constructor() {
        super();
        this._isValid = false;
        this._hasWarnings = false;
    }
    get errors() {
        return this._errors;
    }
    set errors(value) {
        this._errors = value;
        this.notify(value, "errors");
    }
    get warnings() {
        return this._warnings;
    }
    set warnings(value) {
        this._warnings = value;
        this.notify(value, "warnings");
    }
    get source() {
        return this._source;
    }
    set source(value) {
        this._source = value;
        if (this.source !== null && this.source !== undefined) {
            this.init(); //set up initial state
        }
        this.notify(value, "source");
    }
    get isValid() {
        return this._isValid;
    }
    set isValid(value) {
        this._isValid = value;
        this.notify(value, "isValid");
    }
    get hasWarnings() {
        return this._hasWarnings;
    }
    set hasWarnings(value) {
        this._hasWarnings = value;
        this.notify(value, "hasWarnings");
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
        this.notify(value, "id");
    }
    getValidationResult() {
        return this.errors.length <= 0;
    }
    getValidationWarningsResult() {
        return this.warnings.length > 0;
    }
    //stub for override
    getValidationErrors() {
        return new Lavender.ArrayList(); //returns ArrayList of SpiSdk.ValidationError instances
    }
    //stub for override
    getValidationWarnings() {
        return new Lavender.ArrayList(); //returns ArrayList of SpiSdk.ValidationError instances
    }
    validateOnChange(value) {
        this.validate();
    }
    setUpBindings() {
    }
    addEventListeners() {
    }
    validate() {
        this.errors = this.getValidationErrors(); //get all errors and store
        this.warnings = this.getValidationWarnings();
        this.isValid = this.getValidationResult();
        this.hasWarnings = this.getValidationWarningsResult();
        return this.isValid; //returns true or false, to obtain specific errors use this.errors
    }
    init() {
        this.addEventListeners();
        this.setUpBindings();
        this.validate();
    }
    destroy() {
        this.binder.unbindAll();
        this.binder = null;
        this.source = null;
        this.errors = null;
        this.warnings = null;
    }
}
exports.AbstractValidator = AbstractValidator;
//# sourceMappingURL=AbstractValidator.js.map