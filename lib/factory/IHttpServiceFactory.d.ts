import { IHttpService } from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export interface IHttpServiceFactory {
    getHttpService(code: string): IHttpService;
}
