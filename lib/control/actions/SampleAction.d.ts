import { AbstractServiceAction } from '../../../node_modules/lavenderjs/lib';
import { IService } from '../../../node_modules/lavenderjs/lib';
import { AsyncOperationModel } from '../../../node_modules/lavenderjs/lib';
import { IParser } from '../../../node_modules/lavenderjs/lib';
import { IResult } from '../../../node_modules/lavenderjs/lib';
import { ErrorModel } from '../../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/28/17.
 */
export declare class SampleAction extends AbstractServiceAction {
    constructor(service: IService, opModel: AsyncOperationModel, parser: IParser, errorModel: ErrorModel);
    protected executeServiceMethod(): string;
    protected parseResponse(result: IResult): Object;
    protected getFaultString(): string;
    protected getErrorMessage(): string;
    protected getExecErrorString(): string;
}
