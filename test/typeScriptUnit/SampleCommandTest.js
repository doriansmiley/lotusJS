/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('SampleCommand Test', function () {

    it('check SampleCommand function and values', function (done) {
        var config = new Lotus.Config();
        config.baseUrl = 'http://localhost';
        var context = new Lotus.Context(config);
        var service = new Lotus.SampleService( config );
        var parser = {parse:function(result){return result}};
        var opModel = new Lotus.AsyncOperationModel();
        var errorModel = new Lotus.ErrorModel();

        context.injector.mapSingletonInstance('service', service);
        context.injector.mapSingletonInstance('parser', parser);
        context.injector.mapSingletonInstance('opModel', opModel);
        context.injector.mapSingletonInstance('errorModel', errorModel);

        var responder1 = {
            success:function(event){
                console.log('SampleCommand Test responder1 sucess called: ');
                expect(event.payload.result == null).toBe(false);
                expect(event.payload.result.resultObj.photos.length > 0).toBe(true);
                done();
            },
            fault:function(event){
                console.log('SampleCommand Test responder1 fault called');
                done().error(new Error(event.payload.message));
            }
        };

        var command = new Lotus.SampleCommand(context);
        expect(command.context === context).toBe(true);
        expect(command.service === service).toBe(true);
        expect(command.parser === parser).toBe(true);
        expect(command.opModel === opModel).toBe(true);
        expect(command.errorModel === errorModel).toBe(true);
        command.addEventListener(Lotus.ActionSuccessEvent.SUCCESS, responder1, 'success');
        command.execute();

    });
});
