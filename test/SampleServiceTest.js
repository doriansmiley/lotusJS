/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ServiceV1Test ', function () {

    it('check SampleService function and values', function () {
        var config = new Lavender.Config();
        config.context = 'hjyearbook';
        config.user = 'hjyearbook';
        config.password = 'hjyearbook!';
        config.baseUrl = '/local/demo/refapp/php/Proxy.php?url=http://devsql1.silpub.com/';
        //config.globalFontMapPath = '/local/demo/refapp/php/Proxy.php?url=http://devsql1.silpub.com/designers/hjyearbook/assets/fonts/GlobalFontMap_hjy.xml';
        config.globalFontMapPath = '/local/demo/refapp/php/GlobalFontMap_hjy.xml';
        var request = new Lotus.SampleService(config);
        var success = false;
        var successObject;
        var responder1 = {
            success:function(sucessObj){
                console.log('ServiceV1Test responder1 sucess called');
                success = true;
                successObject = sucessObj;
                },
            fault:function(faultObj){
                console.log('ServiceV1Test responder1 fault called');
            }
        };
        //isPostRequest, responder, urlKey, paramObj, urlParams, format, contentType, token, localRequest
        var params =
        {
            'context'	: config.context,
            'user'		: config.user,
            'password'	: config.password
        };
        //createSDSession = function(context, userID, password, url, responder, format, contentType, localRequest, cache)
        var requestId = request.createSDSession(config.context, config.user, config.password, 'createSDSession', responder1, null, null, true, true);
        //var requestId = request.sendXMLRequest(true, responder1, 'createSDSession', params, null, null, null, true, true );
        //expect( story.id ).toBe('1234');
        expect( requestId ).toBeDefined();

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('sDSession').attr('sDSessionID') ).toBeDefined();
            config.sessionId = $(successObject.resultObj).find('sDSession').attr('sDSessionID');
            success = false;
        });

    });
});
