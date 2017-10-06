/**
 * Created by dsmiley on 9/22/17.
 */
import { AbstractSelectableFormInput } from "./AbstractSelectableFormInput";
export declare type ListItemValue = {
    label: string;
    value: any;
};
export declare class ListItemView extends AbstractSelectableFormInput {
    private _option;
    constructor();
    option: HTMLOptionElement;
    protected refreshView(selected: boolean): void;
    onClick(event: Event): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    destroy(): void;
}
