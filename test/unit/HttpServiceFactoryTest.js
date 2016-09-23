'use strict';

/* jasmine specs for controllers go here */
describe('HttpServiceFactoryTest', function () {

    describe('Test access to HttpServiceFactory singletom', function () {

        it('check HttpServiceFactory and default values', function () {
            var service = Lotus.HttpServiceFactory.getInstance();
            expect(service).toBeDefined();
            expect(service.getHttpService).toBeDefined();
            expect(service.getHttpService( new Lavender.Config() ) instanceof Lavender.XhrHttpService).toBe(true);
            var config = new Lavender.Config();
            config.httpServiceCode = 'jquery';
            expect(service.getHttpService( config ) instanceof Lavender.JqueryHttpService).toBe(true);
            config.httpServiceCode = undefined;
            expect(service.getHttpService( config ) instanceof Lavender.XhrHttpService).toBe(true);
        });

    });
});
