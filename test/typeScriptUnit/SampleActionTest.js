/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractServiceAction Test ', function () {

    it('check AbstractServiceAction function and values', function (done) {
        var success = false;
        var config = new Lavender.Config();
        config.baseUrl = 'http://localhost';
        var responder1 = {
            success:function(event){
                console.log('AbstractServiceAction Test responder1 sucess called: ');
                success = true;
                done();
            },
            fault:function(event){
                console.log('AbstractServiceAction Test responder1 fault called');
                done().error(new Error(event.payload.message));
            }
        };
        
        var opModel = new Lavender.AsyncOperationModel();
        var errorModel = new Lavender.ErrorModel();
        var abstractAction = new Lotus.SampleAction(new Lotus.SampleService(config), opModel, {parse:function(result){}}, errorModel);
        expect(abstractAction.service).toBeDefined();
        expect(abstractAction.opModel).toBeDefined();
        expect(abstractAction.parser).toBeDefined();
        expect(opModel.asyncOperationComplete).toBe(true);
        abstractAction.addEventListener(Lavender.ActionSuccessEvent.SUCCESS, responder1, 'success');
        var requestId = abstractAction.execute();
        expect(requestId).toBeDefined();
        
    });
});
