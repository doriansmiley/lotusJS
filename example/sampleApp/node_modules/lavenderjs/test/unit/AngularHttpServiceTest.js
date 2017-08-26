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
    var doneFunction;
    var requestId
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

    // Load the myApp module, which contains the directive
    module('myApp')

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    });

    it('check AngularHttpService', function ( done ) {
        doneFunction = done;
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
        expect( requestId ).toBeDefined();
    });

    it('check AngularHttpService', function ( done ) {
        doneFunction = done;
        expect( requestId ).toBe(successObject.requestId);
        doneFunction();
    });

});