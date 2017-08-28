import {IHttpServiceFactory} from "./IHttpServiceFactory";
import * as Lavender from 'lavenderjs/lib';
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
    public getHttpService(code:string='Lavender.XhrHttpService'):Lavender.IHttpService{
        let httpService;
        switch(code){
            case "Lavender.XhrHttpService":
            default:
                httpService = new Lavender.XhrHttpService();
                break;
        }
        return httpService;
    }
}