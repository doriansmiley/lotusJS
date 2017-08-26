'use strict';

/* jasmine specs for controllers go here */
describe('SPISDK Lists', function() {

  describe('Lavender.Config', function(){

    it('should test default confid values', function() {
        var config = new Lavender.Config();
        config.parserCode = 'test parser code';
        config.exporterCode = 'test exporter code';
        config.eventDispatcherCode = 'jquery';
        config.baseUrl = 'http://devsql1.silpub.com/';//String
        config.sessionId = '12345678';//String
        config.httpServiceCode = 'angular';
        config.serviceCode = 'testCode';
        config.webRoot = '/main/';

        expect(config.parserCode).toBe('test parser code');
        expect(config.exporterCode).toBe('test exporter code');
        expect(config.eventDispatcherCode).toBe('jquery');
        expect(config.baseUrl).toBe('http://devsql1.silpub.com/');
        expect(config.sessionId).toBe('12345678');
        expect(config.httpServiceCode).toBe('angular');
        expect(config.serviceCode).toBe('testCode');
        expect(config.webRoot).toBe('/main/');

    });

  });
});
