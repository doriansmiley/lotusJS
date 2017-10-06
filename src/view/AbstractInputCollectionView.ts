import {AbstractCollectionView} from "./AbstractCollectionView";
import {ItemViewEvent} from "../control/events/ItemViewEvent";
import {InputEvent} from "../control/events/InputEvent";
import {AbstractItemView} from "./AbstractItemView";
import {InputModel} from "../model/InputModel";
/**
 * Created by dsmiley on 10/5/17.
 */

export abstract class AbstractInputCollectionView extends AbstractCollectionView{

    protected onItemSelectedDeselect(event:ItemViewEvent):void{
        let dispatchChange:boolean =  (this.selectedItem != event.payload['item']);
        super.onItemSelectedDeselect(event);
        //if the selected item has changed dispatch input change event
        if( dispatchChange ){
            this.dispatch(new InputEvent(InputEvent.CHANGE, {target:this.selectedItem, originalEvent:event}));
        }
    }
    
}