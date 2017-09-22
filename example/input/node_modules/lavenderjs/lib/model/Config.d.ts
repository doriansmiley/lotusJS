/**
 * Created by dsmiley on 5/17/17.
 */
import { Subject } from './observable/Subject';
import { AsyncOperationModel } from "./AsyncOperationModel";
import { ErrorModel } from "./ErrorModel";
export declare class Config extends Subject {
    private _baseUrl;
    private _webRoot;
    private _parserCode;
    private _exporterCode;
    private _token;
    private _serviceCode;
    private _asyncOperationModel;
    private _errorModel;
    constructor();
    errorModel: ErrorModel;
    asyncOperationModel: AsyncOperationModel;
    serviceCode: string;
    baseUrl: string;
    webRoot: string;
    parserCode: string;
    exporterCode: string;
    token: string;
}
