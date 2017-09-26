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

export class RadioCollectionView extends AbstractCollectionView{

    constructor(){
        super();
    }

    protected onItemSelectedDeselect(event:ItemViewEvent):void{
        let dispatchChange:boolean =  (this.selectedItem != event.payload['item']);
        super.onItemSelectedDeselect(event);
        //if the selected item has changed dispatch input change event
        if( dispatchChange ){
            this.dispatch(new InputEvent(InputEvent.CHANGE, {target:this.selectedItem, originalEvent:event}));
        }
    }
}