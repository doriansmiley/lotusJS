/**
 * Created by dsmiley on 9/22/17.
 */
import { AbstractSelectableFormInput } from "./AbstractSelectableFormInput";
export declare class RadioItemView extends AbstractSelectableFormInput {
    private _radio;
    private _label;
    constructor();
    radio: HTMLInputElement;
    label: HTMLLabelElement;
    onClick(event: Event): void;
    protected refreshView(selected: boolean): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    destroy(): void;
}
