import {Config} from '../../../node_modules/lavenderjs/lib';
import {IResponder} from '../../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export interface ISampleService{
    config:Config;
    serviceMap:Object;

    sendRequest(isPostRequest:boolean, responder:IResponder, url:string, paramObj?:Object, format?:string, contentType?:string, cache?:boolean):string;
}