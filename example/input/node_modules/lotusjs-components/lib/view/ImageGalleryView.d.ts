/**
 * Created by dsmiley on 8/24/17.
 */
import { AbstractThumbnailView } from "./AbstractThumbnailView";
import { LotusHTMLElement } from "../context/LotusHTMLElement";
export declare class ImageGalleryView extends AbstractThumbnailView {
    private _itemDetail;
    constructor();
    itemDetail: LotusHTMLElement;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    onItemDetailReady(event: any): void;
    onModelChange(value: any): void;
    onDragStart(event: Event): void;
    destroy(): void;
}
