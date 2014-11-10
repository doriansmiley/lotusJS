'use strict';

/* jasmine specs for controllers go here */
describe('AbstractServiceFactoryTest', function () {

    describe('Test access to singletom', function () {

        it('check model and default values', function () {
            var service = Lavender.ServiceFactory.getInstance();
            expect(service).toBeDefined();
            expect(service.getService).toBeDefined();
            expect(service.getService( new Lavender.Config() ) instanceof Lavender.SampleService).toBe(true);
        });

    });
});
