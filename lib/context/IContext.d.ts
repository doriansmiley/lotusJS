/**
 * Created by dsmiley on 7/24/17.
 */
import * as Lavender from 'lavenderjs/lib';
import { IMediatorMap } from "./IMediatorMap";
import { IComponentMap } from "./IComponentMap";
import { ICommandMap } from "./ICommandMap";
import { IInjector } from "./IInjector";
export interface IContext {
    config: Object;
    eventDispatcher: Lavender.IEventDispatcher;
    componentMap: IComponentMap;
    commandMap: ICommandMap;
    injector: IInjector;
    mediatorMap: IMediatorMap;
    startUp(): any;
    mapComponents(): any;
    mapCommands(): any;
    mapObjects(): any;
    mapMediators(): any;
}
