import {IService} from "../service/IService";
import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/28/17.
 */
export interface ISampleService extends IService{
    echoJSON(jsonKey:string, key:string, responder:Lavender.IResponder, paramObj?:Object, format?:string, contentType?:string, cache?:boolean):string;
    testRequestUsingIncludedAPI(key:string, responder:Lavender.IResponder, format?:string, contentType?:string, cache?:boolean):string;
}