import { IValidator } from "./IValidator";
import * as Lavender from 'lavenderjs/lib';
import { InputCollectionModel } from "../InputCollectionModel";
/**
 * Created by dsmiley on 10/10/17.
 */
export declare class AbstractValidator extends Lavender.Subject implements IValidator {
    private _errors;
    private _warnings;
    private _source;
    private _isValid;
    private _hasWarnings;
    private _id;
    constructor();
    errors: Lavender.ArrayList;
    warnings: Lavender.ArrayList;
    source: InputCollectionModel;
    isValid: boolean;
    hasWarnings: boolean;
    id: string;
    protected getValidationResult(): boolean;
    protected getValidationWarningsResult(): boolean;
    protected getValidationErrors(): Lavender.ArrayList;
    protected getValidationWarnings(): Lavender.ArrayList;
    protected validateOnChange(value: string): void;
    protected setUpBindings(): void;
    protected addEventListeners(): void;
    validate(): boolean;
    init(): void;
    destroy(): void;
}
