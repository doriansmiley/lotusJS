'use strict';

/* jasmine specs for controllers go here */
describe('EventDispatcherFactoryTest', function () {

    describe('Test access to EventDispatcherFactory singletom', function () {

        it('check EventDispatcherFactory and default values', function () {
            var service = Lotus.EventDispatcherFactory.getInstance();
            expect(service).toBeDefined();
            expect(service.getEventDispatcher).toBeDefined();
            expect(service.getEventDispatcher( new Lavender.Config() ) instanceof Lavender.AbstractEventDispatcher).toBe(true);
            var config = new Lavender.Config();
            config.eventDispatcherCode = 'angular';
            expect(service.getEventDispatcher( config ) instanceof Lavender.AngularEventDispatcher).toBe(true);
        });

    });
});
