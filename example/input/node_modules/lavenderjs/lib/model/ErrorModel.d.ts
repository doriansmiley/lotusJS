/**
 * Created by dsmiley on 5/17/17.
 */
import { Subject } from './observable/Subject';
import { ArrayList } from './list/ArrayList';
export declare class ErrorModel extends Subject {
    private _appError;
    private _errors;
    constructor();
    appError: boolean;
    errors: ArrayList;
    getTitle(): string;
    getMessage(): string;
    addError(error: Error): void;
    clear(): void;
}
