/**
 * Created by dsmiley on 7/11/17.
 */
describe('Lavender.UuidUtils', function(){

    it('Testing Lavender.UuidUtils', function() {
        expect(Lavender.UuidUtils.generateUUID().length > 0 ).toBe(true);
        expect(typeof Lavender.UuidUtils.generateUUID() ).toBe('string');
        expect(typeof Lavender.UuidUtils.getRandomInt()).toBe('number');
    });

});