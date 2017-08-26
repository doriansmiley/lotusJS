/**
 * Created by dsmiley on 5/17/17.
 */
import { Subject } from './observable/Subject';
export declare class AsyncOperationModel extends Subject {
    private _asyncOperationCount;
    private _asyncOperationComplete;
    constructor();
    asyncOperationCount: number;
    asyncOperationComplete: boolean;
    addAsyncOperation(): void;
    removeAsyncOperation(): void;
}
