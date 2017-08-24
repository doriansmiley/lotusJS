/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('SampleService Test ', function () {

    it('check SampleService echoJSON route', function (done) {
        var config = new Lotus.Config();
        config.baseUrl = 'http://localhost';
        var request = new Lotus.SampleService(config);
        var success = false;
        var successObject;
        var responder1 = {
            success:function(sucessObj){
                console.log('SampleService Test responder1 sucess called: ' + JSON.stringify(sucessObj));
                success = true;
                successObject = sucessObj;
                done();
                },
            fault:function(faultObj){
                console.log('SampleService Test responder1 fault called');
                done().error(new Error(faultObj.message))
            }
        };
        //jsonKey:string, key:string, responder:IResponder, paramObj:Object={}, format:string='json', contentType:string='application/json', cache:boolean=false
        var requestId = request.echoJSON('1234', 'echoJSON', responder1, {inputJSON:{test:'hello world'}}, 'text');
        //var requestId = request.sendXMLRequest(true, responder1, 'createSDSession', params, null, null, null, true, true );
        //expect( story.id ).toBe('1234');
        expect( requestId ).toBeDefined();


    });

    it('check SampleService testRequestUsingIncludedAPI route', function (done) {
        var config = new Lotus.Config();
        config.baseUrl = 'http://localhost'
        var request = new Lotus.SampleService(config);
        var success = false;
        var successObject;
        var responder = {
            success:function(sucessObj){
                console.log('SampleService Test responder1 sucess called: ' + JSON.stringify(sucessObj));
                success = true;
                successObject = sucessObj;
                done();
                },
            fault:function(faultObj){
                console.log('SampleService Test responder1 fault called');
                done().error(new Error(faultObj.message))
            }
        };
        var requestId = request.testRequestUsingIncludedAPI('localRequest', responder);
        //var requestId = request.sendXMLRequest(true, responder1, 'createSDSession', params, null, null, null, true, true );
        //expect( story.id ).toBe('1234');
        expect( requestId ).toBeDefined();
    });
});
