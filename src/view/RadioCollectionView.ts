/**
 * Created by dsmiley on 9/22/17.
 */
import {ItemViewEvent} from "../control/events/ItemViewEvent";
import {InputEvent} from "../control/events/InputEvent";
import {AbstractCollectionView} from "./AbstractCollectionView";
import {AbstractItemView} from "./AbstractItemView";
import {AbstractInputCollectionView} from "./AbstractInputCollectionView";

export class RadioCollectionView extends AbstractInputCollectionView{

    constructor(){
        super();
    }

    protected refreshView(value:any):void{
        if(this.selectedItem){
            this.selectedItem.element['checked'] = true;
        }
    }
}