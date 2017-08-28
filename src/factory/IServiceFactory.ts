import {IService} from "../control/service/IService";
import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export interface IServiceFactory{
    getService(config:Lavender.Config):IService
}