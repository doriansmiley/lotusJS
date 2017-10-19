import { TextInputValidator } from "./TextInputValidator";
import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 10/10/17.
 */
export declare class PhoneNumberValidator extends TextInputValidator {
    constructor();
    protected getValidationErrors(): Lavender.ArrayList;
}
