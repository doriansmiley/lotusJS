import {IService} from "../control/service/IService";
import {IServiceFactory} from "./IServiceFactory";
import {SampleService} from "../control/service/SampleService";
import {Config} from '../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export class ServiceFactory implements IServiceFactory{
    private static INSTANCE:IServiceFactory = null;

    constructor(){
        if (ServiceFactory.INSTANCE != null ) {
            throw( 'ServiceFactory.INSTANCE: Singleton class has already been instantiated' );
        } else {
            //perform any required object set up
        }
    }

    public static getInstance():IServiceFactory{
        if (ServiceFactory.INSTANCE == null) {
            ServiceFactory.INSTANCE = new ServiceFactory();
        }
        return ServiceFactory.INSTANCE;
    }

    public getService(config:Config):IService{
        var service;
        switch( config.serviceCode ){
            default:
                service = new SampleService( config );
        }
        return service;
    }
}