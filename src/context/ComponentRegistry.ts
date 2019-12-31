export interface TagDefinition {
    created?: Function;
    inserted?: Function;
    removed?: Function;
    attributeChanged?: (attrName: string, oldValue: any, newValue: any) => void;
    base: HTMLElement;
    tagName: string;
    tagFunction: Function;
}

export function register(tagDef: TagDefinition) {
    // Object.assign(Object.create(HTMLButtonElement.prototype), {'one': 1, 'a': 'a'})
    /*
    * {
        // extend existing elements
        prototype: prototype,
        lifecycle:lifecycle
    }
    * */
};
