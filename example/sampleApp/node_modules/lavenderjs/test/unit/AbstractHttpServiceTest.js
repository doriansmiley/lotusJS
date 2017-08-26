/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('HttpFaultTest ', function () {

    it('check HttpFault function and values', function () {
        var service = new Lavender.AbstractHttpService();
        var responder1 = { success:function(){}, fault:function(){} };
        var responder2 = { success:function(){}, fault:function(){} };
        var responder3 = { success:function(){}, fault:function(){} };
        service.addResponder(responder1);
        service.addResponder(responder2);
        service.addResponder(responder3);
        var requestId = service.send({});
        expect( requestId ).toBeDefined();
        expect( requestId ).toBe(service.requestId);
        expect( service.responders.length() ).toBe(3);
        service.destroy();
        expect( service.responders ).toBe(null);
    });
});
