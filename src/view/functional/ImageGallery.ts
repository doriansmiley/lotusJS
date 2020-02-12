import {mixin, Events, getComponentEvent} from './AbstractComponent';
import {createItemView, AbstractItemView, AbstractCollectionComponent, createComponent as createCollectionComponent} from './AbstractCollectionComponent';
import { List } from 'immutable';
import { ResizeUtils } from 'lavenderjs';

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
}
export interface ImageGallery extends AbstractCollectionComponent {
    title?: string;
}
// export public functions
export const createImageView = (allowDrag = true): ImageItem => {
    // TODO figure out which of the functions below (if any) should be private
    const clone: ImageItem = mixin(createItemView(), {
        width: NaN,
        height: NaN,
        allowDrag,
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
        const scale = ResizeUtils.getScaleToFit(imageSize, containerSize);
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
        destroy();
        clone.removeEventListeners();
        clone.model = null;
    };
    clone.render = <T> (list?: List<T>): HTMLElement => {
        // super.render will set clone.model
        render(list);
        clone.setThumbnailSrc(clone.model.src);
        return clone.element;
    };
    return clone;
};
export const createComponent = (title?: string): ImageGallery => {
    const clone: ImageGallery = mixin(createCollectionComponent(), {
        title
    });
    return clone;
};

