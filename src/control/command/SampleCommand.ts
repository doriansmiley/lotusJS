import {AbstractCommand} from "./AbstractCommand";
import {IContext} from "../../context/IContext";
import * as Lavender from 'lavenderjs/lib';
import {ISampleService} from "../service/ISampleService";

/**
 * Created by dsmiley on 7/28/17.
 */
export class SampleCommand extends AbstractCommand{

    protected model:Object;//you should implement a concrete model implementation in your projects

    constructor(context:IContext){
        super(context);
    }

    protected executeServiceMethod():string{
        //since services will always be injected by the IOC container always user the interface type
        return (this.service as ISampleService).testRequestUsingIncludedAPI('localRequest', this);
    }

    protected parseResponse(result:Lavender.IResult):Object{
        //since serilization objects will always be injected by the IOC container always user the interface type
        return this.parser.parse(result);//use this.parser.parse to deserialize results. You'll of course need to implement the parser, our tests just use a generic function that returns the result
        //most commands would also receive a model injection and the command would update it here
    }

    protected getFaultString():string{
        return 'Lotus.SampleCommand a service request error occured';
    }

    protected getErrorMessage():string{
        return 'Lotus.SampleCommand an execution error occured ';
    }

    protected getExecErrorString():string{
        return 'Lotus.SampleCommand the following are required: ';
    }
}