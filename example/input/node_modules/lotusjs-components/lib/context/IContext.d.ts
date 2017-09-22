/**
 * Created by dsmiley on 7/24/17.
 */
import * as Lavender from 'lavenderjs/lib';
import { IComponentMap } from "./IComponentMap";
export interface IContext {
    config: Object;
    eventDispatcher: Lavender.IEventDispatcher;
    componentMap: IComponentMap;
    startUp(): any;
    mapComponents(): any;
}
