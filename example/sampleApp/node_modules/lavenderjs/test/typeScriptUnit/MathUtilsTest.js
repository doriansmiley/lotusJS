/**
 * Created by dsmiley on 6/30/17.
 */
describe('Lavender.MathUtils', function(){

    it('Testing Lavender.MathUtils', function() {
        console.log(Lavender.MathUtils.toFixed(Lavender.MathUtils.degreeToRadian(180),2));
        expect(Lavender.MathUtils.degreeToRadian(180)).toBe(3.141592653589793);
        expect(Lavender.MathUtils.radianToDegree(3.14159)).toBe(179.99984796050427);
        expect(Lavender.MathUtils.toFixed(Lavender.MathUtils.degreeToRadian(180),2)).toBe(3.14);
        expect(Lavender.MathUtils.isEven(Lavender.MathUtils.degreeToRadian(180))).toBe(false);
        expect(Lavender.MathUtils.isEven(2)).toBe(true);

    });

});