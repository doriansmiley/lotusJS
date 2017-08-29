'use strict';

/* jasmine specs for controllers go here */
describe('SerializeFactoryTest', function () {

    describe('Test access to SerializeFactory', function () {

        it('check functions', function () {
            var service = Lotus.SerializeFactory.getInstance();
            expect(service).toBeDefined();
            expect(service.getServiceResultParser).toBeDefined();
            expect(service.getServiceExporter).toBeDefined();

        });

    });
});
