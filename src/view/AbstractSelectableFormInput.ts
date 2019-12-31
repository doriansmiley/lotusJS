/**
 * Created by dsmiley on 10/5/17.
 */
import {AbstractItemView} from "./AbstractItemView";
import {InputModel} from "../model/form/InputModel";
import {ItemViewEvent} from "../control/events/ItemViewEvent";

export abstract class AbstractSelectableFormInput extends AbstractItemView{

    private _selected: boolean;

    constructor(){
        super();
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
        this.refreshView(value);
        this.notify(value, 'selected');
        const eventType = ( this.selected ) ? ItemViewEvent.ITEM_SELECTED : ItemViewEvent.ITEM_DESELECTED;
        //dispatch event to notify view that the layout was selected/or deselected
        this.dispatch(new ItemViewEvent(eventType, {item:this}));
    }

    //stub for override
    protected refreshView(selected: boolean): void{

    }

    //called when anewitemis clickedbythe end user in a collection view
    //this is called to reset the state of the currently selected item
    public resetState(): void{
        this.selected = false;
    }

    public onModelChange(value: Record<string, any>): void{
        super.onModelChange(value);
        if(value && value instanceof InputModel){
            //set initial value
            this.selected = (value as InputModel).selected;
            //set up two way bindings
            this.binder.bind(value, 'selected', this, 'selected');
            this.binder.bind(this, 'selected', value, 'selected');
        }else if(value && value['selected']){
            this.selected = value['selected'];
        }
    }
}