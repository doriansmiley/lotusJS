import {IContext} from "../../context/IContext";
import {IEvent} from '../../../node_modules/lavenderjs/lib';
import {IEventDispatcher} from '../../../node_modules/lavenderjs/lib';

/**
 * Created by dsmiley on 7/28/17.
 */
export interface ICommand extends IEventDispatcher{
    context:IContext;

    execute(event:IEvent):string;
    onSuccess(event:IEvent):void;
    onError(event:IEvent):void;
    destroy():void;
}