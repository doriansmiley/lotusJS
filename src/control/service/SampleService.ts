import {IService} from "./IService";
import {Config} from '../../../node_modules/lavenderjs/lib';
import {IResponder} from '../../../node_modules/lavenderjs/lib';
import {StringUtil} from '../../../node_modules/lavenderjs/lib';
import {AbstractHttpService} from '../../../node_modules/lavenderjs/lib';
import {HttpServiceFactory} from '../../factory/HttpServiceFactory'
/**
 * Created by dsmiley on 7/27/17.
 * This is a sample asynchronous action used in unit tests. It can be used as a template though for all asynch actions
 */
export class SampleService extends AbstractHttpService implements IService{
    public config:Config;
    public serviceMap:Object;

    constructor(config:Config){
        super();
        this.config = config;
        this.serviceMap = (config.hasOwnProperty('serviceMap')) ? config['serviceMap'] :
        {
            'echoJSON'				    : ':3000/echoJSON/key/{0}',
            'localRequest'				: ':3000/printondemand/1234/photos/{0}'
        };
    }
    
    protected getURLWithParams(key:string, args:Array<string>):string{
        return (args !== null && args !== undefined ) ? StringUtil.substitute(this.getURL(key), args) : this.getURL(key);
    }

    protected getURL(key:string):string{
        return this.config.baseUrl + this.serviceMap[key];
    }

    public echoJSON(jsonKey:string, key:string, responder:IResponder, paramObj:Object={}, format:string='json', contentType:string='application/json', cache:boolean=false):string{
        //this is a sample service method to be used as an example only. You service methods will be dependent on your service API and model objects
        //note the use of the key param. This is a very importnat feature and I highly recommend that whatever service you created implements a similar method
        //don't hard code or otherwise tightly couple the URL creation inside this method. The use of a builder pattern ensures the end point can be changed based on environment
        var url = this.getURLWithParams(key, [jsonKey]);
        return this.sendRequest(true, responder, url, paramObj, format, contentType, cache);
    }

    public testRequestUsingIncludedAPI(key:string, responder:IResponder, format:string='json', contentType:string='application/json', cache:boolean=false):string{
        var url = this.getURLWithParams(key, ['54232fc2-7345-4921-8079']);//hard coded args
        return this.sendRequest(false, responder, url, null, format, contentType, cache);
    }

    public sendRequest(isPostRequest:boolean, responder:IResponder, url:string, paramObj:Object={}, format:string='json', contentType:string='application/json', cache:boolean=false):string{
        var params = JSON.stringify(paramObj);

        if( cache === null || cache === undefined ){
            cache = false;
        }

        var httpRequestInstance = HttpServiceFactory.getInstance().getHttpService(this.config.serviceCode);
        httpRequestInstance.addResponder(responder);
        var requestType = (isPostRequest) ? 'POST' : 'GET';
        return httpRequestInstance.send(requestType, url, params, contentType, format, cache);
    }
}