/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('LoadImageAssetsActionTest', function () {

    it('Should load image assets', function (done) {
        var responder = {
            success: function (event) {
                console.log(event.payload.result)
                done();
            },
            fault: function (faultObj) {
                done.fail(faultObj.errorObj)
            }
        };
        SampleApp.init();
        //service, opModel, parser, errorModel
        var action = new SampleApp.LoadImageAssetsAction(
            SampleApp.resources.injector.inject(SampleApp.APP_SERVICES),
            SampleApp.resources.model.asyncOperationModel,
            SampleApp.resources.injector.inject(SampleApp.SERVICE_RESULT_PARSER_KEY),
            SampleApp.resources.model.errorModel);
        action.addEventListener(Lavender.ActionSuccessEvent.SUCCESS, responder, 'success');
        action.execute();
    });
});
