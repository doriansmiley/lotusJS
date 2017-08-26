/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractErrorModelTest ', function () {

    it('check ErrorModel function and values', function () {
        var errorModel = new Lavender.ErrorModel();
        var error1 = new Error('Error 1');
        var error2 = new Error('Error 2');
        var error3 = new Error('Error 3');
        errorModel.addError( error1 );
        errorModel.addError( error2 );
        errorModel.addError( error3 );

        expect( errorModel.errors.length ).toBe(3);
        //comment in to verify output
        //console.log( errorModel.getTitle() );
        //console.log( errorModel.getMessage() );
    });
});
