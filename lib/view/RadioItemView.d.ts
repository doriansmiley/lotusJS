/**
 * Created by dsmiley on 9/22/17.
 */
import { AbstractItemView } from "./AbstractItemView";
export declare type RadioItemValue = {
    label: string;
    value: any;
    name: string;
    selected?: boolean;
};
export declare class RadioItemView extends AbstractItemView {
    private _radio;
    private _label;
    constructor();
    radio: HTMLInputElement;
    label: HTMLLabelElement;
    onClick(event: Event): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    destroy(): void;
}
