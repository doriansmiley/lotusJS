import { IContext } from "../../context/IContext";
import { IEvent } from 'lavenderjs/lib';
import { IEventDispatcher } from 'lavenderjs/lib';
import { IResult } from 'lavenderjs/lib';
import { IFault } from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/28/17.
 */
export interface ICommand extends IEventDispatcher {
    context: IContext;
    execute(event: IEvent): string;
    success(result: IResult): void;
    fault(fault: IFault): void;
    onProgress(progress: number): void;
    destroy(): void;
}
