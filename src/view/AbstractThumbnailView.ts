/**
 * Created by dsmiley on 8/23/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {AbstractItemView} from './AbstractItemView';
import {SkinPart} from './SkinPart';
import {ItemViewEvent} from '../control/events/ItemViewEvent';

export class AbstractThumbnailView extends AbstractItemView {
    private _thumbWidth: string;
    private _thumbHeight: string;
    private _thumbnail: HTMLImageElement;
    private _thumbnailContainer: HTMLElement;
    private _allowDrag = true;
    private _thumbnailDisplay: string;
    private _thumbnailSelectedClass: string;
    
    constructor () {
        super();
    }

    get thumbWidth (): string {
        return this._thumbWidth;
    }

    set thumbWidth (value: string) {
        this._thumbWidth = value;
        this.notify(value, 'thumbWidth');
    }

    get thumbHeight (): string {
        return this._thumbHeight;
    }

    set thumbHeight (value: string) {
        this._thumbHeight = value;
        this.notify(value, 'thumbHeight');
    }

    get thumbnail (): HTMLImageElement {
        return this._thumbnail;
    }

    set thumbnail (value: HTMLImageElement) {
        this._thumbnail = value;
        this.notify(value, 'thumbnail');
    }

    get thumbnailContainer (): HTMLElement {
        return this._thumbnailContainer;
    }

    set thumbnailContainer (value: HTMLElement) {
        this._thumbnailContainer = value;
        this.notify(value, 'thumbnailContainer');
    }

    get allowDrag (): boolean {
        return this._allowDrag;
    }

    set allowDrag (value: boolean) {
        this._allowDrag = value;
        this.notify(value, 'allowDrag');
    }

    protected sizeImage (): void{
        if (this.thumbnail === null ||  this.thumbnail === undefined) {
            return;
        }
        const defaultSize: Lavender.widthHeightObject = this.getDefaultSize();
        const containerSize: Lavender.widthHeightObject = this.getContainerSize();
        const scale = Lavender.ResizeUtils.getScaleToFit(defaultSize, containerSize);
        const width = defaultSize['width'] * scale;
        const height = defaultSize['height'] * scale;
        // console.log("width/height "+width+"/"+height)
        this.thumbnail.setAttribute('width', `${width}px`);
        this.thumbnail.setAttribute('height', `${height}px`);
        this.thumbnail.style.maxWidth = `${containerSize.width}px`;
        this.thumbnail.style.maxHeight = `${containerSize.height}px`;
    }

    protected onThumbClick (event: Event): void{
        this.resetState();
    }

    protected onDragStart (event: Event): void{
        // stub for override
    }

    protected getImageURL (model?: Record<string, any>): string {
        if (model) {
            return model['thumbUrl'];
        }
        return this.model['thumbUrl'];
    }

    protected getDefaultSize (): Lavender.widthHeightObject {
        return {width:parseInt(this.thumbnail.getAttribute('width')), height:parseInt(this.thumbnail.getAttribute('height'))} as Lavender.widthHeightObject;
    }

    protected getContainerSize (): Lavender.widthHeightObject {
        let returnObj = (this.thumbnailContainer !== null && this.thumbnailContainer !== undefined) ? {width:parseInt(window.getComputedStyle(this.thumbnailContainer).width), height:parseInt(window.getComputedStyle(this.thumbnailContainer).height)} : {width:NaN, height:NaN};
        // if the container has a defined width and height set in the tempalte use that instead of our defaults
        if (!isNaN(parseInt(this.thumbWidth)) && !isNaN(parseInt(this.thumbWidth))) {
            returnObj = {width:parseInt(this.thumbWidth), height:parseInt(this.thumbHeight)} as Lavender.widthHeightObject;
        }
        return returnObj;
    }

    protected onImageLoad (event: Event): void{
        if (!this.thumbnail) {
            return;
        }
        this.thumbnail.onload = null;
        this.setElementDisplay(this.thumbnail, this._thumbnailDisplay);
        this.sizeImage();
    }

    protected setThumbnailSrc (src: string): void{
        if (!this.thumbnail) {
            return;
        }
        this.thumbnail.onload = this.onImageLoad.bind(this);
        this.setElementDisplay(this.thumbnail, 'none');
        this.thumbnail['src'] = src;
    }

    public addEventListeners (): void{
        super.addEventListeners();
        if (this.thumbnail === null ||  this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.setAttribute('draggable', (this.allowDrag) ? 'true' : 'false');
        this.thumbnail.addEventListener('click', this.onThumbClick.bind(this));
        this.thumbnail.addEventListener('dragstart', this.onDragStart.bind(this));
    }

    public removeEventListeners (): void{
        super.removeEventListeners();
        if (this.thumbnail === null ||  this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.removeEventListener('click', this.onThumbClick);
        this.thumbnail.removeEventListener('dragstart', this.onDragStart);
    }

    public defineSkinParts (): void{
        super.defineSkinParts();
        // set up skin parts
        this.skinParts.addItem(new SkinPart('thumbnail', this, 'thumbnail'));
        this.skinParts.addItem(new SkinPart('thumbnailContainer', this, 'thumbnailContainer'));
    }

    public onModelChange (model: Record<string, any>): void{
        if (model) {
            this.setThumbnailSrc(this.getImageURL(model));
        }
    }

    public onSkinPartAdded (part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'thumbnail':
                this.binder.bind(this, 'model', this, 'onModelChange');
                this._thumbnailDisplay = this.thumbnail.style.display;
                this.setThumbnailSrc(this.getImageURL());
                this.addEventListeners();
                break;
            case 'thumbnailContainer':
                this._thumbnailSelectedClass = this.thumbnailContainer.getAttribute('selected-class');
                break;
        }
    }

    public resetState (): void{
        this.thumbnailContainer.classList.toggle(this._thumbnailSelectedClass);
        const eventType = (this.thumbnailContainer.classList.contains(this._thumbnailSelectedClass)) ? ItemViewEvent.ITEM_SELECTED : ItemViewEvent.ITEM_DESELECTED;
        // dispatch event to notify view that the layout was selected/or deselected
        this.dispatch(new ItemViewEvent(eventType, {item:this}));
    }

    public destroy (): void{
        super.destroy();
        this.removeEventListeners();
        this.thumbnail = null;
        this.thumbnailContainer = null;
        this._thumbnailSelectedClass = null;
    }
}
