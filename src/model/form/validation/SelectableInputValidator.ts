import {AbstractValidator} from "./AbstractValidator";
import * as Lavender from 'lavenderjs/lib';
import {InputModel} from "../InputModel";
import {ValidationError} from "./ValidationError";
import {InputCollectionModel} from "../InputCollectionModel";
/**
 * Created by dsmiley on 10/10/17.
 */
export class SelectableInputValidator extends AbstractValidator {

    constructor() {
        super();
    }

    protected setUpBindings(): void{
        this.binder.bind(this, 'isValid', this.source, 'isValid');
        (this.source as InputCollectionModel).isValid = this.isValid;
        for(let i=0;i<this.source.collection.length;i++) {
            //ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'selected', this, 'validateOnChange');
        }
    }

    //iterate over model objects and ensure all required objects have some text
    protected getValidationErrors(): Lavender.ArrayList {
        const returnList = new Lavender.ArrayList();
        //if the model requires a selection ensure there is one
        if(this.source.selectionRequired) {
            let itemSelected = false;
            let groupName: string;
            for(let i=0;i<this.source.collection.length;i++) {
                groupName = this.source.collection.getItemAt(i).name;//group name is the same for all items
                if(this.source.collection.getItemAt(i).selected) {
                    itemSelected = true;
                    break
                }
            }
            //at least one item must be selected
            if(!itemSelected) {
                returnList.addItem(new ValidationError('selected', 'form.selectionRequired', groupName + ' must have a selection.'))
            }
        }
        return returnList;//returns ArrayList of SpiSdk.ValidationError instances
    }
    
}