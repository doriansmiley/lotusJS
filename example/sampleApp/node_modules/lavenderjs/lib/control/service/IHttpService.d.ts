/**
 * Created by dsmiley on 5/11/17.
 */
import { IResponder } from '../responder/IResponder';
export interface IHttpService {
    requestId: string;
    addResponder(reponder: IResponder): void;
    send(type: string, url: string, data: any, contentType: string, dataType: string, cache: boolean): string;
    destroy(): void;
}
