import {AbstractCommand} from "./AbstractCommand";
import {IContext} from "../../context/IContext";
/**
 * Created by dsmiley on 7/28/17.
 */
export class SampleCommand extends AbstractCommand{

    protected model:Object;//you should implement a concretre

    constructor(context:IContext){
        super(context);
        this.model = context.injector.inject('model');
    }
}