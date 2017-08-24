import {IEventDispatcherFactory} from "./IEventDispatcherFactory";
import * as Lavender from 'lavenderjs/lib';

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

    public getEventDispatcher(eventDispatcherCode:string='Lavender.EventDispatcher'):Lavender.IEventDispatcher{
        let dispatcher;
        //config.daoCode defaults to jquery
        switch( eventDispatcherCode ){
            case "Lavender.EventDispatcher":
            default:
                dispatcher = new Lavender.EventDispatcher();
        }
        return dispatcher;
    }
}