/**
 * Created by dsmiley on 8/4/17.
 */
import * as Lavender from 'lavenderjs/lib';
import { AbstractComponent } from "./AbstractComponent";
import { AbstractItemView } from "./AbstractItemView";
import { ItemViewEvent } from "../control/events/ItemViewEvent";
import { LotusHTMLElement } from "../context/LotusHTMLElement";
export declare class AbstractCollectionView extends AbstractComponent {
    private _collectionContainer;
    private _itemTemplate;
    private _selectedItem;
    private _collection;
    private _itemView;
    private _childViews;
    constructor();
    collectionContainer: HTMLElement;
    itemTemplate: HTMLElement;
    selectedItem: AbstractItemView;
    collection: Lavender.IList;
    readonly childViews: Lavender.ArrayList;
    itemView: string;
    protected destroyChildViews(): void;
    protected addCollectionEventListeners(): void;
    protected removeCollectionEventListeners(): void;
    protected onCollectionChange(event: Lavender.CollectionEvent): void;
    protected createChildView(model: Object): AbstractItemView;
    protected cloneItemTemplate(model: any): LotusHTMLElement;
    protected getModel(model: any): Object;
    protected addChildView(model: Object): void;
    protected addViewEventListeners(view: AbstractItemView): void;
    protected removeViewEventListeners(view: AbstractItemView): void;
    protected onItemSelectedDeselect(event: ItemViewEvent): void;
    protected onItemRemove(event: ItemViewEvent): void;
    protected addAllChildViews(models: Lavender.IList): void;
    protected removeAllChildViews(): void;
    protected removeChildView(view: AbstractItemView): void;
    protected removeElement(element: HTMLElement): void;
    protected removeChildViewFromModel(model: Object): void;
    protected initCollection(): void;
    protected refreshView(value: any): void;
    setSelectedItem(model: Object): void;
    init(): void;
    render(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    getCollection(): Lavender.IList;
    destroy(): void;
}
