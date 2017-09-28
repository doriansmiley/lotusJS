/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractItemView} from "./AbstractItemView";
import {SkinPart} from "./SkinPart";
import {ItemViewEvent} from "../control/events/ItemViewEvent";

export type RadioItemValue = {label:string, value:any, name:string, selected?:boolean}
;
export class RadioItemView extends AbstractItemView{

    private _radio:HTMLInputElement;
    private _label:HTMLLabelElement;

    constructor(){
        super();
    }

    get radio():HTMLInputElement {
        return this._radio;
    }

    set radio(value:HTMLInputElement) {
        this._radio = value;
    }

    get label():HTMLLabelElement {
        return this._label;
    }

    set label(value:HTMLLabelElement) {
        this._label = value;
    }

    public onClick(event:Event):void{
        let eventType = ( this.radio.checked ) ? ItemViewEvent.ITEM_SELECTED : ItemViewEvent.ITEM_DESELECTED;
        //dispatch event to notify view that the layout was selected/or deselected
        this.dispatch(new ItemViewEvent(eventType, {item:this}));
    }

    public addEventListeners():void{
        super.addEventListeners();
        this.radio.addEventListener('click', this.onClick.bind(this));
    }

    public removeEventListeners():void{
        super.removeEventListeners();
        if(this.radio){
            this.radio.removeEventListener('click', this.onClick);
        }
    }
    public defineSkinParts():void{
        super.defineSkinParts();
        this.skinParts.addItem(new SkinPart('radio', this, 'radio'));
        this.skinParts.addItem(new SkinPart('label', this, 'label'));
    }

    public onSkinPartAdded(part:string, element:HTMLElement):void{
        super.onSkinPartAdded(part, element);
        switch( part ){
            case 'radio':
                //set up listitem value and label
                this.radio.value = (typeof (this.model as RadioItemValue).value == 'object') ? JSON.stringify((this.model as RadioItemValue).value) : (this.model as RadioItemValue).value;
                this.radio.name = (this.model as RadioItemValue).name;
                this.radio.checked = ((this.model as RadioItemValue).hasOwnProperty('selected')) ? (this.model as RadioItemValue).selected : false;
                this.addEventListeners();
                break;
            case 'label':
                this.label.innerHTML = (this.model as RadioItemValue).label;
                break;
        }
    }

    public destroy():void{
        super.destroy();
        this.removeEventListeners();
        this.radio = null;
        this.label = null;
    }
}