/**
 * Created by dsmiley on 6/30/17.
 */
describe('Lavender.Geometry', function(){

    it('Testing Lavender.Geometry', function() {
        var geometry = new Lavender.Geometry({left:100,top:200,width:500,height:1000})
        expect(geometry.left).toBe(100);
        expect(geometry.top).toBe(200);
        expect(geometry.width).toBe(500);
        expect(geometry.height).toBe(1000);
        geometry.update({left:600,top:300,width:150,height:75});
        expect(geometry.left).toBe(600);
        expect(geometry.top).toBe(300);
        expect(geometry.width).toBe(150);
        expect(geometry.height).toBe(75);
        var definedValues = geometry.getDefinedValues();
        expect(definedValues.left).toBe(600);
        expect(definedValues.top).toBe(300);
        expect(definedValues.width).toBe(150);
        expect(definedValues.height).toBe(75);
        geometry.width = NaN;
        geometry.height = NaN;
        definedValues = geometry.getDefinedValues();
        expect(definedValues.left).toBe(600);
        expect(definedValues.top).toBe(300);
        expect(definedValues.width).toBe(undefined);
        expect(definedValues.height).toBe(undefined);

    });

});