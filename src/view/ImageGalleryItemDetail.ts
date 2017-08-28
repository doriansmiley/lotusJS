/**
 * Created by dsmiley on 8/24/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {SkinPart} from "./SkinPart";
import {AbstractComponent} from "./AbstractComponent";
import {LotusHTMLElement} from "../context/LotusHTMLElement";

export type asset = { objectName: string, createdDate:Date, url:string };

export class ImageGalleryItemDetail extends AbstractComponent{
    private _asset:asset;
    private _nameLabel:HTMLElement;
    private _dateCreatedLabel:HTMLElement;
    private _urlLabel:HTMLElement;
    
    constructor(){
        super();
    }


    get asset():asset {
        return this._asset;
    }

    set asset(value:asset) {
        this._asset = value;
        this.notify(value, 'asset');
        this.render();
    }

    get nameLabel():HTMLElement {
        return this._nameLabel;
    }

    set nameLabel(value:HTMLElement) {
        this._nameLabel = value;
        this.notify(value, 'nameLabel');
    }

    get dateCreatedLabel():HTMLElement {
        return this._dateCreatedLabel;
    }

    set dateCreatedLabel(value:HTMLElement) {
        this._dateCreatedLabel = value;
        this.notify(value, 'dateCreatedLabel');
    }

    get urlLabel():HTMLElement {
        return this._urlLabel;
    }

    set urlLabel(value:HTMLElement) {
        this._urlLabel = value;
        this.notify(value, 'urlLabel');
    }

    protected render():void{
        if (this.asset && this.ready) {
            if(this.nameLabel){
                this.nameLabel.innerHTML = this.asset.objectName;
            }
            if(this.dateCreatedLabel){
                this.dateCreatedLabel.innerHTML = this.asset.createdDate.toDateString();
            }
            if(this.urlLabel){
                this.urlLabel.innerHTML = this.asset.url;
            }
        }
    }

    public defineSkinParts():void{
        //set up skin parts
        this.skinParts.addItem(new SkinPart('nameLabel', this, 'nameLabel'));
        this.skinParts.addItem(new SkinPart('dateCreatedLabel', this, 'dateCreatedLabel'));
        this.skinParts.addItem(new SkinPart('urlLabel', this, 'urlLabel'));
    }

    public created(element:LotusHTMLElement):void{
        super.created(element);
    }

    public destroy():void{
        super.destroy();
        this.asset = null;
        this.nameLabel = null;
        this.dateCreatedLabel = null;
        this.urlLabel = null;
    }

}