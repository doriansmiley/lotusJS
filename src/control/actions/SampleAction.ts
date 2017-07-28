import {AbstractServiceAction} from '../../../node_modules/lavenderjs/lib';
import {IService} from '../../../node_modules/lavenderjs/lib';
import {AsyncOperationModel} from '../../../node_modules/lavenderjs/lib';
import {IParser} from '../../../node_modules/lavenderjs/lib';
import {IResult} from '../../../node_modules/lavenderjs/lib';
import {ErrorModel} from '../../../node_modules/lavenderjs/lib';
import {ISampleService} from "../../control/service/ISampleService";
/**
 * Created by dsmiley on 7/28/17.
 */
export class SampleAction extends AbstractServiceAction{

    constructor(service:IService, opModel:AsyncOperationModel, parser:IParser, errorModel:ErrorModel){
        super(service,opModel,parser,errorModel);
    }

    protected executeServiceMethod():string{
        //since services will always be injected by the IOC container always user the interface type
        return (this.service as ISampleService).testRequestUsingIncludedAPI('localRequest', this);
    }

    protected parseResponse(result:IResult):Object{
        //since serilization objects will always be injected by the IOC container always user the interface type
        return this.parser.parse(result);//use this.parser.parse to deserialize results. You'll of course need to implement the parser, our tests just use a generic function that returns the result
    }

    protected getFaultString():string{
        return 'Lotus.SampleAction a service request error occured';
    }

    protected getErrorMessage():string{
        return 'Lotus.SampleAction an execution error occured ';
    }

    protected getExecErrorString():string{
        return 'Lotus.SampleAction the following are required: ';
    }
}