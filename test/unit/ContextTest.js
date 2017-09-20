/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ContextTest', function () {

    it('check Context function and values', function () {
        var context = new Lotus.Context({});
        expect(context.componentMap instanceof Lotus.ComponentMap).toBe(true);

        //TODO: test sandboxed contexts where the same injection injects different class instances
    });
});
