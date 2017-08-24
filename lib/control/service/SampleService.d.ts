import { IService } from "./IService";
import { Config } from 'lavenderjs/lib';
import { IResponder } from 'lavenderjs/lib';
import { AbstractHttpService } from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 * This is a sample asynchronous action used in unit tests. It can be used as a template though for all asynch actions
 */
export declare class SampleService extends AbstractHttpService implements IService {
    config: Config;
    serviceMap: Object;
    constructor(config: Config);
    protected getURLWithParams(key: string, args: Array<string>): string;
    protected getURL(key: string): string;
    echoJSON(jsonKey: string, key: string, responder: IResponder, paramObj?: Object, format?: string, contentType?: string, cache?: boolean): string;
    testRequestUsingIncludedAPI(key: string, responder: IResponder, format?: string, contentType?: string, cache?: boolean): string;
    sendRequest(isPostRequest: boolean, responder: IResponder, url: string, paramObj?: Object, format?: string, contentType?: string, cache?: boolean): string;
}
