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
        //get the associated item view for the selected list item
        let itemView:AbstractItemView = this.childViews.getItemAt((event.target as HTMLSelectElement).selectedIndex);
        console.log('Lotus.List.prototype.onChange: input value is ' + itemView.element['value']);
        console.log('Lotus.List.prototype.onChange: my id is ' + this.id);
        //set selected item view
        this.dispatch(new InputEvent(InputEvent.CHANGE, {target:this.collectionContainer, originalEvent:event}));
        //set the selected item
        this.onItemSelectedDeselect(new ItemViewEvent(ItemViewEvent.ITEM_SELECTED, {item:itemView}));
        console.log('Lotus.List.prototype.onChange: selected item is ' + itemView);
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

    public setSelectedItem(model:Object):void{
        //since this can be used as a bindable end point make sure recursion does not occur
        if(this.selectedItem && this.selectedItem.model == model){
            return;
        }
        for( let i=0; i < this.childViews.length; i++){
            if( this.childViews.getItemAt(i).model == model){
                this.onItemSelectedDeselect( new ItemViewEvent(ItemViewEvent.ITEM_SELECTED, {item:this.childViews.getItemAt(i)}) );
                //refresh the view
                (this.collectionContainer as HTMLSelectElement).value = model['value'];
                break;
            }
        }
    }

    public destroy():void{
        this.removeEventListeners();
        super.destroy();
    }
}