/**
 * Created by dsmiley on 10/9/17.
 */
import { AbstractCollectionView } from "./AbstractCollectionView";
import * as Lavender from 'lavenderjs/lib';
export declare class FormCollectionView extends AbstractCollectionView {
    static INPUT: number;
    static VALIDATION_ERROR: number;
    static SUBMIT: number;
    static ERROR: number;
    protected _state: number;
    protected _validationWarning: HTMLElement;
    protected _validationWarningDisplay: string;
    protected _inputState: HTMLElement;
    protected _inputStateDisplay: string;
    protected _submitState: HTMLElement;
    protected _submitStateDisplay: string;
    protected _errorState: HTMLElement;
    protected _errorStateDisplay: string;
    protected _error: HTMLElement;
    protected _errorDisplay: string;
    protected _submit: HTMLElement;
    protected _clear: HTMLElement;
    protected _back: HTMLElement;
    constructor();
    submit: HTMLElement;
    clear: HTMLElement;
    back: HTMLElement;
    error: HTMLElement;
    state: number;
    validationWarning: HTMLElement;
    inputState: HTMLElement;
    submitState: HTMLElement;
    errorState: HTMLElement;
    protected clearErrors(): void;
    protected addErrors(errors: Lavender.ArrayList): void;
    protected onSubmit(event: Event): void;
    protected onClear(event: Event): void;
    reset(): void;
    protected onBack(event: Event): void;
    protected resolveState(state: number, oldState: any, errors?: Lavender.ArrayList): void;
    onError(error: Error): void;
    onReady(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    destroy(): void;
}
