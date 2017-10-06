/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractInputCollectionView} from "./AbstractInputCollectionView";
import {AbstractItemView} from "./AbstractItemView";
import {ListItemView} from "./ListItemView";

export class ListCollectionView extends AbstractInputCollectionView{

    constructor() {
        super();
    }

    public onChange(event:Event):void{
        //get the associated item view for the selected list item
        let itemView:ListItemView = this.childViews.getItemAt((event.target as HTMLSelectElement).selectedIndex);
        //html option elements appear to not dispatch,orat leastnot bubblethe click event on list items
        //so we force it here
        itemView.onClick();
    }

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

    protected refreshView(value:any):void{
        if(this.collectionContainer){
            (this.collectionContainer as HTMLSelectElement).value = value;
        }
        if(this.selectedItem && !this.selectedItem.element['selected']){
            this.selectedItem.element['selected'] = true;
        }
    }

    public destroy():void{
        this.removeEventListeners();
        super.destroy();
    }
}