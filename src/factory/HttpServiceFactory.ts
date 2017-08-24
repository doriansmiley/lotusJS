import {IHttpServiceFactory} from "./IHttpServiceFactory";
import {IHttpService} from 'lavenderjs/lib';
import {XhrHttpService} from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export class HttpServiceFactory implements IHttpServiceFactory{
    private static INSTANCE:IHttpServiceFactory = null;

    constructor(){
        if (HttpServiceFactory.INSTANCE != null ) {
            throw( 'HttpServiceFactory.INSTANCE: Singleton class has already been instantiated' );
        } else {
            //perform any required object set up
        }
    }

    public static getInstance():IHttpServiceFactory{
        if (HttpServiceFactory.INSTANCE == null) {
            HttpServiceFactory.INSTANCE = new HttpServiceFactory();
        }
        return HttpServiceFactory.INSTANCE;
    }

    //override this method to return custon IService implementations
    public getHttpService(code:string='XhrHttpService'):IHttpService{
        let httpService;
        switch(code){
            case "XhrHttpService":
            default:
                httpService = new XhrHttpService();
                break;
        }
        return httpService;
    }
}