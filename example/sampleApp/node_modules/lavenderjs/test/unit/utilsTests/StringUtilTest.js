/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('StringUtilTest ', function () {

    it('check StringUtil function and values', function () {
        var result = Lavender.StringUtil.substitute('instance/{0}/layoutNumber/{1}/action/reset', ['123456789',1]);
        expect( result ).toBe('instance/123456789/layoutNumber/1/action/reset');

        var testStringForConversion = '$#@!%_-+=^&*()~`ahsdfko12345';
        var convertedString = Lavender.StringUtil.convertStringToCharCodes( testStringForConversion );
        var originalString = Lavender.StringUtil.convertCharCodesToString( convertedString );
        expect( originalString == testStringForConversion ).toBe(true);
    });
});
