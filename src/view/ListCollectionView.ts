/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractComponent} from "./AbstractComponent";
import {SkinPart} from "./SkinPart";
import {AbstractItemView} from "./AbstractItemView";
import {ItemViewEvent} from "../control/events/ItemViewEvent";
import {InputEvent} from "../control/events/InputEvent";
import {AbstractCollectionView} from "./AbstractCollectionView";
import {ListItemValue} from "./ListItemView";
import {LotusHTMLElement} from "../context/LotusHTMLElement";

export class ListCollectionView extends AbstractCollectionView{

    constructor(){
        super();
    }

    public onChange(event:Event):void{
        var item:HTMLOptionElement = (event.target as HTMLSelectElement).options[(event.target as HTMLSelectElement).selectedIndex] as HTMLOptionElement;
        console.log('Lotus.Input.prototype.onChange: input value is ' + (item as HTMLOptionElement).value);
        console.log('Lotus.Input.prototype.onChange: my id is ' + this.id);
        //set selected item view
        this.dispatch(new InputEvent(InputEvent.CHANGE, {target:this.collectionContainer, originalEvent:event}));
        //set the selected item
        this.onItemSelectedDeselect(new ItemViewEvent(ItemViewEvent.ITEM_SELECTED, {payload:item['lotusComponentInstance']}));
        console.log('Lotus.List.onChange: selected item is ' + item['lotusComponentInstance']);
    }
    
    //(event.target as HTMLSelectElement).options[(event.target as HTMLSelectElement).selectedIndex].value

    public addEventListeners():void{
        super.addEventListeners();
        this.collectionContainer.addEventListener('change', this.onChange.bind(this));
    }

    public removeEventListeners():void{
        super.removeEventListeners();
        this.collectionContainer.removeEventListener('change', this.onChange);
    }

    public onSkinPartAdded(part:string, element:HTMLElement):void{
        super.onSkinPartAdded(part, element );
        switch(part){
            //required, defines the layout for child views
            case 'collectionContainer':
                this.addEventListeners();
                break;

        }
    }

    public destroy():void{
        this.removeEventListeners();
        super.destroy();
    }
}