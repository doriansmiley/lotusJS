/**
 * Created by dsmiley on 8/1/17.
 */
import { Subject } from 'lavenderjs/lib';
import { AbstractComponent } from "./AbstractComponent";
export declare class SkinPart extends Subject {
    private _label;
    private _attribute;
    private _instance;
    constructor(label: string, instance: AbstractComponent, attribute: string);
    readonly label: string;
    element: HTMLElement;
}
