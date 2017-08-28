/**
 * Created by dsmiley on 8/24/17.
 */
import {AbstractThumbnailView} from "./AbstractThumbnailView";

export class ImageGalleryView extends AbstractThumbnailView{
    constructor(){
        super();
    }

    public onDragStart(event:Event):void{
        if( event['dataTransfer'] !== null && event['dataTransfer'] !== undefined ){
            event['dataTransfer'].effectAllowed = 'all';
            try{
                event['dataTransfer'].setData('galleryImage', this.model['source']);
            }catch(e){
                event['dataTransfer'].setData('text', this.model['source']);//IE only allows two possible key values, text is the nest options
            }
        }else{
            event['originalEvent'].dataTransfer.effectAllowed = 'all';
            try{
                event['originalEvent'].dataTransfer.setData('galleryImage', this.model['source']);
            }catch(e){
                event['originalEvent'].dataTransfer.setData('text', this.model['source']);//IE only allows two possible key values, text is the nest options
            }
        }
    }
}
