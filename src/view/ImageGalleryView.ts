/**
 * Created by dsmiley on 8/24/17.
 */
import {AbstractThumbnailView} from "./AbstractThumbnailView";
import {LotusHTMLElement} from "../context/LotusHTMLElement";
import {SkinPart} from "./SkinPart";
import {ImageGalleryItemDetail, asset} from "./ImageGalleryItemDetail";
import {ComponentEvent} from "../control/events/ComponentEvent";

export class ImageGalleryView extends AbstractThumbnailView {
    private _itemDetail: LotusHTMLElement;
    
    constructor() {
        super();
    }

    get itemDetail(): LotusHTMLElement {
        return this._itemDetail;
    }

    set itemDetail(value: LotusHTMLElement) {
        this._itemDetail = value;
        this.notify(value, 'itemDetail');
    }

    public defineSkinParts(): void{
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart('itemDetail', this, 'itemDetail'));
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element );
        switch(part) {
            //optional container for displaying collection elements
            case 'itemDetail':
                if(this.model) {
                    //this is an example of working with nested components which are skin parts and require a reference to and item view model
                    //nested components in your skins (template files) work natively, but if you have a skin part that requires a model reference you have to wait until ComponentEvent.READY is dispatched
                    (this.itemDetail.lotusComponentInstance as ImageGalleryItemDetail).asset = this.model as asset;
                    (this.itemDetail.lotusComponentInstance as ImageGalleryItemDetail).addEventListener(ComponentEvent.READY, this, 'onItemDetailReady')
                }
                break;
        }
    }

    public onItemDetailReady(event): void{
        if(this.model) {
            (this.itemDetail.lotusComponentInstance as ImageGalleryItemDetail).asset = this.model as asset;
        }
    }

    public onModelChange(value): void{
        super.onModelChange(value);
        if(this.itemDetail) {
            (this.itemDetail.lotusComponentInstance as ImageGalleryItemDetail).asset = value as asset;
        }
    }

    public onDragStart(event: Event): void{
        if( event['dataTransfer'] !== null && event['dataTransfer'] !== undefined ) {
            event['dataTransfer'].effectAllowed = 'all';
            try{
                event['dataTransfer'].setData('galleryImage', this.model['source']);
            }catch(e) {
                event['dataTransfer'].setData('text', this.model['source']);//IE only allows two possible key values, text is the nest options
            }
        }else{
            event['originalEvent'].dataTransfer.effectAllowed = 'all';
            try{
                event['originalEvent'].dataTransfer.setData('galleryImage', this.model['source']);
            }catch(e) {
                event['originalEvent'].dataTransfer.setData('text', this.model['source']);//IE only allows two possible key values, text is the nest options
            }
        }
    }

    public destroy(): void{
        super.destroy();
        if(this.itemDetail) {
            (this.itemDetail.lotusComponentInstance as ImageGalleryItemDetail).removeEventListener(ComponentEvent.READY, this, 'onItemDetailReady');
        }
        this.itemDetail = null;
    }
}
