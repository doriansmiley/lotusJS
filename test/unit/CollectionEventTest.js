/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('CollectionEventTest ', function () {

    it('check CollectionEvent function and values', function () {
        var collectionEvent = new Lavender.CollectionEvent(Lavender.CollectionEvent.COLLECTION_CHANGE);
        expect( collectionEvent.type ).toBe(Lavender.CollectionEvent.COLLECTION_CHANGE);
        expect( collectionEvent.payload ).toBe(undefined);
    });
});
