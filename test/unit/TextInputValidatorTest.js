/**
 * Created by dsmiley on 9/3/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('TextInputValidator ', function () {

    it('check TextInputValidator function and values', function () {
        var validator = new Lotus.TextInputValidator();
        //label?:string, value?:string, name?:string, selected?:boolean, required?:boolean
        var items = new Lotus.InputCollectionModel(Lotus.InputCollectionModel.TYPE_INPUT, new Lavender.ArrayList([ new Lotus.InputModel('some label', '', 'some name', false, true) ]));
        validator.source = items;
        expect( validator.isValid ).toBe(false);
        expect( validator.getValidationErrors() instanceof Lavender.ArrayList ).toBe(true);
        expect( validator.getValidationErrors().getItemAt(0).property ).toBe('required');
        expect( validator.getValidationErrors().getItemAt(0).errorCode ).toBe('form.required');
        expect( validator.getValidationErrors().getItemAt(0).errorMessage ).toBe('some label is required');
        //bindings on value will automatically trigger validate
        validator.source.collection.getItemAt(0).value = 'some value';
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
