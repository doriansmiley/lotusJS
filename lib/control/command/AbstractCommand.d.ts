import { ICommand } from "./ICommand";
import { IContext } from "../../context/IContext";
import { IEvent } from '../../../node_modules/lavenderjs/lib';
import { EventDispatcher } from '../../../node_modules/lavenderjs/lib';
import { IParser } from '../../../node_modules/lavenderjs/lib';
import { AsyncOperationModel } from '../../../node_modules/lavenderjs/lib';
import { ErrorModel } from '../../../node_modules/lavenderjs/lib';
import { IResult } from '../../../node_modules/lavenderjs/lib';
import { IFault } from '../../../node_modules/lavenderjs/lib';
import { IService } from "../service/IService";
/**
 * Created by dsmiley on 7/28/17.
 */
export declare abstract class AbstractCommand extends EventDispatcher implements ICommand {
    protected service: IService;
    protected opModel: AsyncOperationModel;
    protected parser: IParser;
    protected errorModel: ErrorModel;
    context: IContext;
    constructor(context: IContext);
    execute(event: IEvent): string;
    protected executeServiceMethod(): string;
    protected parseResponse(result: IResult): Object;
    protected dispatchSuccess(parsedResult: Object): void;
    success(result: IResult): void;
    fault(fault: IFault): void;
    onProgress(progress: number): void;
    protected getFaultString(): string;
    protected getErrorMessage(): string;
    protected executionError(): void;
    protected getExecErrorString(): string;
    destroy(): void;
}
