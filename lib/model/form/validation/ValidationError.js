"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 10/10/17.
 */
const Lavender = require("lavenderjs/lib");
class ValidationError extends Lavender.Subject {
    constructor(property, errorCode, errorMessage) {
        super();
        this.property = property;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    get property() {
        return this._property;
    }
    set property(value) {
        this._property = value;
        this.notify(value, "property");
    }
    get errorCode() {
        return this._errorCode;
    }
    set errorCode(value) {
        this._errorCode = value;
        this.notify(value, "errorCode");
    }
    get errorMessage() {
        return this._errorMessage;
    }
    set errorMessage(value) {
        this._errorMessage = value;
        this.notify(value, "errorMessage");
    }
    destroy() {
        this.property = null;
        this.errorCode = null;
        this.errorMessage = null;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map