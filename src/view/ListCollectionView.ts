/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractInputCollectionView} from "./AbstractInputCollectionView";

export class ListCollectionView extends AbstractInputCollectionView{

    constructor() {
        super();
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