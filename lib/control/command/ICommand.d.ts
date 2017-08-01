import { IContext } from "../../context/IContext";
import { IEvent } from '../../../node_modules/lavenderjs/lib';
import { IEventDispatcher } from '../../../node_modules/lavenderjs/lib';
import { IResult } from '../../../node_modules/lavenderjs/lib';
import { IFault } from '../../../node_modules/lavenderjs/lib';
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
