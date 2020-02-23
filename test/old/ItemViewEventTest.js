/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ItemViewEventTest ', function () {

    it('check ItemViewEvent function and values', function () {
        var item = {};
        var layoutEvent = new Lotus.ItemViewEvent(Lotus.ItemViewEvent.ITEM_SELECTED, {item:item});
        expect( layoutEvent.type ).toBe(Lotus.ItemViewEvent.ITEM_SELECTED);
        expect( layoutEvent.payload.item ).toBe(item);
    });
});
