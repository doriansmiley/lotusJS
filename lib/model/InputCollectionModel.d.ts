/**
 * Created by dsmiley on 10/10/17.
 */
import * as Lavender from 'lavenderjs/lib';
import { InputModel } from "./InputModel";
export declare class InputCollectionModel extends Lavender.Subject {
    static TYPE_INPUT: number;
    static TYPE_LIST: number;
    static TYPE_RADIO_GROUP: number;
    static TYPE_FILE: number;
    private _type;
    private _collection;
    type: number;
    collection: Lavender.ArrayList;
    validate(): Array<InputModel>;
    clear(): void;
}
