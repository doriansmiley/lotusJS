/**
 * Created by dsmiley on 9/3/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ValidationError ', function () {

    it('check ValidationError function and values', function () {
        var error = new Lotus.ValidationError('test', '1234', 'test error');
        expect( error.property ).toBe('test');
        expect( error.errorCode ).toBe('1234');
        expect( error.errorMessage ).toBe('test error');
    });
});