/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('InputEventTest ', function () {

    it('check InputEvent function and values', function () {
        var layoutEvent = new Lotus.InputEvent(Lotus.InputEvent.CHANGE);
        expect( layoutEvent.type ).toBe(Lotus.InputEvent.CHANGE);
        expect( layoutEvent.clone(layoutEvent.type, layoutEvent.payload).type ).toBe(Lotus.InputEvent.CHANGE);
    });
});
