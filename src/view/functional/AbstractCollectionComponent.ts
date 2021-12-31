import {Component, mixin, Events, ComponentEvent, addProperty} from './AbstractComponent';
import {getTagDef} from '../../index';

// export interfaces
export interface AbstractItemView extends Component {
    resetState: (selected: boolean) => void;
    model: Record<string, unknown>;
}
export interface AbstractCollectionComponent extends Component {
    addChildView: <T extends AbstractItemView, Z extends Record<string, unknown>>(model: Z) => void;
    childViews: Array<AbstractItemView>;
    hydrateChildViews: () => void;
    addViewEventListener: <T extends AbstractItemView>(view: T) => void;
    removeViewEventListener: <T extends AbstractItemView>(view: T) => void;
    removeViewEventListeners: () => void;
    cloneItemTemplate: <T extends HTMLElement>() => T;
    createChildView: <T extends AbstractItemView>(model: Record<string, unknown>) => T;
    onItemSelectedDeselect: (event: ComponentEvent) => void;
    selectedItem: AbstractItemView;
    removeAllChildViews: () => void;
    destroyChildViews: () => void;
    removeElement: () => void;
    removeChildView: () => void;
}
// export public functions
export const createItemView = (component: Component): AbstractItemView => {
    const clone: AbstractItemView =  mixin(component, {
        model: null,
        resetState: (selected: boolean) => {
            if (selected) {
                clone.element.classList.add('selected');
            } else {
                clone.element.classList.remove('selected');
            }
        },
    });
    return clone;
};
export const createComponent = (component: Component): AbstractCollectionComponent => {
    // TODO figure out which of the functions below (if any) should be private
    let clone =  mixin<AbstractCollectionComponent>(component, {
        addChildView: null,
        hydrateChildViews: null,
        childViews: [],
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
    const views: Array<AbstractItemView> = [];
    let selectedItem: AbstractItemView;
    clone.cloneItemTemplate = <T extends HTMLElement>(): T => {
        return clone.skinPartMap.get('itemTemplate').cloneNode(true) as T;
    };
    clone.onItemSelectedDeselect = (event: ComponentEvent): void => {
        if (selectedItem && selectedItem != event.payload['item']) {
            selectedItem.resetState(false);
        }
        selectedItem = event.payload['item'] as AbstractItemView;
        selectedItem.resetState(event.type === Events.ITEM_SELECTED);
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
    clone.addChildView = <T extends AbstractItemView>(model: Record<string, unknown>): void => {
        const element = clone.cloneItemTemplate();
        clone.skinPartMap.get('collectionContainer').appendChild(element);
        // IMPORTANT: once the component is added to the DOM the ComponentRegistry
        // assigns the component attribute
        // render the component again passing the model
        const rendered = element['component'].render([model]);
        views.push(element['component']);
        // assign the child view listeners
        clone.addViewEventListener(element['component']);
        rendered.setAttribute('data-item-template', element.tagName.toLowerCase());
        // TODO figure out how to not replace element with rendered
        // it's removing the shadow root and custom element
        // This prevents the SSR functions from preventing a double render on the item view
        // element.shadowRoot.querySelector('[data-component-root="root"]').replaceWith(rendered);
        element.replaceWith(rendered);
    };
    clone.hydrateChildViews = () => {
        // hydrate component instances from the DOM
        const childViews = clone.skinPartMap.get('collectionContainer')
            .querySelectorAll('[data-component-root="root"]') || [];
        childViews?.forEach((view) => {
            const childViewTagName = view.getAttribute('data-item-template');
            const tagDef = getTagDef(childViewTagName);
            const component: Component = tagDef.tagFunction();
            component.element = view;
            // note we don't need to replace anything, we just need to init the component
            // TODO we need a hydrate method to call here. This method needs to be coded differently
            // I think this has to be specific for each component
            //
            component.render(undefined, true);
        });
    };
    clone.removeAllChildViews = () => {
        const node = clone.skinPartMap.get('collectionContainer');
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    };
    clone.destroy = (removed = false) => {
        if (!clone.ready) {
            return;
        }
        clone.removeViewEventListeners();
        clone.removeAllChildViews();
        views.splice(0, views.length);
        clone.removeEventListeners();
        const itemTemplate = clone.skinPartMap.get('itemTemplate');
        clone.attributeMap.clear();
        clone.skinPartMap.clear();
        // the item template is removed from the DOM on load so we need to make sure we preserve a reference
        clone.skinPartMap.set('itemTemplate', itemTemplate);
        // only make clone eligible for GC if removed from DOM
        if (removed) {
            clone = null;
        }
    };
    clone.render = <T>(list?: Array<T>, hydrate = false): HTMLElement => {
        // call super, triggers destroy
        render(list, hydrate);

        // the ssr flag lets us know if the component's collection view was rendered server side
        // this flag prevents a double render
        if (!hydrate) {
            list?.forEach(<T>(model) => {
                clone.addChildView(model);
            });
        } else {
            clone.hydrateChildViews();
        }

        return clone.element;
    };
    clone.onSkinPartAdded = (part: string) => {
        switch (part) {
            // required, defines the layout for child views
            case 'itemTemplate':
                clone.skinPartMap.get(part).remove();// remove from the view
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
