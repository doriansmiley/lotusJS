'use strict';

/* jasmine specs for controllers go here */
describe('AbstractServiceFactoryTest', function () {

    describe('Test access to singletom', function () {

        it('check model and default values', function () {
            var service = Lotus.ServiceFactory.getInstance();
            expect(service).toBeDefined();
            expect(service.getService).toBeDefined();
            expect(service.getService( new Lavender.Config() ) instanceof Lotus.SampleService).toBe(true);
        });

    });
});
