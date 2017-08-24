import {Config} from 'lavenderjs/lib';
import {IResponder} from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export interface IService{
    config:Config;
    serviceMap:Object;

    sendRequest(isPostRequest:boolean, responder:IResponder, url:string, paramObj?:Object, format?:string, contentType?:string, cache?:boolean):string;
}