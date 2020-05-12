lotusJS
=============

[![Build Status](https://travis-ci.org/doriansmiley/lotusJS.svg?branch=master)](https://travis-ci.org/doriansmiley/lotusJS)
[![Join the chat at https://gitter.im/lotusJS/Lobby](https://badges.gitter.im/lotusJS/Lobby.svg)](https://gitter.im/lotusJS/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![](https://data.jsdelivr.com/v1/package/npm/lotusjs-components/badge)](https://www.jsdelivr.com/package/npm/lotusjs-components)
[![npm version](https://badge.fury.io/js/lotusjs-components.svg)](https://badge.fury.io/js/lotusjs-components)

LotusJS is a framework for developing HTML5 applications using web components and TypeScript. It uses a functional style and leverages rambda for composition and currying.

Lotus is opinionated about two things: 
* A functional style
* Separating presentation for code

# Getting Stated

`npm install lotusjs-components`

#### Using Built in Components
Example below creates an instance of the button component using the tag name `lotus-button`.
You can use any tag name you like.
```
<div>
	<lotus-button></lotus-button>
</div>
</body>
<script type="module" src="../node_modules/lotusjs-components/lib/lotusJS-UMD.js"></script>
<script>
const template = document.createElement('div');
template.innerHTML = '<template id="app">\n' +
    '  <div data-component-root="root">\n' +
    '    <button data-skin-part="button">\n' +
    '      <label>Hello World with Bootsrap</label>\n' +
    '    </button>\n' +
    '  </div>\n' +
    '</template>\n'
const tagDef = {
    inserted: (component) => {
        console.log('example component inserted');
    },
    removed: (component) => {
        console.log('example component removed');
        component.element = null;
    },
    template: template.firstChild,
    tagName: 'lotus-button',
    tagFunction: Lotus.useButton
};
Lotus.register(tagDef);
</script>
```
You can also supply a remote location for the component's skin. For example:
```
const tagDef = {
    inserted: (component) => {
        console.log('example component inserted');
    },
    removed: (component) => {
        console.log('example component removed');
        component.element = null;
    },
    templateUrl: 'templates/button-blue.html',
    tagName: 'lotus-button-2',
    tagFunction: Lotus.useButton
};
Lotus.register(tagDef);
```
In this example the HTML file containing the `<template>` will be loaded from `templates/button-blue.html` using `fetch`. 

#### Creating a component
All components extend the base function by composing with `createAbstractComponent`
```
import {Component, mixin, Events, getComponentEvent, createComponent as createAbstractComponent} from './AbstractComponent';
import {compose} from 'ramda';

// export interfaces
export interface ButtonComponent extends Component {
    onClick: (event: Event) => void;
};
// export public functions
export const createComponent = (component: Component): ButtonComponent => {
    const clone =  mixin<ButtonComponent>(component,{
        onClick: null,
    });
    clone.onSkinPartAdded = (part: string) => {
        switch (part) {
            case 'button':
                // add button event listener or whatever else yo want to do when this skin part is added
                // you could hold until all skin parts are added and then call addEventListeners
                console.log(`Lotus.ButtonComponent.prototype.onSkinPartAdded: part: ${part}`);
                clone.skinPartMap.get(part).addEventListener('click', clone.onClick);
                break;
        }
    };
    clone.onClick = (event) => {
        console.log(`Lotus.ButtonComponent.prototype.onClick: event is ${event}`);
        console.log(`Lotus.ButtonComponent.prototype.onClick: my id is ${clone.id}`);
        clone.dispatch(getComponentEvent(Events.CLICK, {target: clone, originalEvent: event}));
    };
    clone.removeEventListeners = () => {
        if (clone.skinPartMap.get('button')) {
            clone.skinPartMap.get('button').removeEventListener('click', clone.onClick);
        }
    };
    return clone;
};
// create hook using compose
// hooks provide prebuilt functions that are useful
export const useButton: () => ButtonComponent = compose(createComponent, createAbstractComponent);
```
Lotus also has the concept of collection components which render collections of 
components. To create a collection component compose with `createCollectionComponent` and
create an item view composed with `createAbstractComponent`. Below is a component that displays 
a collection of image items.
```
import {mixin, Events, getComponentEvent, createComponent as createAbstractComponent} from './AbstractComponent';
import {createItemView, AbstractItemView, AbstractCollectionComponent, createComponent as createCollectionComponent} from './AbstractCollectionComponent';
import { List } from 'immutable';
import {compose} from 'ramda';

// utils
export type widthHeightObject = { width: number; height: number };
export const getScaleToFit = (objSize: widthHeightObject, sizeToFit: widthHeightObject): number => {
    return Math.min(sizeToFit.width / objSize.width, sizeToFit.height / objSize.height);
};
// export interfaces
export interface ImageItem extends AbstractItemView {
    width: number;
    height: number;
    allowDrag: boolean;
    onThumbClick: (event: Event) => void;
    onDragStart: (event: Event) => void;
    onImageLoad: (event: Event) => void;
    setThumbnailSrc: (src: string) => void;
    removeEventListeners: () => void;
    model: {src: string};
    render<T> (list?: List<T>): HTMLElement;
    render(list?: List<{src: string}>): HTMLElement;
}
export interface ImageGallery extends AbstractCollectionComponent {
    title?: string;
}
// export public functions
export const createImageView = (component: AbstractItemView): ImageItem => {
    // TODO figure out which of the functions below (if any) should be private
    const clone = mixin<ImageItem>(component, {
        width: NaN,
        height: NaN,
        allowDrag: true,
        onThumbClick: false,
        onDragStart: false,
        onImageLoad: false,
        setThumbnailSrc: false,
    });
    const render = clone.render;
    const destroy = clone.destroy;
    const onSkinPartAdded = clone.onSkinPartAdded;
    const resetState = clone.resetState;
    const sizeImage = () => {
        if (!clone.skinPartMap.get('thumbnail')) {
            return;
        }
        const imageSize = {
            width: parseInt(clone.skinPartMap.get('thumbnail').getAttribute('width')),
            height: parseInt(clone.skinPartMap.get('thumbnail').getAttribute('height')),
        };
        const containerSize = {
            width: parseInt(window.getComputedStyle(clone.element).width),
            height: parseInt(window.getComputedStyle(clone.element).height),
        };
        const scale = getScaleToFit(imageSize, containerSize);
        const width = imageSize.width * scale;
        const height = imageSize.height * scale;
        // console.log("width/height "+width+"/"+height)
        clone.skinPartMap.get('thumbnail').setAttribute('width', `${width}px`);
        clone.skinPartMap.get('thumbnail').setAttribute('height', `${height}px`);
        clone.skinPartMap.get('thumbnail').style.maxWidth = `${containerSize.width}px`;
        clone.skinPartMap.get('thumbnail').style.maxHeight = `${containerSize.height}px`;
    };
    clone.onThumbClick = (event: Event) => {
        clone.resetState(clone.element.classList.contains('selected'));
    };
    clone.onDragStart = (event: Event) => {
        // TODO: attach data attribute
    };
    clone.resetState = (state: boolean) => {
        resetState(state);
        const eventType = (state) ? Events.ITEM_SELECTED : Events.ITEM_DESELECTED;
        clone.dispatch(getComponentEvent(eventType, {item: clone}));
    };
    clone.onImageLoad = (event: Event) => {
        clone.skinPartMap.get('thumbnail').onload = null;
        clone.skinPartMap.get('thumbnail').style.visibility = 'visible';
        sizeImage();
    };
    clone.setThumbnailSrc = (src: string) => {
        clone.skinPartMap.get('thumbnail').onload = clone.onImageLoad;
        clone.skinPartMap.get('thumbnail').style.visibility = 'hidden';
        clone.skinPartMap.get('thumbnail')['src'] = src;
    };
    clone.removeEventListeners = () => {
        clone.skinPartMap.get('thumbnail').removeEventListener('click', clone.onThumbClick);
        clone.skinPartMap.get('thumbnail').removeEventListener('dragstart', clone.onDragStart);
    };
    clone.onSkinPartAdded = (part: string) => {
        onSkinPartAdded(part);
        switch (part) {
            // required, defines the layout for child views
            case 'thumbnail':
                clone.skinPartMap.get('thumbnail').setAttribute('draggable', (clone.allowDrag) ? 'true' : 'false');
                clone.skinPartMap.get('thumbnail').addEventListener('click', clone.onThumbClick);
                clone.skinPartMap.get('thumbnail').addEventListener('dragstart', clone.onDragStart);
                break;
        }
    };
    clone.destroy = () => {
        if (!clone.ready) {
            return;
        }
        // IMPORTANT child components need to clean up before calling super.destroy!!!
        clone.removeEventListeners();
        destroy();
    };
    clone.render = (list?: List<{ caption: string; src: string}>): HTMLElement => {
        render(list);
        if (list && list.size === 1) {
            clone.setThumbnailSrc(list.get(0).src);
            if (clone.skinPartMap.get('caption')) {
                clone.skinPartMap.get('caption').innerHTML = list.get(0).caption;
            }
        }
        return clone.element;
    };
    return clone;
};
export const createComponent = (component: AbstractCollectionComponent): ImageGallery => {
    const clone = mixin<ImageGallery>(component, {
        title: ''
    });
    return clone;
};
// create hook using compose
// hooks provide prebuilt functions that are useful
export const useImageView: () => ImageItem = compose(createImageView, createItemView, createAbstractComponent);
export const useImageGallery: () => ImageGallery = compose(createComponent, createCollectionComponent, createAbstractComponent);
```
#### Contributing

* Fork repo
* Review open issues
* Pick one that is unassigned and has the label "Help Wanted"
* Create your code
* Build your test
* `npm run test-local`
* submit your PR
