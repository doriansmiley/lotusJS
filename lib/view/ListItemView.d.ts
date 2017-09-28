/**
 * Created by dsmiley on 9/22/17.
 */
import { AbstractItemView } from "./AbstractItemView";
export declare type ListItemValue = {
    label: string;
    value: any;
};
export declare class ListItemView extends AbstractItemView {
    private _option;
    constructor();
    option: HTMLOptionElement;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    destroy(): void;
}
