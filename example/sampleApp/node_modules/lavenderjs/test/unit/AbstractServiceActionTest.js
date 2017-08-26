/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractServiceActionTest ', function () {

    it('check AbstractServiceAction function and values', function () {
        var opModel = new Lavender.AsyncOperationModel();
        var errorModel = new Lavender.ErrorModel();
        var abstractAction = new Lavender.AbstractServiceAction();
        abstractAction.service = {};
        abstractAction.opModel = opModel;
        abstractAction.errorModel = errorModel;
        abstractAction.parser = {};
        var result = abstractAction.execute();

        expect(result).toBe(null);
        expect(abstractAction.service).toBeDefined();
        expect(abstractAction.opModel).toBeDefined();
        expect(abstractAction.parser).toBeDefined();
        expect(opModel.asyncOperationComplete).toBe(false);
        expect(opModel.asyncOperationCount).toBe(1);

        result = abstractAction.success( new Lavender.HttpSuccess({},'test', '1234') );
        expect(opModel.asyncOperationComplete).toBe(true);
        expect(opModel.asyncOperationCount).toBe(0);
        expect(abstractAction.service).toBe(null);
        expect(abstractAction.opModel).toBe(null);
        expect(abstractAction.parser).toBe(null);

        abstractAction.service = {};
        abstractAction.opModel = opModel;
        abstractAction.parser = {};
        result = abstractAction.execute();

        expect(result).toBe(null);
        expect(abstractAction.service).toBeDefined();
        expect(abstractAction.opModel).toBeDefined();
        expect(abstractAction.parser).toBeDefined();
        expect(opModel.asyncOperationComplete).toBe(false);
        expect(opModel.asyncOperationCount).toBe(1);

        result = abstractAction.fault( new Lavender.HttpFault({},'test', 'message') );
        expect(opModel.asyncOperationComplete).toBe(true);
        expect(opModel.asyncOperationCount).toBe(0);
        expect(abstractAction.service).toBe(null);
        expect(abstractAction.opModel).toBe(null);
        expect(abstractAction.parser).toBe(null);
    });
});
