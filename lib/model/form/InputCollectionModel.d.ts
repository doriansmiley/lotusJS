/**
 * Created by dsmiley on 10/10/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class InputCollectionModel extends Lavender.Subject {
    static TYPE_INPUT: number;
    static TYPE_LIST: number;
    static TYPE_RADIO_GROUP: number;
    static TYPE_FILE: number;
    selectionRequired: boolean;
    private _type;
    private _collection;
    private _isValid;
    private _validators;
    constructor(type: String, collection: Lavender.ArrayList, selectionRequired?: boolean);
    validators: Lavender.ArrayList;
    isValid: boolean;
    type: number;
    collection: Lavender.ArrayList;
    setUpBindings(): void;
    validate(value?: boolean): Lavender.ArrayList;
    clear(): void;
    destroy(): void;
}
