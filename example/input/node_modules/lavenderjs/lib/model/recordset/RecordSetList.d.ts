/**
 * Created by dsmiley on 5/17/17.
 */
import { ArrayList } from '../list/ArrayList';
import { RecordSet } from './RecordSet';
export declare class RecordSetList extends ArrayList {
    recordSetsBySource: Object;
    recordSetsById: Object;
    constructor(source?: Array<any>, allowDuplicates?: boolean);
    addItem(item: RecordSet, hash?: Object, key?: string): number;
    clear(): void;
    removeItemAt(index: number): void;
    insert(object: RecordSet, index: number, suppressChangeEvent?: boolean, hash?: Object, key?: string, replaceIndex?: boolean): number;
}
