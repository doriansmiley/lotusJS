/**
 * Created by dsmiley on 7/12/17.
 */
import { IFault } from '../responder/IFault';
export declare class HttpFault implements IFault {
    errorObj: any;
    status: number;
    message: string;
    requestId: string;
    constructor(errorObj: any, status: number, message: string, requestId: string);
}
