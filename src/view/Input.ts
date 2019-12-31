/**
 * Created by dsmiley on 9/21/17.
 */
import {AbstractItemView} from "./AbstractItemView";
import {SkinPart} from "./SkinPart";
import {InputEvent} from "../control/events/InputEvent";
import {InputModel} from "../model/form/InputModel";

export class Input extends AbstractItemView{
    private _inputSkinPart: HTMLInputElement;
    private _label: HTMLInputElement;
    private _type: string;
    private _value: string;

    constructor(type?: string){
        super();
        this.type = type;
    }


    get label(): HTMLInputElement {
        return this._label;
    }

    set label(value: HTMLInputElement) {
        this._label = value;
        this.notify( value, 'label' );
    }

    get inputSkinPart(): HTMLInputElement {
        return this._inputSkinPart;
    }

    set inputSkinPart(value: HTMLInputElement) {
        this._inputSkinPart = value;
        this.notify( value, 'inputSkinPart' );
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
        this.notify( value, 'type' );
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
        //manually this.inputSkinPart.value if there are no two way bindings
        if(this.inputSkinPart){
            this.inputSkinPart.value = value;
        }
        this.notify( value, 'value' );
    }

    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    public attachValidationClass(classToAdd: string, classToRemove: string): void{
        if(this.inputSkinPart){
            this.inputSkinPart.classList.remove(classToRemove);
            this.inputSkinPart.classList.add(classToAdd);
        }
    }

    //TODO: add invalid classes and bindings to trigger attachment of invlaid styles when model's isValid state changes
    public onModelChange(value: Record<string, any>): void{
        super.onModelChange(value);
        if(value instanceof InputModel){
            //set up two way bindings on model
            this.binder.bind(value, 'value', this, 'value');
            this.binder.bind(this, 'value', value, 'value');
            //set the intital value, IMORTANT: do this after bindings are set up to trigger validation
            this.value = value.value;
        }
        if(this.label && value['label']){
            this.label.innerHTML = value['label']
        }
    }

    public defineSkinParts(): void{
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart('input', this, 'inputSkinPart'));
        this.skinParts.addItem(new SkinPart('label', this, 'label'));
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch( part ){
            case 'input':
                //add event listener or whatever else you want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Input.prototype.onSkinPartAdded: part: ' + part);
                this.inputSkinPart.setAttribute('type', this.type)
                this.addEventListeners();
                if(this.model){
                    this.inputSkinPart.value = this.model['value'];
                    //trigger change event to update bidings and trigger validation
                    const evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    this.inputSkinPart.dispatchEvent(evt);
                }
                break;
            case 'label':{
                if(this.model && this.model['label']){
                    this.label.innerHTML = this.model['label'];
                }
                break;
            }
        }
    }

    public onChange(event: Event): void{
        console.log('Lotus.Input.prototype.onChange: input value is ' + (event.target as HTMLInputElement).value);
        console.log('Lotus.Input.prototype.onChange: my id is ' + this.id);
        this.value = this.inputSkinPart.value;
        this.dispatch(new InputEvent(InputEvent.CHANGE, {target:this, originalEvent:event}))
    }

    public addEventListeners(): void{
        super.addEventListeners();
        this.inputSkinPart.addEventListener('change', this.onChange.bind(this));
    }

    public removeEventListeners(): void{
        super.removeEventListeners();
        this.inputSkinPart.removeEventListener('change', this.onChange);
    }

    public destroy(): void{
        super.destroy();
        this.inputSkinPart = null;
    }

}