/**
 * Created by dsmiley on 8/1/17.
 */
import * as Lavender from 'lavenderjs/lib';
import { SkinPart } from "./SkinPart";
export declare class SkinPartList extends Lavender.ArrayList {
    skinPartsByLabel: Object;
    constructor(source?: Array<any>, allowDuplicates?: boolean);
    addItem(object: SkinPart, hash?: Object, key?: string): number;
    clear(): void;
    removeItemAt(index: number): void;
    insert(object: SkinPart, index: number, suppressChangeEvent?: boolean, hash?: Object, key?: string, replaceIndex?: boolean): number;
}
