import { IService } from "../control/service/IService";
import { IServiceFactory } from "./IServiceFactory";
import { Config } from '../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export declare class ServiceFactory implements IServiceFactory {
    private static INSTANCE;
    constructor();
    static getInstance(): IServiceFactory;
    getService(config: Config): IService;
}
