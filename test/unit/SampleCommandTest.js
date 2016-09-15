/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('SampleCommandTest', function () {

    it('check SampleCommand function and values', function () {
        var model = Lavender.ModelLocator.getInstance();
        model.config.baseUrl = 'http://localhost';
        var context = new Lotus.Context(model.config);
        var service = new Lotus.SampleService( model.config );
        var parser = {};
        context.injector.mapSingletonInstance('service', service);
        context.injector.mapSingletonInstance('model', Lavender.ModelLocator.getInstance());
        context.injector.mapSingletonInstance('parser', parser);
        var command = new Lotus.SampleCommand(context);
        expect(command.service === service).toBe(true);
        expect(command.model === Lavender.ModelLocator.getInstance()).toBe(true);
        expect(command.parser === parser).toBe(true);
        command.execute();
        //expect(button.buttonSkinPart === skinBart).toBe(true);

    });
});
