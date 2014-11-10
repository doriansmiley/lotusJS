/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AsyncOperationModelTest ', function () {

    it('check AsyncOperationModel function and values', function () {
        var asyncModel = new Lavender.AsyncOperationModel();
        asyncModel.asyncOperationCount += 1;
        expect( asyncModel.asyncOperationCount ).toBe(1);
        expect( asyncModel.asyncOperationComplete ).toBe(false);
        asyncModel.asyncOperationCount -= 1;
        expect( asyncModel.asyncOperationComplete ).toBe(true);
    });
});
