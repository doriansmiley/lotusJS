import {ItemViewEvent} from '../..';
import {Component, mixin} from './AbstractComponent';
import {createComponent as createAbstractComponent} from './AbstractComponent';
import { List } from 'immutable';

// export interfaces
export interface AbtractItemView extends Component {
    resetState: () => void;
}
export interface AbstractCollectionComponent extends Component {
    addChildView: <T extends AbtractItemView, Z extends object>(model: Z) => void;
    childViews: List<AbtractItemView>;
    addViewEventListeners: <T extends AbtractItemView>(view: T) => void;
    removeViewEventListeners: <T extends AbtractItemView>(view: T) => void;
    cloneItemTemplate: <T extends HTMLElement>() => T;
    createChildView: <T extends AbtractItemView, Z extends object>(model: Z) => T;
    onItemSelectedDeselect: (event: ItemViewEvent) => void;
    selectedItem: AbtractItemView;
    removeAllChildViews: () => void;
    destroyChildViews: () => void;
    removeElement: () => void;
    removeChildView: () => void;
};

export const createComponent = (): AbstractCollectionComponent => {
    // TODO figure out which of the functions below (if any) should be private
    const clone: AbstractCollectionComponent =  mixin(createAbstractComponent(), {
        addChildView: null,
        childViews: List(),
        addViewEventListeners: null,
        cloneItemTemplate: null,
        createChildView: null,
        onItemSelectedDeselect: null,
        removeViewEventListeners: null,
        selectedItem: null,
        removeAllChildViews: null,
        destroyChildViews: null,
        removeElement: null,
        removeChildView: null,

    });
    const render = clone.render;
    const destroy = clone.destroy;
    clone.createChildView = <T extends AbtractItemView, Z extends object>(model: Z): T => {
        return createAbstractComponent() as T;
    };
    clone.cloneItemTemplate = <T extends HTMLElement>(): T => {
        return clone.skinPartMap.get('itemTemplate').cloneNode(true) as T;
    };
    clone.onItemSelectedDeselect = (event: ItemViewEvent): void => {
        if (clone.selectedItem !== null && clone.selectedItem != event.payload['item']) {
            clone.selectedItem.resetState();
        }
        clone.selectedItem = (event.type == ItemViewEvent.ITEM_SELECTED) ? event.payload['item'] : null;
    };
    clone.addViewEventListeners = <T extends AbtractItemView>(view: T): void => {
        view.addEventListener(ItemViewEvent.ITEM_SELECTED, clone, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent.ITEM_DESELECTED, clone, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent.REMOVE_ITEM, clone, 'onItemRemove');
    };
    clone.removeViewEventListeners = <T extends AbtractItemView>(view: T): void => {
        view.removeEventListener(ItemViewEvent.ITEM_SELECTED, clone, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent.ITEM_DESELECTED, clone, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent.REMOVE_ITEM, clone, 'onItemRemove');
    };
    clone.addChildView = <T extends AbtractItemView, Z extends object>(model: Z): void => {
        const view: T = clone.createChildView(model);
        view.element = clone.cloneItemTemplate();
        view.render(List([model]));
        clone.childViews = clone.childViews.push(view);
        if (clone.skinPartMap.get('collectionContainer')) {
            clone.skinPartMap.get('collectionContainer').appendChild(view.element);
        } else {
            clone.element.appendChild(view.element);
        }
        clone.addViewEventListeners(view);
    };
    clone.removeElement = () => {
        // TODO: add code
    };
    clone.removeChildView = () => {
        // TODO: add code
    };
    clone.removeAllChildViews = () => {
        // TODO: add code
    };
    clone.destroyChildViews = () => {
        // TODO: add code
    };
    clone.destroy = (): void => {
        clone.destroyChildViews();
        destroy();
        this.collection = null;
        this.itemView = null;
        this.collectionContainer = null;
        this.itemTemplate = null;
        this.selectedItem = null;
    };
    clone.render = <T>(list?: List<T>): HTMLElement => {
        // call super, triggers destroy
        const element = render(list);
        clone.removeAllChildViews();
        for (let i=0; i < this.collection.length; i++) {
            clone.addChildView(this.collection.getItemAt(i));
        }
        return element;
    };
    clone.onSkinPartAdded = (part: string) => {
        switch (part) {
            // required, defines the layout for child views
            case 'itemTemplate':
                clone.element.parentNode.removeChild(clone.skinPartMap.get(part));// remove from the view
                break;

        }
    };
    // TODO add the following methods destroyChildViews, removeAllChildViews,
    //  removeChildView, removeElement, setSelectedItem, destroy
    //  IMPORTANT: remeber we are not listening or handling any collection mutations
    //  callers can call render whenever an application collection changes.
    //  The component can set it's own view state so long as it dispatches and event to notify
    //  observers so they can sync the application model with the change
    return clone;
};
