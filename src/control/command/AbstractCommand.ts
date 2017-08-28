import {ICommand} from "./ICommand";
import {IContext} from "../../context/IContext";
import * as Lavender from 'lavenderjs/lib';
import {ActionSuccessEvent} from '../events/ActionSuccessEvent';
import {ActionErrorEvent} from '../events/ActionErrorEvent';
import {IService} from "../service/IService";

/**
 * Created by dsmiley on 7/28/17.
 */
export abstract class AbstractCommand extends Lavender.EventDispatcher implements ICommand{
    protected service:IService;
    protected opModel:Lavender.AsyncOperationModel;
    protected parser:Lavender.IParser;
    protected errorModel:Lavender.ErrorModel;
    public context:IContext;


    constructor(context:IContext){
        super();
        this.context = context;
        this.service = context.injector.inject('service') as IService;
        this.parser = context.injector.inject('parser') as Lavender.IParser;
        this.opModel = context.injector.inject('opModel') as Lavender.AsyncOperationModel;
        this.errorModel = context.injector.inject('errorModel') as Lavender.ErrorModel;
    }
    
    public execute(event:Lavender.IEvent):string{
        if (this.service === null || this.service === undefined || this.opModel === null || this.opModel === undefined || this.parser === null || this.parser === undefined) {
            this.executionError();
        }
        this.opModel.asyncOperationComplete = false;
        this.opModel.asyncOperationCount += 1;
        return this.executeServiceMethod();
    }

    //method must return a requestID
    //Override this method in subclasses
    protected executeServiceMethod():string{
        return null;
    }

    //Override this method in subclasses
    //it should parse the result and return the resulting Object tree
    protected parseResponse(result:Lavender.IResult):Object{
        return null;
    }

    protected dispatchSuccess(parsedResult:Object):void{
        let doneEvent = new ActionSuccessEvent(ActionSuccessEvent.SUCCESS,{result:parsedResult});
        this.dispatch(doneEvent);
    }

    public success(result:Lavender.IResult):void{
        try {
            //result is instance of Lavender.HttpSuccess
            let parsedResult = this.parseResponse(result);
            this.dispatchSuccess(parsedResult);
        } catch (e) {
            let errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
            let errorEvent = new ActionErrorEvent(ActionErrorEvent.ERROR, {message:errorMessage});
            this.dispatch(errorEvent);
            let error = {name: 'error', message: errorMessage};
            this.errorModel.errors.addItem(error);
            this.errorModel.appError = true;
        } finally {
            this.opModel.asyncOperationCount -= 1;
            if (this.opModel.asyncOperationCount == 0) {
                this.opModel.asyncOperationComplete = true;
            }
            this.destroy();
        }
    }

    public fault(fault:Lavender.IFault):void{
        //fault is an instance of Lavender.HttpFault
        this.opModel.asyncOperationCount -= 1;
        if (this.opModel.asyncOperationCount == 0) {
            this.opModel.asyncOperationComplete = true;
        }
        let errorMessage = this.getFaultString() + fault.message;
        let errorEvent = new ActionErrorEvent(ActionErrorEvent.ERROR, {message:errorMessage});
        this.dispatch(errorEvent);
        let error = {name: fault.status, message: errorMessage};
        this.errorModel.errors.addItem(error);
        this.errorModel.appError = true;
        this.destroy();
    }

    //Override this method in subclasses
    public onProgress(progress:number):void{

    }

    //Override this method in subclasses
    protected getFaultString():string{
        return null;
    }

    //Override this method in subclasses
    protected getErrorMessage():string{
        return null;
    }

    protected executionError():void{
        // These properties weren't injected or supplied in the constructor or manually.
        // They are needed so we throw an error.
        let msg = this.getExecErrorString();
        if (this.service === null || this.service === undefined) {
            msg += " service";
        }
        if (this.opModel === null || this.opModel) {
            msg += ", opModel";
        }
        if (this.parser === null || this.parser === undefined) {
            msg += ", parser";
        }

        msg += ".";

        throw new Error(msg);
    }

    //Override this method in subclasses
    protected getExecErrorString():string{
        return 'Lavender.AbstractServiceAction.prototype.executionError: the following are required: ';
    }

    public destroy():void{
        if( this.canListen(ActionErrorEvent.ERROR, this, 'onError') ){
            this.removeEventListener(ActionErrorEvent.ERROR, this, 'onError');
        }
        if( this.canListen(ActionSuccessEvent.SUCCESS, this, 'onSuccess') ){
            this.removeEventListener(ActionSuccessEvent.SUCCESS, this, 'onSuccess');
        }
        this.context = null;
        this.opModel = null;
        this.service = null;
        this.parser = null;
        this.errorModel = null;
    }
}