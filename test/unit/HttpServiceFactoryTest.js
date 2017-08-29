'use strict';

/* jasmine specs for controllers go here */
describe('HttpServiceFactoryTest', function () {

    describe('Test access to HttpServiceFactory singletom', function () {

        it('check HttpServiceFactory and default values', function () {
            var service = Lotus.HttpServiceFactory.getInstance();
            expect(service).toBeDefined();
            expect(service.getHttpService).toBeDefined();
            expect(service.getHttpService().constructor.name == Lavender.XhrHttpService.name).toBe(true);
            expect(service.getHttpService('XhrHttpService').constructor.name == Lavender.XhrHttpService.name).toBe(true);
        });

    });
});
