/**
 * Created by dsmiley on 7/24/17.
 */
import {Config} from '../../node_modules/lavenderjs/lib';
import {IEventDispatcher} from '../../node_modules/lavenderjs/lib';
import {IMediatorMap} from "./IMediatorMap";
import {IComponentMap} from "./IComponentMap";
import {ICommandMap} from "./ICommandMap";
import {IInjector} from "./IInjector";

export interface IContext{
    config:Object;
    eventDispatcher:IEventDispatcher;
    componentMap:IComponentMap;
    commandMap:ICommandMap;
    injector:IInjector
    mediatorMap:IMediatorMap;

    startUp();
    mapComponents();
    mapCommands();
    mapObjects();
    mapMediators();
}