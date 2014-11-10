/**
 * Created by dsmiley on 1/27/14.
 */
'use strict';
var app = angular.module('myApp', []);
describe('AngularHttpServiceTest test', function () {
    var $compile;
    var $rootScope;
    var success = false;
    var successObject;
    // Load the myApp module, which contains the directive
    beforeEach(module('myApp'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));
    it('check AngularHttpService', function () {
        var request = new Lavender.AngularHttpService();
        var responder1 = {
            success:function(sucessObj){
                console.log('AngularHttpServiceTest.responder1 success called');
                success = true;
                successObject = sucessObj;
            },
            fault:function(faultObj){
                console.log('AngularHttpServiceTest.responder1 fault called');
            }
        };
        var responder2 = { success:function(sucessObj){console.log('AngularHttpServiceTest.responder2 sucess called')}, fault:function(faultObj){console.log('AngularHttpServiceTest.responder2 fault called')} };
        var responder3 = { success:function(sucessObj){console.log('AngularHttpServiceTest.responder3 sucess called')}, fault:function(faultObj){console.log('AngularHttpServiceTest.responder3 fault called')} };
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