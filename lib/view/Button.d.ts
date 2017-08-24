import { AbstractComponent } from "./AbstractComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export declare class Button extends AbstractComponent {
    private _buttonSkinPart;
    private _type;
    constructor();
    buttonSkinPart: HTMLElement;
    type: string;
    protected onClick(event: Event): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    destroy(): void;
}
