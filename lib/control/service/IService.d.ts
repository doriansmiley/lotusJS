import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export interface IService {
    config: Lavender.Config;
    serviceMap: Object;
    sendRequest(isPostRequest: boolean, responder: Lavender.IResponder, url: string, paramObj?: Object, format?: string, contentType?: string, cache?: boolean): string;
}
