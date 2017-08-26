'use strict';

/* jasmine specs for controllers go here */
describe('Lavender.BrowserUtils', function(){

    var binder = new Lavender.Binder();

    it('Testing getting user agent info', function() {
        console.log(Lavender.BrowserUtils.getBrowser().browser);
        console.log(Lavender.BrowserUtils.getBrowser().version);
        expect(Lavender.BrowserUtils.getBrowser().browser.length > 0).toBe(true);
        expect(Lavender.BrowserUtils.getBrowser().version.length > 0).toBe(true);
    });

});
