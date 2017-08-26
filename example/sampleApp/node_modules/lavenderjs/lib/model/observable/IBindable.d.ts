/**
 * Created by dsmiley on 4/18/17.
 */
import { IObserver } from './IObserver';
export interface IBindable {
    notify(value: any, chain: Object): void;
    addObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
}
