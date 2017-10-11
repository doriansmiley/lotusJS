/**
 * Created by dsmiley on 9/3/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('SelectableInputValidator ', function () {

    it('check SelectableInputValidator function and values', function () {
        var validator = new Lotus.SelectableInputValidator();
        //label?:string, value?:string, name?:string, selected?:boolean, required?:boolean
        var items = new Lotus.InputCollectionModel(
            Lotus.InputCollectionModel.TYPE_LIST,
            new Lavender.ArrayList([
                new Lotus.InputModel('some label1', 'some value1', 'some name1'),
                new Lotus.InputModel('some label2', 'some value2', 'some name2'),
                new Lotus.InputModel('some label3', 'some value3', 'some name3'),
                new Lotus.InputModel('some label4', 'some value4', 'some name4'),
            ]),
            true);
        validator.source = items;
        expect( validator.isValid ).toBe(false);
        expect( validator.getValidationErrors() instanceof Lavender.ArrayList ).toBe(true);
        expect( validator.getValidationErrors().length ).toBe(1);
        expect( validator.getValidationErrors().getItemAt(0).property ).toBe('selected');
        expect( validator.getValidationErrors().getItemAt(0).errorCode ).toBe('form.selectionRequired');
        expect( validator.getValidationErrors().getItemAt(0).errorMessage ).toBe('You must select one of the available options.');
        //bindings on selected will automatically trigger validate
        validator.source.collection.getItemAt(0).selected = true;
        expect( validator.errors.length ).toBe(0);
        expect( validator.isValid ).toBe(true);
        //this must occure before we reset the selected
        validator.source.selectionRequired = false;
        validator.source.collection.getItemAt(0).selected = false;
        //bindings on value will automatically trigger validate
        expect( validator.errors.length ).toBe(0);
        expect( validator.isValid ).toBe(true);
    });
});
