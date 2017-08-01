import { AbstractCommand } from "./AbstractCommand";
import { IContext } from "../../context/IContext";
import { IResult } from '../../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/28/17.
 */
export declare class SampleCommand extends AbstractCommand {
    protected model: Object;
    constructor(context: IContext);
    protected executeServiceMethod(): string;
    protected parseResponse(result: IResult): Object;
    protected getFaultString(): string;
    protected getErrorMessage(): string;
    protected getExecErrorString(): string;
}
