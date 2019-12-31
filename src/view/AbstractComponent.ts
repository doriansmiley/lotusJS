import {IComponent} from "./IComponent";
import * as Lavender from 'lavenderjs/lib';
import {IContext} from "../context/IContext";
import {SkinPartList} from "./SkinPartList";
import {LotusHTMLElement} from "../context/LotusHTMLElement";
import {ComponentEvent} from "../control/events/ComponentEvent";
/**
 * Created by dsmiley on 7/26/17.
 */
export abstract class AbstractComponent extends Lavender.Subject implements IComponent {
    private _element: LotusHTMLElement;
    private _context: IContext;
    private _ready = false;
    private _id: number = Math.random();
    private _skinParts: SkinPartList = new SkinPartList();
    private _isValid = false;

    //IMPORTANT: you have to initialize instance attributes that are not defined using accessor methods or they will dropped by the compiler.
    public validClass: string = null;
    public invalidClass: string = null;

    //placeholders for mixins, required for the compiler
    handlersByEventName: Record<string, any>;
    addEventListener: (  event: string, instance: Record<string, any>, handler: string ) => void;
    canListen: (  eventType: string, instance: Record<string, any>, handler: string )  => boolean;
    removeEventListener: ( event: string, instance: Record<string, any>, handler: string )  => void;
    removeAllEventListeners: ( instance: Record<string, any> )  =>  void;
    dispatch: ( event: Lavender.IEvent )  =>  void;

    constructor() {
        super();
        Lavender.ObjectUtils.mixin(Lavender.EventDispatcher, AbstractComponent, this);
    }

    get element(): LotusHTMLElement {
        return this._element;
    }

    set element(val: LotusHTMLElement) {
        this._element = val;
        if( this._element !== null && this._element !== undefined ) {
            this._element.getComponentInstance = this.getComponentInstance.bind(this);
        }
        this.notify( val, 'element' );
    }

    get context(): IContext {
        return this._context;
    }

    set context(val: IContext) {
        this._context = val;
        this.notify( val, 'context' );
    }

    get ready(): boolean {
        return this._ready;
    }

    set ready(val: boolean) {
        this._ready = val;
        this.notify( val, 'ready' );
    }

    get id(): number {
        return this._id;
    }

    set id(val: number) {
        this._id = val;
        this.notify( val, 'id' );
    }

    get skinParts(): SkinPartList {
        return this._skinParts;
    }

    set skinParts(val: SkinPartList) {
        this._skinParts = val;
        this.notify( val, 'skinParts' );
    }

    get isValid(): boolean {
        return this._isValid;
    }

    set isValid(value: boolean) {
        this._isValid = value;
        this.notify(value, 'isValid');
        if(this.isValid && this.validClass) {
            this.attachValidationClass(this.validClass, this.invalidClass);
        }else if(!this.isValid && this.invalidClass) {
            this.attachValidationClass(this.invalidClass, this.validClass);
        }
    }

    //stub for override
    public attachValidationClass(classToAdd: string, classToRemove: string): void{

    }

    public init(): void{
        this.addAttributes();
        this.defineSkinParts();
        this.addSkinParts();
    }

    public addAttributes(): void{
        for( let i=0; i < this.element.attributes.length; i++ ) {
            const attribute = this.element.attributes[i];
            if( attribute.name.indexOf('attribute') >= 0 ) {
                const index = attribute.name.indexOf('attribute') + 10;
                const newProp = attribute.name.substring(index);//remove prefix
                //convert dashes to camel case
                //LEGACY: using the data- prefix should trigger camel case on dash automagically
                const camelCased = newProp.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                const properties: Array<string> = this.getAllPropertyNames(this);
                if( properties.indexOf(camelCased) >= 0 ) {
                    this[camelCased] = attribute.value;
                }
            }
        }
    }

    public getAllPropertyNames(obj: Record<string, any>, iterateSelfBool=true, iteratePrototypeBool=true): Array<string> {
        const props: Array<string> = [];

        do {
            if (iterateSelfBool) {
                Object.getOwnPropertyNames(obj).forEach(function(prop) {
                    if (props.indexOf(prop) === -1) {
                        props.push(prop);
                    }
                });
            }
            if (!iteratePrototypeBool) {
                break;
            }
            iterateSelfBool = true;
        } while (obj = Object.getPrototypeOf(obj));

        return props;
    }

    public addSkinParts(): void{
        if( this.element.getAttribute('data-skin-part') !== null && this.element.getAttribute('data-skin-part') !== undefined ) {
            this.addSkinPart(this.element.getAttribute('data-skin-part'), this.element);
        }
        const skinPartsNodeList = this.element.querySelectorAll('[data-skin-part]');
        for (let i = 0; i < skinPartsNodeList.length; i++) {
            // iterate over matches
            //call addSkinPart on the component passing skin part attribute value and the element
            this.addSkinPart(skinPartsNodeList[i].getAttribute('data-skin-part'), skinPartsNodeList[i]);
        }
    }

    public addSkinPart(part: string, element: Element): void{
        //skip undefined skin parts
        if( this.skinParts.skinPartsByLabel[part] === null || this.skinParts.skinPartsByLabel[part] === undefined ) {
            return null;
        }
        //assign the skin part
        this.skinParts.skinPartsByLabel[part].element = element;
        //notify
        this.onSkinPartAdded(part, this.skinParts.skinPartsByLabel[part].element);
    }

    public onReady(): void{
        this.ready = true;
        this.dispatch(new ComponentEvent(ComponentEvent.READY, {target:this}));
    }

    public getComponentInstance(): IComponent {
        return this;
    }

    public created(element: LotusHTMLElement): void{
        console.log('AbstractComponent.created called');
        this.element = element;
        this.init();
        this.onReady();
    }

    public destroy(): void{
        this.removeEventListeners();
        this.binder.unbindAll();
        this.binder = null;
        this.element = null;
        this.id = null;
    }

    //stub methods below

    public defineSkinParts(): void{

    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{

    }

    public inserted(element: LotusHTMLElement): void{
        console.log('AbstractComponent.inserted called');
    }

    public removed(element: LotusHTMLElement): void{
        console.log('AbstractComponent.removed called');
    }
    
    public attributeChanged(element: LotusHTMLElement): void{
        console.log('AbstractComponent.attributeChanged called');
    }

    public addEventListeners(): void{

    }

    public removeEventListeners(): void{

    }
}