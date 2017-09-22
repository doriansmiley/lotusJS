/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractSynchronousActionTest ', function () {

    it('check AbstractSynchronousAction function and values', function () {
        var abstractAction = new Lavender.AbstractSynchronousAction( new Lavender.ErrorModel() );
        abstractAction.execute();
    });
});
