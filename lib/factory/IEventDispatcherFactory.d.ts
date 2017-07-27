import { IEventDispatcher } from '../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export interface IEventDispatcherFactory {
    getEventDispatcher(eventDispatcherCode?: string): IEventDispatcher;
}
