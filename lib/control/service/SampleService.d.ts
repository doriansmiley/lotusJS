import { IService } from "./IService";
import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 * This is a sample asynchronous action used in unit tests. It can be used as a template though for all asynch actions
 */
export declare class SampleService extends Lavender.AbstractHttpService implements IService {
    config: Lavender.Config;
    serviceMap: Object;
    constructor(config: Lavender.Config);
    protected getURLWithParams(key: string, args: Array<string>): string;
    protected getURL(key: string): string;
    echoJSON(jsonKey: string, key: string, responder: Lavender.IResponder, paramObj?: Object, format?: string, contentType?: string, cache?: boolean): string;
    testRequestUsingIncludedAPI(key: string, responder: Lavender.IResponder, format?: string, contentType?: string, cache?: boolean): string;
    sendRequest(isPostRequest: boolean, responder: Lavender.IResponder, url: string, paramObj?: Object, format?: string, contentType?: string, cache?: boolean): string;
}
