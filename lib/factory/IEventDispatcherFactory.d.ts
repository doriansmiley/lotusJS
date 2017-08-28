import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export interface IEventDispatcherFactory {
    getEventDispatcher(eventDispatcherCode?: string): Lavender.IEventDispatcher;
}
