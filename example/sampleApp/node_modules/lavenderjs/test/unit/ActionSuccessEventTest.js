/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ActionSuccessEventTest ', function () {

    it('check ActionSuccessEvent function and values', function () {
        var actionErrorEvent = new Lavender.ActionSuccessEvent(Lavender.ActionSuccessEvent.SUCCESS, {message:'test success message', subject:'test subject', details:'test details', code:'test code'});
        expect( actionErrorEvent.type ).toBe(Lavender.ActionSuccessEvent.SUCCESS);
        expect( actionErrorEvent.payload.message ).toBe('test success message');
        expect( actionErrorEvent.payload.subject ).toBe('test subject');
        expect( actionErrorEvent.payload.details ).toBe('test details');
        expect( actionErrorEvent.payload.code ).toBe('test code');
    });
});
