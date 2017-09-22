/**
 * Created by dsmiley on 5/11/17.
 */
import { IFault } from './IFault';
import { IResult } from './IResult';
export interface IResponder {
    success(result: IResult): void;
    fault(fault: IFault): void;
    onProgress(progress: number): any;
}
