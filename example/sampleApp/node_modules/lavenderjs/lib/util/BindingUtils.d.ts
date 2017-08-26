import { IObserver } from '../model/observable/IObserver';
import { IBindable } from '../model/observable/IBindable';
export declare class BindingUtils {
    static bind(host: IBindable, hostProp: string, chain: Object, chainProp: string, isCSS?: boolean, cssProperty?: string): IObserver;
}
