/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('URLUtilsTest ', function () {

    it('check Lavender.URLUtils function and values', function () {
        var testLocation = 'http://somedomain.com?templateId=1234-34546-456777&sessionId=988734-59783-93453478993&instanceId=23458745-45873-3459374587';
        //location, key, defaultValue
        var templateId = Lavender.URLUtils.getQuerystring(testLocation, 'templateId');
        expect( templateId ).toBe('1234-34546-456777');
        var sessionId = Lavender.URLUtils.getQuerystring(testLocation, 'sessionId');
        expect( sessionId ).toBe('988734-59783-93453478993');
        var instanceId = Lavender.URLUtils.getQuerystring(testLocation, 'instanceId');
        expect( instanceId ).toBe('23458745-45873-3459374587');
    });
});
