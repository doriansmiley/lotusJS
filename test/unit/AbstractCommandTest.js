/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractServiceActionTest ', function () {

    it('check AbstractServiceAction function and values', function () {
        /*
         protected action:IAction;
         protected service:IService;
         protected opModel:AsyncOperationModel;
         protected parser:IParser;
         protected errorModel:ErrorModel;
         public context:IContext;
        * */
        var config = new Lavender.Config();
        config.baseUrl = 'http://localhost';
        var context = new Lotus.Context(config);
        var service = new Lotus.SampleService(config);
        var parser = {parse:function(result){return result}};
        var opModel = new Lavender.AsyncOperationModel();
        var errorModel = new Lavender.ErrorModel();

        context.injector.mapSingletonInstance('service', service);
        context.injector.mapSingletonInstance('parser', parser);
        context.injector.mapSingletonInstance('opModel', opModel);
        context.injector.mapSingletonInstance('errorModel', errorModel);

        var abstractCommand = new Lotus.AbstractCommand(context);
        var result = abstractCommand.execute();

        expect(result).toBe(null);
        expect(abstractCommand.service).toBeDefined();
        expect(abstractCommand.opModel).toBeDefined();
        expect(abstractCommand.errorModel).toBeDefined();
        expect(abstractCommand.parser).toBeDefined();
        expect(abstractCommand.opModel.asyncOperationComplete).toBe(false);
        expect(abstractCommand.opModel.asyncOperationCount).toBe(1);

        result = abstractCommand.success( new Lavender.HttpSuccess({},'test', '1234') );
        expect(opModel.asyncOperationComplete).toBe(true);
        expect(opModel.asyncOperationCount).toBe(0);
        expect(abstractCommand.service).toBe(null);
        expect(abstractCommand.opModel).toBe(null);
        expect(abstractCommand.errorModel).toBe(null);
        expect(abstractCommand.parser).toBe(null);

        abstractCommand = new Lotus.AbstractCommand(context);
        result = abstractCommand.execute();

        expect(result).toBe(null);
        expect(abstractCommand.service).toBeDefined();
        expect(abstractCommand.opModel).toBeDefined();
        expect(abstractCommand.errorModel).toBeDefined();
        expect(abstractCommand.parser).toBeDefined();
        expect(opModel.asyncOperationComplete).toBe(false);
        expect(opModel.asyncOperationCount).toBe(1);

        result = abstractCommand.fault( new Lavender.HttpFault({},'test', 'message') );
        expect(opModel.asyncOperationComplete).toBe(true);
        expect(opModel.asyncOperationCount).toBe(0);
        expect(errorModel.appError).toBe(true);
        expect(abstractCommand.service).toBe(null);
        expect(abstractCommand.opModel).toBe(null);
        expect(abstractCommand.errorModel).toBe(null);
        expect(abstractCommand.parser).toBe(null);
    });
});
