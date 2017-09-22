/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractItemView} from "./AbstractItemView";
import {SkinPart} from "./SkinPart";

export type ListItemValue = {label:string, value:any};

export class ListItemView extends AbstractItemView{

    private _option:HTMLOptionElement;

    constructor(){
        super();
    }

    get option():HTMLOptionElement {
        return this._option;
    }

    set option(value:HTMLOptionElement) {
        this._option = value;
    }

    public defineSkinParts():void{
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart('option', this, 'option'));
    }

    public onSkinPartAdded(part:string, element:HTMLElement):void{
        super.onSkinPartAdded(part, element);
        switch( part ){
            case 'option':
                //set up listitem value and label
                this.option.value = (typeof (this.model as ListItemValue).value == 'object') ? JSON.stringify((this.model as ListItemValue).value) : (this.model as ListItemValue).value;
                this.option.innerHTML = (this.model as ListItemValue).label;
                break;
        }
    }

    public destroy():void{
        super.destroy();
        this.option = null;
    }
}