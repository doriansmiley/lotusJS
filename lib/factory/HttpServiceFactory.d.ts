import { IHttpServiceFactory } from "./IHttpServiceFactory";
import { IHttpService } from '../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export declare class HttpServiceFactory implements IHttpServiceFactory {
    private static INSTANCE;
    constructor();
    static getInstance(): IHttpServiceFactory;
    getHttpService(code?: string): IHttpService;
}
