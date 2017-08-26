/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('HttpSuccessTest ', function () {

    it('check HttpSuccess function and values', function () {
        var result = new Lavender.HttpSuccess( {}, '200', 1234);
        expect( result.status ).toBe('200');
        expect( result.resultObj ).toBeDefined();
        expect( result.requestId ).toBe(1234);
    });
});
