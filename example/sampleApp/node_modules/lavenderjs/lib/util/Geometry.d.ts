/**
 * Created by dsmiley on 6/30/17.
 */
import { Subject } from '../model/observable/Subject';
export declare class Geometry extends Subject {
    private _left;
    private _top;
    private _width;
    private _height;
    constructor(values?: any);
    left: number;
    top: number;
    width: number;
    height: number;
    update(values?: Object): void;
    getDefinedValues(): Object;
}
