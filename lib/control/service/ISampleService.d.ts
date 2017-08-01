import { IService } from "../service/IService";
import { IResponder } from '../../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/28/17.
 */
export interface ISampleService extends IService {
    echoJSON(jsonKey: string, key: string, responder: IResponder, paramObj?: Object, format?: string, contentType?: string, cache?: boolean): string;
    testRequestUsingIncludedAPI(key: string, responder: IResponder, format?: string, contentType?: string, cache?: boolean): string;
}
