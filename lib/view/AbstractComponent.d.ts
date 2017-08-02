import { IComponent } from "./IComponent";
import { Subject } from '../../node_modules/lavenderjs/lib';
import { IEventDispatcher } from '../../node_modules/lavenderjs/lib';
import { IEvent } from '../../node_modules/lavenderjs/lib';
import { IContext } from "../context/IContext";
import { SkinPartList } from "./SkinPartList";
import { LotusHTMLElement } from "../context/LotusHTMLElement";
/**
 * Created by dsmiley on 7/26/17.
 */
export declare class AbstractComponent extends Subject implements IComponent, IEventDispatcher {
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
    dispatch: (event: IEvent) => void;
    constructor();
    element: LotusHTMLElement;
    context: IContext;
    ready: boolean;
    id: number;
    skinParts: SkinPartList;
    init(): void;
    addAttributes(): void;
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
