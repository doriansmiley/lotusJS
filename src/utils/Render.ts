import {getTagDef, register, TagDefinition} from '..';

export const render = async (tagDef: TagDefinition, target: HTMLElement, props?: (element: HTMLElement) => void) => {
    if (!getTagDef(tagDef.tagName)) {
        await register(tagDef);
    }
    // create our component
    const element = document.createElement(tagDef.tagName);
    // transfer properties
    if (props) {
        props(element);
    }
    target.append(element);
    return element;
};
