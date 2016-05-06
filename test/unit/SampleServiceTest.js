/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ServiceV1Test ', function () {

    it('check SampleService function and values', function (done) {
        var config = new Lavender.Config();
        config.context = 'hjyearbook';
        config.user = 'hjyearbook';
        config.password = 'hjyearbook!';
        config.baseUrl = 'http://devsql1.silpub.com/';
        //config.globalFontMapPath = '/local/demo/refapp/php/Proxy.php?url=http://devsql1.silpub.com/designers/hjyearbook/assets/fonts/GlobalFontMap_hjy.xml';
        config.globalFontMapPath = '/base/unit/assets/GlobalFontMap_hjy.xml';
        var request = new Lotus.SampleService(config);
        var success = false;
        var successObject;
        var responder1 = {
            success:function(sucessObj){
                console.log('ServiceV1Test responder1 sucess called');
                success = true;
                successObject = sucessObj;
                done();
                },
            fault:function(faultObj){
                console.log('ServiceV1Test responder1 fault called');
                done().error(new Error(faultObj.message))
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


    });
});
