import { AbstractHttpService } from '../service/AbstractHttpService';
import { IFault } from '../responder/IFault';
import { IResult } from '../responder/IResult';
export declare class XhrHttpService extends AbstractHttpService {
    private xhrRequest;
    private async;
    private notifyOnProgress;
    constructor(async?: boolean, notifyOnProgress?: boolean);
    private addEventListeners();
    private removeEventListeners();
    success(result: IResult): void;
    fault(fault: IFault): void;
    load(event: any): void;
    updateProgress(event: any): void;
    send(type: string, url: string, data: any, contentType: string, dataType: XMLHttpRequestResponseType, cache?: boolean): string;
    onXhrFault(event: any): void;
    abort(): void;
    destroy(): void;
}
