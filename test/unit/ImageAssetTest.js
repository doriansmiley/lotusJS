/**
 * Created by dsmiley on 5/11/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('Hmk.HallmarkAsset', function() {

    it('should test default Hmk.HallmarkAsset values', function() {
        var model = new SampleApp.ImageAsset();
        model.id = '1234';
        model.url = 'http://localhost:3002/printondemand/1234/photos/d2aae55c-aec1-4b8b-a576-e84333ffeba3';
        model.createdDate = '2014-11-13';
        model.lastAccessDate = '2015-10-12';
        model.objectName = 'd2aae55c-aec1-4b8b-a576-e84333ffeba3';
        expect(model.id).toBe('1234');
        expect(model.url).toBe('http://localhost:3002/printondemand/1234/photos/d2aae55c-aec1-4b8b-a576-e84333ffeba3');
        expect(model.createdDate.toString()).toBe('Wed Nov 12 2014 16:00:00 GMT-0800 (PST)');
        expect(model.lastAccessDate.toString()).toBe('Sun Oct 11 2015 17:00:00 GMT-0700 (PDT)');
        expect(model.objectName).toBe('d2aae55c-aec1-4b8b-a576-e84333ffeba3');
    });
    
});