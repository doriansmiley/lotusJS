import { AbstractComponent } from "./AbstractComponent";
/**
 * Created by dsmiley on 8/4/17.
 */
export declare abstract class AbstractItemView extends AbstractComponent {
    private _model;
    constructor();
    model: Object;
    setElementDisplay(element: HTMLElement, display: string): void;
    onModelChange(value: Object): void;
    resetState(): void;
    destroy(): void;
}
