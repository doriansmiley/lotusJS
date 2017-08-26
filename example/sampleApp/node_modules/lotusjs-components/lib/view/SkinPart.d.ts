/**
 * Created by dsmiley on 8/1/17.
 */
import * as Lavender from 'lavenderjs/lib';
import { AbstractComponent } from "./AbstractComponent";
export declare class SkinPart extends Lavender.Subject {
    private _label;
    private _attribute;
    private _instance;
    constructor(label: string, instance: AbstractComponent, attribute: string);
    readonly label: string;
    element: HTMLElement;
}
