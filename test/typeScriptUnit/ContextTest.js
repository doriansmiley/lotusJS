/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ContextTest', function () {

    it('check Context function and values', function () {
        var context = new Lotus.Context({});
        expect(context.commandMap instanceof Lotus.CommandMap).toBe(true);
        expect(context.componentMap instanceof Lotus.ComponentMap).toBe(true);
        expect(context.eventDispatcher.constructor.name).toBe(Lotus.EventDispatcher.name);
        expect(context.injector instanceof Lotus.Injector).toBe(true);
        expect(context.mediatorMap instanceof Lotus.MediatorMap).toBe(true);
    });
});
