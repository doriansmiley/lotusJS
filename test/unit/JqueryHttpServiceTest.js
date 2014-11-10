/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('JqueryHttpServiceTest ', function () {

    it('check JqueryHttpService function and values', function () {
        var request = new Lavender.JqueryHttpService();
        var responder1 = {
            success:function(sucessObj){
                console.log('JqueryHttpServiceTest.responder1 sucess called');
                success = true;
                successObject = sucessObj;
                },
            fault:function(faultObj){
                console.log('JqueryHttpServiceTest.responder1 fault called');
            }
        };
        var success = false;
        var successObject;
        var responder2 = { success:function(sucessObj){console.log('JqueryHttpServiceTest.responder2 sucess called')}, fault:function(faultObj){console.log('JqueryHttpServiceTest.responder2 fault called')} };
        var responder3 = { success:function(sucessObj){console.log('JqueryHttpServiceTest.responder3 sucess called')}, fault:function(faultObj){console.log('JqueryHttpServiceTest.responder3 fault called')} };
        request.addResponder(responder1);
        request.addResponder(responder2);
        request.addResponder(responder3);
        var requestId = request.send(
            'POST',
            '/local/demo/refapp/php/Proxy.php?url=http://devsql1.silpub.com/sdsession/action/create',
            '<request><password>hjyearbook!</password><context>hjyearbook</context><user>hjyearbook</user></request>',
            'text/xml',
            'xml',
            true);
        //expect( story.id ).toBe('1234');
        expect( requestId ).toBeDefined();

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
        });
    });
});
