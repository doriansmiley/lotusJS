/**
 * Created by dsmiley on 8/23/17.
 */
import * as Lavender from 'lavenderjs/lib';
import { AbstractItemView } from "./AbstractItemView";
export declare class AbstractThumbnailView extends AbstractItemView {
    private _thumbWidth;
    private _thumbHeight;
    private _thumbnail;
    private _thumbnailContainer;
    private _allowDrag;
    private _thumbnailDisplay;
    private _thumbnailSelectedClass;
    constructor();
    thumbWidth: string;
    thumbHeight: string;
    thumbnail: HTMLImageElement;
    thumbnailContainer: HTMLElement;
    allowDrag: boolean;
    protected setUpBindings(): void;
    protected sizeImage(): void;
    protected onThumbClick(event: Event): void;
    protected onDragStart(event: Event): void;
    protected getImageURL(): string;
    protected getDefaultSize(): Lavender.widthHeightObject;
    protected getContainerSize(): Lavender.widthHeightObject;
    addEventListeners(): void;
    removeEventListeners(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    resetState(): void;
    destroy(): void;
}
