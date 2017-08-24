/**
 * Created by dsmiley on 7/24/17.
 */
import {IContext} from './IContext';
import {ICommandMap} from './ICommandMap';
import * as Lavender from 'lavenderjs/lib';

export class CommandMap implements ICommandMap{
    public eventFunctionMap:Object;
    public instanceMap:Object;
    public context:IContext;

    constructor(context:IContext){
        //Note: this could be improved by creating read only accessor methods for instanceMap and eventFunctionMap
        this.eventFunctionMap = {};
        this.instanceMap = {};
        this.context = context;
    }

    public addCommand(eventType:string, handler:any, functionName:string='execute', useSingleton:boolean=false):void{
        if( this.eventFunctionMap[eventType] === null || this.eventFunctionMap[eventType] === undefined ){
            this.eventFunctionMap[eventType] = [];
        }

        if( this.hasCommandMap( eventType, handler, functionName ) ){
            return;//don't add the handler/function twice
        }

        this.eventFunctionMap[eventType].push({eventType:eventType, handler:handler, functionName:functionName, useSingleton:useSingleton});

        if( useSingleton ){
            if( this.instanceMap[eventType] === null ||  this.instanceMap[eventType] === undefined ){
                this.instanceMap[eventType] = {};
            }
            if( this.instanceMap[eventType][handler] === null ||  this.instanceMap[eventType][handler] === undefined ){
                this.instanceMap[eventType][handler] = new handler(this.context);
            }
        }
        if( !this.context.eventDispatcher.canListen(eventType, this, 'routeEventToCommand') ){
            this.context.eventDispatcher.addEventListener(eventType, this, 'routeEventToCommand');
        }
    }

    public hasCommandMap(eventType:string, handler:Object, functionName:string):boolean{
        let hasCommand = false;
        if( this.eventFunctionMap[eventType] !== null && this.eventFunctionMap[eventType] !== undefined ){
            let mapArray = this.eventFunctionMap[eventType];
            for( let itemIndex = 0; itemIndex < mapArray.length; itemIndex++){
                let item = mapArray[ itemIndex ];
                if( item.handler == handler && item.functionName == functionName ){
                    hasCommand = true;
                    break;
                }
            }
        }
        return hasCommand;
    }

    public removeCommand(eventType:string, handler:Object):void{
        if( this.eventFunctionMap[eventType] !== null && this.eventFunctionMap[eventType] !== undefined ){
            let mapArray = this.eventFunctionMap[eventType];
            for( let itemIndex = mapArray.length - 1; itemIndex >= 0; itemIndex--){
                let item = mapArray[ itemIndex ];
                if( item.handler == handler ){
                    //remove the item form the array
                    switch (itemIndex) {
                        case 0:
                            mapArray.shift();
                            break;
                        case mapArray.length - 1:
                            mapArray.pop();
                            break;
                        default:
                            let head = mapArray.slice(0, itemIndex);
                            let tail = mapArray.slice(itemIndex + 1);
                            mapArray = head.concat(tail);
                            break;
                    }
                }
            }
            if( this.eventFunctionMap[eventType].length <= 0 ){
                this.context.eventDispatcher.removeEventListener(eventType, this, 'routeEventToCommand');
                delete this.eventFunctionMap[eventType];
            }
        }
    }

    public removeAllCommands():void{
        this.eventFunctionMap = {};
        this.instanceMap = {};
        this.context.eventDispatcher.removeAllEventListeners(this);
    }

    public routeEventToCommand(event:Lavender.IEvent):void{
        if( this.eventFunctionMap[event.type] !== null && this.eventFunctionMap[event.type] !== undefined ){
            let mapArray = this.eventFunctionMap[event.type];
            for( let itemIndex = 0; itemIndex < mapArray.length; itemIndex++){
                let item = mapArray[ itemIndex ];
                if( item.useSingleton ){
                    this.instanceMap[item.event.type][item.handler][item.functionName]();
                }else{
                    let instance;
                    if( typeof item.handler === 'object' ){
                        instance = item.handler;
                    }else{
                        //IMPORTANT: only constructor function will get the context! This is by design as it's assumed preconstructed objects have all required dependencies
                        instance = new item.handler(this.context);
                    }
                    instance[item.functionName](event);
                }
            }
        }
    }
}