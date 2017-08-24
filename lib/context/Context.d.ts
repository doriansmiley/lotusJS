import { IEventDispatcher } from 'lavenderjs/lib';
import { IMediatorMap } from "./IMediatorMap";
import { IComponentMap } from "./IComponentMap";
import { ICommandMap } from "./ICommandMap";
import { IInjector } from "./IInjector";
import { IContext } from "./IContext";
/**
 * Created by dsmiley on 7/24/17.
 */
export declare class Context implements IContext {
    config: Object;
    eventDispatcher: IEventDispatcher;
    componentMap: IComponentMap;
    commandMap: ICommandMap;
    injector: IInjector;
    mediatorMap: IMediatorMap;
    constructor(config: Object, params: Object);
    startUp(): void;
    mapComponents(): void;
    mapCommands(): void;
    mapObjects(): void;
    mapMediators(): void;
}
