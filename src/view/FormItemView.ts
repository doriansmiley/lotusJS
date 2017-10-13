import {AbstractItemView} from "./AbstractItemView";
import {InputCollectionModel} from "../model/form/InputCollectionModel";
import {SkinPart} from "./SkinPart";
import {LotusHTMLElement} from "../context/LotusHTMLElement";
import {Input} from "./Input";
import {ComponentEvent} from "../control/events/ComponentEvent";
import {AbstractComponent} from "./AbstractComponent";
/**
 * Created by dsmiley on 10/12/17.
 */

export class FormItemView extends AbstractItemView{

    protected _input:LotusHTMLElement;
    protected _list:LotusHTMLElement;
    protected _radioGroup:LotusHTMLElement;
    protected _file:LotusHTMLElement;
    protected _activeSkinPart:AbstractItemView;

    get input():LotusHTMLElement {
        return this._input;
    }

    set input(value:LotusHTMLElement) {
        this._input = value;
        this.notify(value, 'input');
    }

    get list():LotusHTMLElement {
        return this._list;
    }

    set list(value:LotusHTMLElement) {
        this._list = value;
        this.notify(value, 'list');
    }

    get radioGroup():LotusHTMLElement {
        return this._radioGroup;
    }

    set radioGroup(value:LotusHTMLElement) {
        this._radioGroup = value;
        this.notify(value, 'radioGroup');
    }

    get file():LotusHTMLElement {
        return this._file;
    }

    set file(value:LotusHTMLElement) {
        this._file = value;
        this.notify(value, 'file');
    }

    protected removeSkinPart(element:LotusHTMLElement, parent:HTMLElement){
        if(element.lotusComponentInstance.ready){
            element.lotusComponentInstance.destroy();
        }
        if(parent){
            parent.removeChild(element);
        }
        if(this.input == element){
            this.input = null;
        }else if(this.list == element){
            this.list = null;
        }else if(this.radioGroup == element){
            this.radioGroup = null;
        }else if(this.file == element){
            this.file = null;
        }
    }

    protected setUpSkinParts():void{
        if(!this.ready || !this.model){
            return
        }
        let skinPartsToRemove:Array<LotusHTMLElement> = [
            this.input,
            this.list,
            this.radioGroup,
            this.file
        ];
        //set up the required skin part and remove it from the list of skin parts to remove
        //only one of these skin parts can stay
        let head;
        let tail;
        switch((this.model as InputCollectionModel).type){
            //remove unused skin parts and set up used skin part
            case InputCollectionModel.TYPE_INPUT:
                this.setUpSkinPart((this.input.lotusComponentInstance as AbstractItemView));
                skinPartsToRemove.shift();
                break;
            case InputCollectionModel.TYPE_LIST:
                this.setUpSkinPart((this.list.lotusComponentInstance as AbstractItemView));
                head = skinPartsToRemove.slice(0, 1);
                tail = skinPartsToRemove.slice(1 + 1);
                skinPartsToRemove = head.concat(tail);
                break;
            case InputCollectionModel.TYPE_RADIO_GROUP:
                this.setUpSkinPart((this.radioGroup.lotusComponentInstance as AbstractItemView));
                head = skinPartsToRemove.slice(0, 2);
                tail = skinPartsToRemove.slice(2 + 1);
                skinPartsToRemove = head.concat(tail);
                break;
            case InputCollectionModel.TYPE_FILE:
                this.setUpSkinPart((this.file.lotusComponentInstance as AbstractItemView));
                skinPartsToRemove.pop();
        }
        for(let i=0; i<skinPartsToRemove.length; i++){
            this.removeSkinPart(skinPartsToRemove[i], skinPartsToRemove[i].parentElement);
        }
    }

    protected setUpSkinPart(part:AbstractItemView):void{
        this._activeSkinPart = part;
        if(part.ready){
            this.setComponentModel(this.model as InputCollectionModel, part);
        }else{
            part.addEventListener(ComponentEvent.READY, this, 'onItemDetailReady');
        }
    }

    protected setComponentModel(value:InputCollectionModel, component:AbstractItemView):void{
        if(value){
            switch(value.type){
                case InputCollectionModel.TYPE_INPUT:
                    component.model = value.collection.getItemAt(0);
                    break
                case InputCollectionModel.TYPE_FILE:
                    component.model = value.collection.getItemAt(0);
                    break
                case InputCollectionModel.TYPE_LIST:
                    component.model = value.collection;
                    break
                case InputCollectionModel.TYPE_RADIO_GROUP:
                    component.model = value.collection;
                    break

            }
            //bind validation
            this.binder.bind(value, 'isValid', component, 'isValid');
            //set intital isValid value for component
            component.isValid = value.isValid;
        }
    }

    public defineSkinParts():void{
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart('input', this, 'input'));
        this.skinParts.addItem(new SkinPart('list', this, 'list'));
        this.skinParts.addItem(new SkinPart('radioGroup', this, 'radioGroup'));
        this.skinParts.addItem(new SkinPart('file', this, 'file'));
    }

    public onSkinPartAdded(part:string, element:HTMLElement):void{
        super.onSkinPartAdded(part, element );
    }

    public onItemDetailReady(event:ComponentEvent):void{
        this.setComponentModel(this.model as InputCollectionModel, (event.payload['target'] as AbstractItemView));
        (event.payload['target'] as AbstractItemView).removeEventListener(ComponentEvent.READY, this, 'onItemDetailReady');
    }

    public onReady():void{
        super.onReady();
        this.setUpSkinParts();
    }

    public onModelChange(value):void{
        super.onModelChange(value);
        if(!value){
            return;
        }
        this.binder.bind(value as InputCollectionModel, 'isValid', this, 'isValid');
        //set initial valid value
        this.isValid = (value as InputCollectionModel).isValid;
        this.setUpSkinParts();
    }

    public destroy():void{
        if(this.input){
            this.input.lotusComponentInstance.destroy();
        }
        if(this.file){
            this.file.lotusComponentInstance.destroy();
        }
        if(this.list){
            this.list.lotusComponentInstance.destroy();
        }
        if(this.radioGroup){
            this.list.lotusComponentInstance.destroy();
        }
        super.destroy();
        this._activeSkinPart = null;
        this.input = null;
        this.file = null;
        this.list = null;
        this.radioGroup = null;
    }
}