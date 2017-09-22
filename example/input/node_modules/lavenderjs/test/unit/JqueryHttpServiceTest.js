/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('JqueryHttpServiceTest ', function () {
    var request = new Lavender.JqueryHttpService();
    var doneFunction;
    var responder2 = { success: function (sucessObj) {
        console.log('AngularHttpServiceTest.responder2 sucess called');
        doneFunction();
    }, fault: function (faultObj) {
        console.log('AngularHttpServiceTest.responder2 fault called');
        doneFunction();
    } };
    var responder3 = { success: function (sucessObj) {
        console.log('AngularHttpServiceTest.responder3 sucess called');
        doneFunction();
    }, fault: function (faultObj) {
        console.log('AngularHttpServiceTest.responder3 fault called');
        doneFunction();
    } };
    var responder1 = {
        success:function(sucessObj){
            console.log('JqueryHttpServiceTest.responder1 sucess called');
            success = true;
            successObject = sucessObj;
            doneFunction();
        },
        fault:function(faultObj){
            console.log('JqueryHttpServiceTest.responder1 fault called');
            doneFunction();
        }
    };
    var success = false;
    var successObject;
    var requestId;

    it('check JqueryHttpService function and values', function ( done ) {
        doneFunction = done;
        request.addResponder(responder1);
        request.addResponder(responder2);
        request.addResponder(responder3);
        requestId = request.send(
            'POST',
            'http://devsql1.silpub.com/sdsession/action/create',
            '<request><password>hjyearbook!</password><context>hjyearbook</context><user>hjyearbook</user></request>',
            'text/xml',
            'xml',
            true);
        //expect( story.id ).toBe('1234');
        expect( requestId ).toBeDefined();
    });

    it('check JqueryHttpService request id', function ( done ) {
        doneFunction = done;
        expect( requestId ).toBe(successObject.requestId);
        doneFunction();
    });
});
