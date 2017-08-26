import { IHttpServiceFactory } from "./IHttpServiceFactory";
import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export declare class HttpServiceFactory implements IHttpServiceFactory {
    private static INSTANCE;
    constructor();
    static getInstance(): IHttpServiceFactory;
    getHttpService(code?: string): Lavender.IHttpService;
}
