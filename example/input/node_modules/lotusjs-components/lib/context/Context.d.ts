import * as Lavender from 'lavenderjs/lib';
import { IComponentMap } from "./IComponentMap";
import { IContext } from "./IContext";
/**
 * Created by dsmiley on 7/24/17.
 */
export declare class Context implements IContext {
    config: Object;
    eventDispatcher: Lavender.IEventDispatcher;
    componentMap: IComponentMap;
    constructor(config: Object, params: Object);
    startUp(): void;
    mapComponents(): void;
}
