import { IContext } from "../../context/IContext";
import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/28/17.
 */
export interface ICommand extends Lavender.IEventDispatcher {
    context: IContext;
    execute(event: Lavender.IEvent): string;
    success(result: Lavender.IResult): void;
    fault(fault: Lavender.IFault): void;
    onProgress(progress: number): void;
    destroy(): void;
}
