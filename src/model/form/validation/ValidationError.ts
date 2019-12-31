/**
 * Created by dsmiley on 10/10/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {InputModel} from "../InputModel";
export class ValidationError extends Lavender.Subject {

    private _property: string;
    private _errorCode: string;
    private _errorMessage: string;

    constructor(property: string, errorCode: string, errorMessage: string) {
        super();
        this.property = property;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    get property(): string {
        return this._property;
    }

    set property(value: string) {
        this._property = value;
        this.notify(value, "property");
    }

    get errorCode(): string {
        return this._errorCode;
    }

    set errorCode(value: string) {
        this._errorCode = value;
        this.notify(value, "errorCode");
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        this._errorMessage = value;
        this.notify(value, "errorMessage");
    }

    public destroy(): void{
        this.property = null;
        this.errorCode = null;
        this.errorMessage = null;
    }

}