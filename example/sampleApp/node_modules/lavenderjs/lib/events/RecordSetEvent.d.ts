/**
 * Created by dsmiley on 5/12/17.
 */
import { IEvent } from './IEvent';
import { AbstractEvent } from './AbstractEvent';
export declare class RecordSetEvent extends AbstractEvent {
    constructor(type: string, payload?: Object);
    static TOTALRECORDS_CHANGE: string;
    static TOTALPAGES_CHANGE: string;
    static PAGE_LIST_CHANGE: string;
    static RESULTS_CHANGE: string;
    static RECORDS_PER_PAGE_CHANGE: string;
    static SELECTED_PAGE_CHANGE: string;
    static RECORDSETS_CHANGE: string;
    static LOAD_PAGE_DATA: string;
    clone(type: string, payload: Object): IEvent;
}
