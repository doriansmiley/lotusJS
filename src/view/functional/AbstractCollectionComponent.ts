import {Component, mixin, Events, ComponentEvent, addProperty, createComponent as createAbstractComponent} from './AbstractComponent';
import { List } from 'immutable';
import {getComponents} from '../../context/functional/ComponentRegistry';

// export interfaces
export interface AbstractItemView extends Component {
    resetState: (selected: boolean) => void;
    model: object;
}
export interface AbstractCollectionComponent extends Component {
    addChildView: <T extends AbstractItemView, Z extends object>(model: Z) => void;
    childViews: List<AbstractItemView>;
    addViewEventListeners: () => void;
    addViewEventListener: <T extends AbstractItemView>(view: T) => void;
    removeViewEventListener: <T extends AbstractItemView>(view: T) => void;
    removeViewEventListeners: () => void;
    cloneItemTemplate: <T extends HTMLElement>() => T;
    createChildView: <T extends AbstractItemView>(model: object) => T;
    onItemSelectedDeselect: (event: ComponentEvent) => void;
    selectedItem: AbstractItemView;
    removeAllChildViews: () => void;
    destroyChildViews: () => void;
    removeElement: () => void;
    removeChildView: () => void;
};
// export public functions
export const createItemView = (): AbstractItemView => {
    const clone: AbstractItemView =  mixin(createAbstractComponent(), {
        model: null,
        resetState: (selected: boolean) => {
            if (selected) {
                clone.element.classList.add('selected');
            } else {
                clone.element.classList.remove('selected');
            }
        },
    });
    const destroy = clone.destroy;
    const render = clone.render;
    clone.destroy = (): void => {
        destroy();
        clone.model = null;
    };
    clone.render = <T> (list?: List<T>): HTMLElement => {
        render(list);
        clone.model = JSON.parse(clone.element.getAttribute('data-model'));
        return clone.element;
    };
    return clone;
};
export const createComponent = (): AbstractCollectionComponent => {
    // TODO figure out which of the functions below (if any) should be private
    const clone: AbstractCollectionComponent =  mixin(createAbstractComponent(), {
        addChildView: null,
        childViews: List(),
        addViewEventListeners: null,
        addViewEventListener: null,
        removeViewEventListener: null,
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
    const views: Array<AbstractItemView> = [];
    let selectedItem: AbstractItemView;
    clone.cloneItemTemplate = <T extends HTMLElement>(): T => {
        return clone.skinPartMap.get('itemTemplate').cloneNode(true) as T;
    };
    clone.onItemSelectedDeselect = (event: ComponentEvent): void => {
        if (selectedItem && selectedItem != event.payload['item']) {
            selectedItem.resetState(false);
        }
        selectedItem = (event.type == Events.ITEM_SELECTED) ? event.payload['item'] : null;
        selectedItem.resetState(true);
    };
    clone.addViewEventListeners = <T extends AbstractItemView>(): void => {
        getComponents(clone.skinPartMap.get('itemTemplate').tagName.toLowerCase(),
            clone.skinPartMap.get('collectionContainer')).forEach((view: T) => {
            // components removed from the DOM are automatically removed from the results of getComponents
            // So we store our own ref in views so we can remove listener functions later
            views.push(view);
            clone.addViewEventListener(view);
        });
    };
    clone.addViewEventListener = <T extends AbstractItemView>(view: T): void => {
        view.addEventListener(Events.ITEM_SELECTED, clone, 'onItemSelectedDeselect');
        view.addEventListener(Events.ITEM_DESELECTED, clone, 'onItemSelectedDeselect');
        view.addEventListener(Events.REMOVE_ITEM, clone, 'onItemRemove');
    };
    clone.removeViewEventListener = <T extends AbstractItemView>(view: T): void => {
        view.removeEventListener(Events.ITEM_SELECTED, clone, 'onItemSelectedDeselect');
        view.removeEventListener(Events.ITEM_DESELECTED, clone, 'onItemSelectedDeselect');
        view.removeEventListener(Events.REMOVE_ITEM, clone, 'onItemRemove');
    };
    clone.removeViewEventListeners = <T extends AbstractItemView>(): void => {
        views.forEach((view: T) => {
            clone.removeViewEventListener(view);
        });
    };
    clone.addChildView = <T extends AbstractItemView>(model: object): void => {
        // TODO: replace clone.createChildView with a ComponentRegistry method
        const element = clone.cloneItemTemplate();
        // components that extend item view pull their model data from this attribute
        element.setAttribute('data-model', JSON.stringify(model));
        clone.skinPartMap.get('collectionContainer').appendChild(element);
    };
    clone.removeAllChildViews = () => {
        const node = clone.skinPartMap.get('collectionContainer');
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    };
    clone.destroy = (): void => {
        destroy();
        clone.removeViewEventListeners();
        clone.removeAllChildViews();
        views.splice(0, views.length);
    };
    clone.render = <T>(list?: List<T>): HTMLElement => {
        // call super, triggers destroy
        render(list);
        for (let i=0; i < this.collection.length; i++) {
            clone.addChildView(this.collection.getItemAt(i));
        }
        clone.addViewEventListeners();
        return clone.element;
    };
    clone.onSkinPartAdded = (part: string) => {
        switch (part) {
            // required, defines the layout for child views
            case 'itemTemplate':
                clone.element.parentNode.removeChild(clone.skinPartMap.get(part));// remove from the view
                break;

        }
    };
    addProperty(clone,
        'selectedItem',
        function () {
            return selectedItem;
        });
    return clone;
};
