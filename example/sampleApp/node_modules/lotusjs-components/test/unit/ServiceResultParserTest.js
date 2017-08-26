'use strict';

/* jasmine specs for controllers go here */
describe('ServiceResultParserTest', function () {

    describe('Test access to ServiceResultParser', function () {

        it('check functions', function () {
            var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
            context.injector.mapSingletonInstance(SampleApp.IMAGE_ASSETS_PARSER_KEY, new SampleApp.ImageAssetsParser());
            var parser = new SampleApp.ServiceResultParser();
            var sampleResponse = '{' +
                '"count":4,' +
                '"photos": [' +
                '{"id":"5464022a4e696302aa000000","url":"http://localhost:3000/readImageAssets/printondemand/1234/photos/54232fc2-7345-4921-8079-59d02baa45e8","created_date":"2014-11-13","last_access_date":"2014-11-13"},' +
                '{"id":"5464096b4e696303b2000000","url":"http://localhost:3000/readImageAssets/printondemand/1234/photos/54232fc2-7345-4921-8079-59d02baa45e8","created_date":"2014-11-13","last_access_date":"2014-11-13"},' +
                '{"id":"5464096b4e696303b2000000","url":"http://localhost:3000/readImageAssets/printondemand/1234/photos/54232fc2-7345-4921-8079-59d02baa45e8","created_date":"2014-11-13","last_access_date":"2014-11-13"},' +
                '{"id":"5464096b4e696303b2000000","url":"http://localhost:3000/readImageAssets/printondemand/1234/photos/54232fc2-7345-4921-8079-59d02baa45e8","created_date":"2014-11-13","last_access_date":"2014-11-13"}' +
                ']' +
                '}';
            var imageAssets = parser.parserImageAssets(sampleResponse, context);
            expect( imageAssets.length ).toBe(4);
            //we don't test all fields as parsing of assets is handled by Hmk.ImageAssetsParser which has it's own test
            expect( imageAssets[0].id ).toBe('5464022a4e696302aa000000');
            expect( imageAssets[0].url ).toBe('http://localhost:3000/readImageAssets/printondemand/1234/photos/54232fc2-7345-4921-8079-59d02baa45e8');
        });

    });
});
