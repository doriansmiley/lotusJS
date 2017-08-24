import { IService } from "../control/service/IService";
import { Config } from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export interface IServiceFactory {
    getService(config: Config): IService;
}
