/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('LoadImageAssetsCommandTest', function () {

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
        SampleApp.resources.eventDispatcher.addEventListener(SampleApp.AppEvent.IMAGES_LOADED, responder, 'success');
        //the context has mapped the command alreay, so all we need to do is dispatch
        SampleApp.resources.eventDispatcher.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.LOAD_PAGE_DATA));
    });
});
