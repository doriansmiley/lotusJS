import { AbstractComponent } from "./AbstractComponent";
import { LotusHTMLElement } from "../context/LotusHTMLElement";
export declare type asset = {
    objectName: string;
    createdDate: Date;
    url: string;
};
export declare class ImageGalleryItemDetail extends AbstractComponent {
    private _asset;
    private _nameLabel;
    private _dateCreatedLabel;
    private _urlLabel;
    constructor();
    asset: asset;
    nameLabel: HTMLElement;
    dateCreatedLabel: HTMLElement;
    urlLabel: HTMLElement;
    protected render(): void;
    defineSkinParts(): void;
    created(element: LotusHTMLElement): void;
    destroy(): void;
}
