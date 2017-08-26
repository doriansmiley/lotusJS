/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ActionErrorEventTest ', function () {

    it('check ActionErrorEvent function and values', function () {
        var actionErrorEvent = new Lavender.ActionErrorEvent(Lavender.ActionErrorEvent.ERROR, {message:'test error message', subject:'test subject', details:'test details', code:'test code'});
        expect( actionErrorEvent.type ).toBe(Lavender.ActionErrorEvent.ERROR);
        expect( actionErrorEvent.payload.message ).toBe('test error message');
        expect( actionErrorEvent.payload.subject ).toBe('test subject');
        expect( actionErrorEvent.payload.details ).toBe('test details');
        expect( actionErrorEvent.payload.code ).toBe('test code');
    });
});
