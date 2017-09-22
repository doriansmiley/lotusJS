/**
 * Created by dsmiley on 9/21/17.
 */
import { AbstractComponent } from "./AbstractComponent";
export declare class Input extends AbstractComponent {
    private _inputSkinPart;
    private _type;
    constructor(type?: string);
    inputSkinPart: HTMLInputElement;
    type: string;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    onChange(event: Event): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    destroy(): void;
}
