import {IEventDispatcherFactory} from "./IEventDispatcherFactory";
import {IEventDispatcher} from '../../node_modules/lavenderjs/lib';
import {EventDispatcher} from '../../node_modules/lavenderjs/lib';

/**
 * Created by dsmiley on 7/27/17.
 */
export class EventDispatcherFactory implements IEventDispatcherFactory{
    private static INSTANCE:IEventDispatcherFactory = null;

    constructor(){
        if (EventDispatcherFactory.INSTANCE != null ) {
            throw( 'EventDispatcherFactory.INSTANCE: Singleton class has already been instantiated' );
        } else {
            //perform any required object set up
        }
    }

    public static getInstance():IEventDispatcherFactory{
        if (EventDispatcherFactory.INSTANCE == null) {
            EventDispatcherFactory.INSTANCE = new EventDispatcherFactory();
        }
        return EventDispatcherFactory.INSTANCE;
    }

    public getEventDispatcher(eventDispatcherCode:string='EventDispatcher'):IEventDispatcher{
        var dispatcher;
        //config.daoCode defaults to jquery
        switch( eventDispatcherCode ){
            case "EventDispatcher":
            default:
                dispatcher = new EventDispatcher();
        }
        return dispatcher;
    }
}