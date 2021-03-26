import {createComponent as createAbstractComponent, mixin} from './AbstractComponent';
import {
    AbstractCollectionComponent,
    AbstractItemView,
    createComponent as createCollectionComponent,
    createItemView
} from './AbstractCollectionComponent';
import compose from 'ramda/es/compose';

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
    render<T> (list?: Array<T>, isSsr?: boolean): HTMLElement;
    render(list?: Array<{src: string}>, isSsr?: boolean): HTMLElement;
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
    clone.onThumbClick = () => {
        clone.resetState(clone.element.classList.contains('selected'));
    };
    clone.onDragStart = () => {
        // TODO: attach data attribute
    };
    clone.resetState = (state: boolean) => {
        resetState(state);
        console.log(`you clicked: ${clone.skinPartMap.get('caption').innerHTML }`);
        // TODO: handle overrides
    };
    clone.onImageLoad = () => {
        clone.skinPartMap.get('thumbnail').onload = null;
        clone.skinPartMap.get('thumbnail').style.visibility = 'visible';
        sizeImage();
    };
    clone.setThumbnailSrc = (src: string) => {
        clone.skinPartMap.get('thumbnail').onload = clone.onImageLoad;
        clone.skinPartMap.get('thumbnail').style.visibility = 'hidden';
        (clone.skinPartMap.get('thumbnail') as HTMLImageElement).src = src;
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
    clone.render = (list?: Array<{ caption: string; src: string}>, isSsr = false): HTMLElement => {
        render(list, isSsr);
        if (list && list.length === 1) {
            clone.setThumbnailSrc(list[0].src);
            if (clone.skinPartMap.get('caption')) {
                clone.skinPartMap.get('caption').innerHTML = list[0].caption;
            }
        } else if (isSsr) {
            // if pre-rendered on the server, pass the url that was generated
            clone.setThumbnailSrc((clone.skinPartMap.get('thumbnail') as HTMLImageElement).src);
        }
        return clone.element;
    };
    return clone;
};
export const createComponent = (component: AbstractCollectionComponent): ImageGallery => {
    return mixin<ImageGallery>(component, {
        title: ''
    });
};
// create hook using compose
// hooks provide prebuilt functions that are useful
export const useImageView: () => ImageItem = compose(createImageView, createItemView, createAbstractComponent);
export const useImageGallery: () => ImageGallery = compose(createComponent, createCollectionComponent, createAbstractComponent);

