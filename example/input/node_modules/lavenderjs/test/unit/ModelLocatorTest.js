'use strict';

/* jasmine specs for controllers go here */
describe('SPISDK Lists', function () {

    describe('Lavender.ModelLocator', function () {

        it('check model and default values', function () {
            var model = Lavender.ModelLocator.getInstance();
            expect(model).toBeDefined();
            expect(model.config).toBeDefined();
            expect(model.errorModel).toBeDefined();
            expect(model.asyncOperationModel).toBeDefined();
            expect(model.recordsetModel).toBeDefined();
        });

    });
});
