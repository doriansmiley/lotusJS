'use strict';

/* jasmine specs for controllers go here */
describe('HttpServiceFactoryTest', function () {

    describe('Test access to HttpServiceFactory singletom', function () {

        it('check HttpServiceFactory and default values', function () {
            var service = Lavender.HttpServiceFactory.getInstance();
            expect(service).toBeDefined();
            expect(service.getHttpService).toBeDefined();
            expect(service.getHttpService( new Lavender.Config() ) instanceof Lavender.JqueryHttpService).toBe(true);
            var config = new Lavender.Config();
            config.httpServiceCode = 'angular';
            expect(service.getHttpService( config ) instanceof Lavender.AngularHttpService).toBe(true);
        });

    });
});
