/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RecordSetEventTest ', function () {

    it('check RecordSetEvent function and values', function () {
        var recordSetEvent = new Lavender.RecordSetEvent(Lavender.RecordSetEvent.TOTALRECORDS_CHANGE);
        expect( recordSetEvent.type ).toBe(Lavender.RecordSetEvent.TOTALRECORDS_CHANGE);
        expect( recordSetEvent.payload ).toBe(undefined);
    });
});
