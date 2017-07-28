import { IService } from "./IService";
import { Config } from '../../../node_modules/lavenderjs/lib';
import { IResponder } from '../../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export declare class SampleService implements IService {
    config: Config;
    serviceMap: Object;
    constructor(config: Config);
    protected getURLWithParams(key: string, args: Array<string>): string;
    protected getURL(key: string): string;
    echoJSON(jsonKey: string, key: string, responder: IResponder, paramObj?: Object, format?: string, contentType?: string, cache?: boolean): string;
    testRequestUsingIncludedAPI(key: string, responder: IResponder, format?: string, contentType?: string, cache?: boolean): string;
    sendRequest(isPostRequest: boolean, responder: IResponder, url: string, paramObj?: Object, format?: string, contentType?: string, cache?: boolean): string;
}
