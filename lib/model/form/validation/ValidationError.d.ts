/**
 * Created by dsmiley on 10/10/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class ValidationError extends Lavender.Subject {
    private _property;
    private _errorCode;
    private _errorMessage;
    constructor(property: string, errorCode: string, errorMessage: string);
    property: string;
    errorCode: string;
    errorMessage: string;
    destroy(): void;
}
