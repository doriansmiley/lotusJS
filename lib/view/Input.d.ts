/**
 * Created by dsmiley on 9/21/17.
 */
import { AbstractItemView } from "./AbstractItemView";
export declare class Input extends AbstractItemView {
    private _inputSkinPart;
    private _type;
    private _value;
    constructor(type?: string);
    inputSkinPart: HTMLInputElement;
    type: string;
    value: string;
    attachValidationClass(classToAdd: string, classToRemove: string): void;
    onModelChange(value: Object): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    onChange(event: Event): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    destroy(): void;
}
