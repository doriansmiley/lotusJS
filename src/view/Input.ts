/**
 * Created by dsmiley on 9/21/17.
 */
import {AbstractItemView} from "./AbstractItemView";
import {SkinPart} from "./SkinPart";
import {InputEvent} from "../control/events/InputEvent";
import {InputModel} from "../model/form/InputModel";

export class Input extends AbstractItemView{
    private _inputSkinPart:HTMLInputElement;
    private _type:string;
    private _value:string;

    constructor(type?:string){
        super();
        this.type = type;
    }

    get inputSkinPart():HTMLInputElement {
        return this._inputSkinPart;
    }

    set inputSkinPart(value:HTMLInputElement) {
        this._inputSkinPart = value;
        this.notify( value, 'inputSkinPart' );
    }

    get type():string {
        return this._type;
    }

    set type(value:string) {
        this._type = value;
        this.notify( value, 'type' );
    }

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
        //manually this.inputSkinPart.value if there are no two way bindings
        if(this.inputSkinPart && ( !this.model || !(this.model instanceof InputModel) )){
            this.inputSkinPart.value = value;
        }
        this.notify( value, 'value' );
    }

    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    public attachValidationClass(classToAdd:string, classToRemove:string):void{
        if(this.inputSkinPart){
            this.inputSkinPart.classList.remove(classToRemove);
            this.inputSkinPart.classList.add(classToAdd);
        }
    }

    //TODO: add invalid classes and bindings to trigger attachment of invlaid styles when model's isValid state changes
    public onModelChange(value:Object):void{
        super.onModelChange(value);
        if(value instanceof InputModel){
            //set initial value
            this.value = value.value;
            //set up two way bindings on model
            this.binder.bind(value, 'value', this, 'value');
            this.binder.bind(this, 'value', value, 'value');
            //set up one way binding for text input
            if(this.inputSkinPart){
                this.inputSkinPart.value = value.value;
                this.binder.bind(this, 'value', this.inputSkinPart, 'value');
            }
        }
    }

    public defineSkinParts():void{
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart('input', this, 'inputSkinPart'));
    }

    public onSkinPartAdded(part:string, element:HTMLElement):void{
        super.onSkinPartAdded(part, element);
        switch( part ){
            case 'input':
                //add event listener or whatever else yo want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Input.prototype.onSkinPartAdded: part: ' + part);
                this.inputSkinPart.setAttribute('type', this.type)
                this.addEventListeners();
                break;
        }
    }

    public onChange(event:Event):void{
        console.log('Lotus.Input.prototype.onChange: input value is ' + (event.target as HTMLInputElement).value);
        console.log('Lotus.Input.prototype.onChange: my id is ' + this.id);
        this.value = this.inputSkinPart.value;
        this.dispatch(new InputEvent(InputEvent.CHANGE, {target:this.inputSkinPart, originalEvent:event}))
    }

    public addEventListeners():void{
        super.addEventListeners();
        this.inputSkinPart.addEventListener('change', this.onChange.bind(this));
    }

    public removeEventListeners():void{
        super.removeEventListeners();
        this.inputSkinPart.removeEventListener('change', this.onChange);
    }

    public destroy():void{
        super.destroy();
        this.inputSkinPart = null;
    }

}