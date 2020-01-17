import {ButtonComponent, createComponent as createButtonComponent} from './Button';
import {mixin} from './AbstractComponent';

// export interfaces
export interface SuperButton extends ButtonComponent {
    onMouseOverLabel: (event: Event) => void;
};

export const createComponent = (): SuperButton => {
    const clone =  mixin<SuperButton>(createButtonComponent(), {
        onMouseOverLabel: null,
    });
    // capture a reference to super.onSkinPartAdded
    const onSkinPartAdded = clone.onSkinPartAdded;
    const onClick = clone.onClick;
    const removeEventListeners = clone.removeEventListeners;
    // example of method override, maybe look into a decorator like @extend to do this in the future
    clone.onSkinPartAdded = (part: string) => {
        // call super
        onSkinPartAdded(part);
        switch (part) {
            case 'label':
                // add button event listener or whatever else yo want to do when this skin part is added
                // you could hold until all skin parts are added and then call addEventListeners
                console.log(`Lotus.SuperButton.prototype.onSkinPartAdded: part: ${part}`);
                clone.skinPartMap.get(part).addEventListener('mouseover', clone.onMouseOverLabel);
                break;
        }
    };
    clone.onMouseOverLabel = (event) => {
        console.log(`Lotus.SuperButton.prototype.onMouseOverLabel: event is ${event}`);
        console.log(`Lotus.SuperButton.prototype.onMouseOverLabel: my id is ${clone.id}`);
    };
    // example of method override
    clone.onClick  = (event) => {
        // call super
        onClick(event);
        console.log(`Lotus.SuperButton.prototype.SuperButton: my id is ${clone.id}`);
    };
    // example of method override
    clone.removeEventListeners = () => {
        // call super
        removeEventListeners();
        if (clone.skinPartMap.get('label')) {
            clone.skinPartMap.get('label').removeEventListener('click', clone.onClick);
        }
    };
    return clone;
};
