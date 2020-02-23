/**
 * Created by dsmiley on 9/3/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractValidator ', function () {

    it('check AbstractValidator function and values', function () {
        var validator = new Lotus.AbstractValidator();
        var source = {};
        validator.source = source;
        expect( validator.isValid ).toBe(true);
        expect( validator.getValidationErrors() instanceof Lavender.ArrayList ).toBe(true);
        validator.errors = new Lavender.ArrayList();
        validator.errors.addAll([1,2,3]);
        validator.validate();
        expect( validator.errors.length ).toBe(0);//Lotus.AbstractValidator.prototype.getValidationErrors returns a new array which resets the value of validator.errors. This is by design so calls to the setter do not not effect the state of the validator
        expect( validator.isValid ).toBe(true);
    });
});