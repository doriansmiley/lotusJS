/**
 * Created by dsmiley on 9/28/17.
 */
import {AbstractThumbnailView} from "./AbstractThumbnailView";
import {LotusHTMLElement} from "../context/LotusHTMLElement";
import {SkinPart} from "./SkinPart";
import {ImageGalleryItemDetail, asset} from "./ImageGalleryItemDetail";
import {ComponentEvent} from "../control/events/ComponentEvent";

export class Image extends AbstractThumbnailView {

    private _loadingSVG: HTMLElement;
    private _loadingSVGStyle: string;

    get loadingSVG(): HTMLElement {
        return this._loadingSVG;
    }

    set loadingSVG(value: HTMLElement) {
        this._loadingSVG = value;
    }

    protected getImageURL(model?: Record<string, any>): string {
        if(model) {
            return model['src'];
        }
        if(!this.model) {
            return '';
        }
        return this.model['src'];
    }

    public defineSkinParts(): void{
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart('loadingSVG', this, 'loadingSVG'));
    }

    protected onImageLoad(event: Event): void{
        super.onImageLoad(event);
        this.setElementDisplay(this.loadingSVG, 'none');
    }

    protected setThumbnailSrc(src: string): void{
        super.setThumbnailSrc(src);
        this.setElementDisplay(this.loadingSVG, this._loadingSVGStyle);
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch( part ) {
            case 'loadingSVG':
                this._loadingSVGStyle = this.loadingSVG.style.display;
                break;
        }
    }

    public destroy(): void{
        super.destroy();
        this.loadingSVG = null;
    }

}