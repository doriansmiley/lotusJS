/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RecordSetModelTest ', function () {

    it('check RecordSetModel function and values', function () {
        var recordSetModel = new Lavender.RecordSetModel();
        expect( recordSetModel.recordSets ).toBeDefined();
    });
});
