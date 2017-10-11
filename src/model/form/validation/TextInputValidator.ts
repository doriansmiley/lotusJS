import {AbstractValidator} from "./AbstractValidator";
import * as Lavender from 'lavenderjs/lib';
import {InputModel} from "../InputModel";
import {ValidationError} from "./ValidationError";
/**
 * Created by dsmiley on 10/10/17.
 */
export class TextInputValidator extends AbstractValidator{

    constructor(){
        super();
    }

    protected setUpBindings():void{
        for(var i=0;i<this.source.collection.length;i++){
            //ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'value', this, 'validateOnChange');
        }
    }

    //iterate over model objects and ensure all required objects have some text
    protected getValidationErrors():Lavender.ArrayList{
        var returnList = new Lavender.ArrayList();
        for(var i=0;i<this.source.collection.length;i++){
            var item:InputModel = this.source.collection.getItemAt(i);
            if(item.required && (!item.nonFormattedValue || item.nonFormattedValue.length <=0) ){
                returnList.addItem(new ValidationError('required', 'form.required', 'Field is required'))
            }
        }
        return returnList;//returns ArrayList of SpiSdk.ValidationError instances
    }
    
}