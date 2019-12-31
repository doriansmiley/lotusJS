import * as Lavender from 'lavenderjs/lib';
import {ComponentMapInterface} from "./ComponentMapInterface";
import {IContext} from "./IContext";
import {ComponentMap} from "./ComponentMap";

/**
 * Created by dsmiley on 7/24/17.
 */
export class Context implements IContext{
    public config:Object;
    public eventDispatcher:Lavender.IEventDispatcher;
    public componentMap:ComponentMapInterface;
    
    constructor(config:Object, params:Object){
        this.config = config;
        //IMPORTANT: must occur first so application event bus is configured
        this.componentMap = new ComponentMap(this);//create factory if we require sub classes one day
        this.startUp();
    }

    public startUp(){
        this.mapComponents();
    }

    public mapComponents(){

    }

}
