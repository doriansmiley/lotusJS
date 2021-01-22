import {Component, mixin, Events, getComponentEvent, createComponent as createAbstractComponent} from './AbstractComponent';
import compose from 'ramda/es/compose';

// export interfaces
export interface ButtonComponent extends Component {
    onClick: (event: Event) => void;
}
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
