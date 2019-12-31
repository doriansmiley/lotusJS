import {TextInputValidator} from "./TextInputValidator";
import * as Lavender from 'lavenderjs/lib';
import {InputModel} from "../InputModel";
import {ValidationError} from "./ValidationError";
/**
 * Created by dsmiley on 10/10/17.
 */
export class PhoneNumberValidator extends TextInputValidator {

    constructor() {
        super();
    }

    //iterate over model objects and ensure all required objects have some text
    protected getValidationErrors(): Lavender.ArrayList {
        const returnList = new Lavender.ArrayList();
        for(let i=0;i<this.source.collection.length;i++) {
            const item: InputModel = this.source.collection.getItemAt(i);
            //new String('(555) 555-5555').replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/)
            if(item.required && (!item.nonFormattedValue || item.nonFormattedValue.length <=0 || !item.nonFormattedValue.replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/) ) ) {
                returnList.addItem(new ValidationError('required', 'form.invalidPhone', item.label + ' is not a valid phone number'))
            }
        }
        return returnList;//returns ArrayList of SpiSdk.ValidationError instances
    }
    
}