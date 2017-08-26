/**
 * Created by dsmiley on 7/11/17.
 */
describe('Lavender.Point', function(){

    it('Testing Lavender.Point', function() {
        var point = new Lavender.Point();
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
        point.x = 5;
        point.y = 15;
        expect(point.x).toBe(5);
        expect(point.y).toBe(15);
        var point2 = new Lavender.Point(20,25);
        expect(point2.x).toBe(20);
        expect(point2.y).toBe(25);
        expect(Lavender.Point.distance(point, point2)).toBe(18.027756377319946);
        expect(Lavender.Point.direction(point, point2)).toBe(0.5880026035475675);
        point2 = point2.add(point)
        expect(point2.x).toBe(25);
        expect(point2.y).toBe(40);
        point2 = point2.subtract(point)
        expect(point2.x).toBe(20);
        expect(point2.y).toBe(25);
        point2 = point2.scale(10)
        expect(point2.x).toBe(200);
        expect(point2.y).toBe(250);
        expect(point2.magnitude()).toBe(320.1562118716424);
    });

});