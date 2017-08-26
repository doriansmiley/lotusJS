/**
 * Created by dsmiley on 7/12/17.
 */
import { IResult } from '../responder/IResult';
export declare class HttpSuccess implements IResult {
    resultObj: any;
    status: number;
    requestId: string;
    constructor(resultObj: any, status: number, requestId: string);
}
