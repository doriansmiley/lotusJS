import {AbstractValidator} from './AbstractValidator';
import * as Lavender from 'lavenderjs/lib';
import {InputModel} from '../InputModel';
import {ValidationError} from './ValidationError';
import {InputCollectionModel} from '../InputCollectionModel';
/**
 * Created by dsmiley on 10/10/17.
 */
export class TextInputValidator extends AbstractValidator {

    constructor() {
        super();
    }

    protected setUpBindings(): void{
        this.binder.bind(this, 'isValid', this.source, 'isValid');
        (this.source as InputCollectionModel).isValid = this.isValid;
        for (let i=0;i<this.source.collection.length;i++) {
            // ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'value', this, 'validateOnChange');
        }
    }

    // iterate over model objects and ensure all required objects have some text
    protected getValidationErrors(): Lavender.ArrayList {
        const returnList = new Lavender.ArrayList();
        for (let i=0;i<this.source.collection.length;i++) {
            const item: InputModel = this.source.collection.getItemAt(i);
            if (item.required && (!item.nonFormattedValue || item.nonFormattedValue.length <=0)) {
                returnList.addItem(new ValidationError('required', 'form.required', `${item.label} is required`))
            }
        }
        return returnList;// returns ArrayList of SpiSdk.ValidationError instances
    }
    
}
