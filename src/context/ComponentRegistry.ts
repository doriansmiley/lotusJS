export interface IDefinition {
    created?: Function;
    inserted?: Function;
    removed?: Function;
    attributeChanged?: (attrName: string, oldValue: any, newValue: any) => void;
    prototype?: any;
}

export function register(name: string, definition: IDefinition) {
    // Object.assign(Object.create(HTMLButtonElement.prototype), {'one': 1, 'a': 'a'})
    /*
    * {
        // extend existing elements
        prototype: prototype,
        lifecycle:lifecycle
    }
    * */
};
