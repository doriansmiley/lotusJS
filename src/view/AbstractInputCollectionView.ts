import {AbstractCollectionView} from "./AbstractCollectionView";
import {ItemViewEvent} from "../control/events/ItemViewEvent";
import {InputEvent} from "../control/events/InputEvent";
import {AbstractItemView} from "./AbstractItemView";
import {InputModel} from "../model/form/InputModel";
/**
 * Created by dsmiley on 10/5/17.
 */

export abstract class AbstractInputCollectionView extends AbstractCollectionView{

    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    public attachValidationClass(classToAdd:string, classToRemove:string):void{
        if(this.collectionContainer){
            this.collectionContainer.classList.remove(classToRemove);
            this.collectionContainer.classList.add(classToAdd);
        }
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