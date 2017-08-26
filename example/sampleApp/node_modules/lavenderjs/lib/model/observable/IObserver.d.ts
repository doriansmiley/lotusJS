/**
 * Created by dsmiley on 4/18/17.
 */
export interface IObserver {
    chain: string;
    instance: Object;
    chainProp: string;
    isCSS: Boolean;
    cssProperty: string;
    update(value: any, chain: Object): void;
}
