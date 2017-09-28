/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ItemViewEventTest ', function () {

    it('check ComponentEvent function and values', function () {
        var layoutEvent = new Lotus.ComponentEvent(Lotus.ComponentEvent.READY);
        expect( layoutEvent.type ).toBe(Lotus.ComponentEvent.READY);
        expect( layoutEvent.clone(layoutEvent.type, layoutEvent.payload).type ).toBe(Lotus.ComponentEvent.READY);
    });
});
