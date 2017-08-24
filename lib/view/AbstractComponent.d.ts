import { IComponent } from "./IComponent";
import * as Lavender from 'lavenderjs/lib';
import { IContext } from "../context/IContext";
import { SkinPartList } from "./SkinPartList";
import { LotusHTMLElement } from "../context/LotusHTMLElement";
/**
 * Created by dsmiley on 7/26/17.
 */
export declare abstract class AbstractComponent extends Lavender.Subject implements IComponent, Lavender.IEventDispatcher {
    private _element;
    private _context;
    private _ready;
    private _id;
    private _skinParts;
    handlersByEventName: Object;
    addEventListener: (event: string, instance: Object, handler: string) => void;
    canListen: (eventType: string, instance: Object, handler: string) => boolean;
    removeEventListener: (event: string, instance: Object, handler: string) => void;
    removeAllEventListeners: (instance: Object) => void;
    dispatch: (event: Lavender.IEvent) => void;
    constructor();
    element: LotusHTMLElement;
    context: IContext;
    ready: boolean;
    id: number;
    skinParts: SkinPartList;
    init(): void;
    addAttributes(): void;
    getAllPropertyNames(obj: Object, iterateSelfBool?: boolean, iteratePrototypeBool?: boolean): Array<string>;
    addSkinParts(): void;
    addSkinPart(part: string, element: Element): void;
    onReady(): void;
    getComponentInstance(): IComponent;
    created(element: LotusHTMLElement): void;
    destroy(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    inserted(element: LotusHTMLElement): void;
    removed(element: LotusHTMLElement): void;
    attributeChanged(element: LotusHTMLElement): void;
    addEventListeners(): void;
    removeEventListeners(): void;
}
