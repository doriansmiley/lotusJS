import {IEventDispatcher} from '../../node_modules/lavenderjs/lib';
import {IMediatorMap} from "./IMediatorMap";
import {IComponentMap} from "./IComponentMap";
import {ICommandMap} from "./ICommandMap";
import {IInjector} from "./IInjector";
import {IContext} from "./IContext";
import {ComponentMap} from "./ComponentMap";
import {CommandMap} from "./CommandMap";
import {Injector} from "./Injector";
import {MediatorMap} from "./MediatorMap";
import {EventDispatcherFactory} from "../factory/EventDispatcherFactory";

/**
 * Created by dsmiley on 7/24/17.
 */
export class Context implements IContext{
    public config:Object;
    public eventDispatcher:IEventDispatcher;
    public componentMap:IComponentMap;
    public commandMap:ICommandMap;
    public injector:IInjector
    public mediatorMap:IMediatorMap;
    
    constructor(config:Object, params:Object){
        this.config = config;
        //IMPORTANT: must occur first so application event bus is configured
        this.eventDispatcher = EventDispatcherFactory.getInstance().getEventDispatcher();
        this.componentMap = new ComponentMap(this);//create factory if we require sub classes one day
        this.commandMap = new CommandMap(this);//create factory if we require sub classes one day
        this.injector = new Injector(this);//create factory if we require sub classes one day
        this.mediatorMap = new MediatorMap(this);
        this.startUp();
    }

    public startUp(){

    }

    public mapComponents(){

    }

    public mapCommands(){

    }

    public mapObjects(){

    }

    public mapMediators(){

    }

}