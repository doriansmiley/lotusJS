/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ContextTest', function () {

    it('check Context function and values', function () {
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        expect(context.commandMap instanceof Lotus.CommandMap).toBe(true);
        expect(context.componentMap instanceof Lotus.ComponentMap).toBe(true);
        expect(context.eventDispatcher instanceof Lavender.AbstractEventDispatcher).toBe(true);
    });
});
