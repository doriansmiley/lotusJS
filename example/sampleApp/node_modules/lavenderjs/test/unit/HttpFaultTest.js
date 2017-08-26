/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('HttpFaultTest ', function () {

    it('check HttpFault function and values', function () {
        var fault = new Lavender.HttpFault( {}, '500', 'Internal Server Error', 12345);
        expect( fault.status ).toBe('500');
        expect( fault.errorObj ).toBeDefined();
        expect( fault.message ).toBe('Internal Server Error');
        expect( fault.requestId ).toBe(12345);
    });
});
