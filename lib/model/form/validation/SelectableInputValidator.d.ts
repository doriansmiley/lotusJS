import { AbstractValidator } from "./AbstractValidator";
import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 10/10/17.
 */
export declare class SelectableInputValidator extends AbstractValidator {
    constructor();
    protected setUpBindings(): void;
    protected getValidationErrors(): Lavender.ArrayList;
}
