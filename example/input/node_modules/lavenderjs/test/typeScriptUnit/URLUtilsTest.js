/**
 * Created by dsmiley on 7/11/17.
 */
describe('Lavender.URLUtils', function(){

    it('Testing Lavender.URLUtils', function() {
        expect(Lavender.URLUtils.getQuerystring('http://test.com/?testBad=a', 'testGood', 'default')).toBe('default');
        expect(Lavender.URLUtils.getQuerystring('http://test.com/?testGood=a', 'testGood', 'default')).toBe('a');
        expect(Lavender.URLUtils.getQuerystring('http://test.com/?testGood=a&job=x&done=y', 'job', 'default')).toBe('x');
        expect(Lavender.URLUtils.getQuerystring('http://test.com/?testGood=a&job=x&done=y', 'done', 'default')).toBe('y');
        expect(Lavender.URLUtils.getQuerystring('http://test.com/?testGood=a&job=x', 'done', 'default')).toBe('default');
    });

});