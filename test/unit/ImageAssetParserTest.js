/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ImageAssetParserTest', function () {

    it('check SampleApp.ImageAssetParser function and values', function () {
        var jsonData = '{"id":"5464096b4e696303b2000000","url":"http://localhost:3002/printondemand/1234/photos/d2aae55c-aec1-4b8b-a576-e84333ffeba3","created_date":"2014-11-13","last_access_date":"2015-10-12"}';
        var parsedJSON = JSON.parse(jsonData);
        var parser = new SampleApp.ImageAssetParser();
        var imageAsset = (parser.canParse(parsedJSON)) ? parser.parse(parsedJSON) : null;
        expect( imageAsset.id ).toBe('5464096b4e696303b2000000');
        expect( imageAsset.url ).toBe('http://localhost:3002/printondemand/1234/photos/d2aae55c-aec1-4b8b-a576-e84333ffeba3');
        expect( imageAsset.objectName ).toBe('d2aae55c-aec1-4b8b-a576-e84333ffeba3');
        expect( imageAsset.createdDate.toString() ).toBe('Wed Nov 12 2014 16:00:00 GMT-0800 (PST)');
        expect( imageAsset.lastAccessDate.toString() ).toBe('Sun Oct 11 2015 17:00:00 GMT-0700 (PDT)');
    });
});
