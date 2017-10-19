/**
 * Created by dsmiley on 9/3/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('PhoneNumberValidator Test', function () {

    it('check PhoneNumberValidator function and values', function () {
        var validator = new Lotus.PhoneNumberValidator();
        //label?:string, value?:string, name?:string, selected?:boolean, required?:boolean
        var items = new Lotus.InputCollectionModel(Lotus.InputCollectionModel.TYPE_INPUT, new Lavender.ArrayList([ new Lotus.InputModel('some label', '', 'some name', false, true) ]));
        validator.source = items;
        expect( validator.isValid ).toBe(false);
        expect( validator.getValidationErrors() instanceof Lavender.ArrayList ).toBe(true);
        expect( validator.getValidationErrors().getItemAt(0).property ).toBe('required');
        expect( validator.getValidationErrors().getItemAt(0).errorCode ).toBe('form.invalidPhone');
        expect( validator.getValidationErrors().getItemAt(0).errorMessage ).toBe('some label is not a valid phone number');
        //bindings on value will automatically trigger validate
        validator.source.collection.getItemAt(0).value = 'sdf$934579';
        expect( validator.isValid ).toBe(false);
        expect( validator.getValidationErrors() instanceof Lavender.ArrayList ).toBe(true);
        expect( validator.getValidationErrors().getItemAt(0).property ).toBe('required');
        expect( validator.getValidationErrors().getItemAt(0).errorCode ).toBe('form.invalidPhone');
        expect( validator.getValidationErrors().getItemAt(0).errorMessage ).toBe('some label is not a valid phone number');
        validator.source.collection.getItemAt(0).value = '555 555 5555';
        expect( validator.errors.length ).toBe(0);
        expect( validator.isValid ).toBe(true);
        validator.source.collection.getItemAt(0).value = '555-555-5555';
        expect( validator.errors.length ).toBe(0);
        expect( validator.isValid ).toBe(true);
        //this must occure before we reset the value
        validator.source.collection.getItemAt(0).required = false;
        //bindings on value will automatically trigger validate
        validator.source.collection.getItemAt(0).value = '';
        expect( validator.errors.length ).toBe(0);
        expect( validator.isValid ).toBe(true);
    });
});
