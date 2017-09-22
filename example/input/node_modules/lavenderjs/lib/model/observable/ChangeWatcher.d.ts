/**
 * Created by dsmiley on 4/18/17.
 */
import { IObserver } from './IObserver';
export declare class ChangeWatcher implements IObserver {
    readonly chain: string;
    readonly instance: Object;
    readonly chainProp: string;
    readonly isCSS: boolean;
    readonly cssProperty: string;
    constructor(hostProp: string, chainInstance: Object, chainPropToWatch: string, isCSS?: boolean, cssProperty?: string);
    update(value: any, chain?: Object): void;
}
