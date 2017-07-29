import {ICommand} from "./ICommand";
import {IContext} from "../../context/IContext";
import {IAction} from '../../../node_modules/lavenderjs/lib';
import {IEvent} from '../../../node_modules/lavenderjs/lib';
import {EventDispatcher} from '../../../node_modules/lavenderjs/lib';
import {ActionSuccessEvent} from '../../../node_modules/lavenderjs/lib';
import {ActionErrorEvent} from '../../../node_modules/lavenderjs/lib';
import {IParser} from '../../../node_modules/lavenderjs/lib';
import {IService} from "../service/IService";

/**
 * Created by dsmiley on 7/28/17.
 */
export class AbstractCommand extends EventDispatcher implements ICommand{
    protected action:IAction;
    protected service:IService;
    protected parser:IParser;
    public context:IContext;


    constructor(context:IContext){
        this.context = context;
        this.service = context.injector.inject('service') as IService;
        this.parser = context.injector.inject('parser') as IParser;
    }
    
    public execute(event:IEvent):string{
        this.action = this.getAction(event);
        this.action.addEventListener(ActionSuccessEvent.SUCCESS, this, 'onSuccess');
        this.action.addEventListener(ActionErrorEvent.ERROR, this, 'onError');//event, instance, handler
        return this.action.execute();
    }

    //stubb for override
    protected getAction(event:IEvent):IAction{
        return null
    }

    //stubb for override
    public onSuccess(event:IEvent):void{

    }

    public onError(event:IEvent):void{
        this.destroy();
        //the action will update the error mode, this is just here to help debugging
        if( console !== null && console !== undefined ){
            console.log('Lotus.AbstractCommand.prototype.onError: ' + event.payload);
        }
    }

    public destroy():void{
        if( this.canListen(ActionErrorEvent.ERROR, this, 'onError') ){
            this.removeEventListener(ActionErrorEvent.ERROR, this, 'onError');
        }
        if( this.canListen(ActionSuccessEvent.SUCCESS, this, 'onSuccess') ){
            this.removeEventListener(ActionSuccessEvent.SUCCESS, this, 'onSuccess');
        }
        this.action = null;
        this.context = null;
    }
}