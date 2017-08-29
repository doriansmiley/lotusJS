'use strict';

/* jasmine specs for controllers go here */
describe('EventDispatcherFactoryTest', function () {

    describe('Test access to EventDispatcherFactory singletom', function () {

        it('check EventDispatcherFactory and default values', function () {
            var service = Lotus.EventDispatcherFactory.getInstance();
            expect(service).toBeDefined();
            expect(service.getEventDispatcher).toBeDefined();
            expect(service.getEventDispatcher().constructor.name).toBe(Lavender.EventDispatcher.name);
        });

    });
});
