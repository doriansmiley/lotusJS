/**
 * Created by dsmiley on 7/11/17.
 */
/**
 * Created by dsmiley on 7/11/17.
 */
describe('Lavender.Matrix', function(){

    it('Testing Lavender.Matrix', function() {
        var matrix = new Lavender.Matrix(1, 0, 0, 1, 0, 0);
        expect(matrix.a).toBe(1);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(1);
        expect(matrix.tx).toBe(0);
        expect(matrix.ty).toBe(0);
        matrix = Lavender.Matrix.IDENTITY;
        expect(matrix.a).toBe(1);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(1);
        expect(matrix.tx).toBe(0);
        expect(matrix.ty).toBe(0);
        matrix = Lavender.Matrix.HORIZONTAL_FLIP;
        expect(matrix.a).toBe(-1);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(1);
        expect(matrix.tx).toBe(0);
        expect(matrix.ty).toBe(0);
        matrix = Lavender.Matrix.VERTICAL_FLIP;
        expect(matrix.a).toBe(1);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(-1);
        expect(matrix.tx).toBe(0);
        expect(matrix.ty).toBe(0);
        matrix = Lavender.Matrix.rotation(30);
        expect(matrix.a).toBe(0.15425144988758405);
        expect(matrix.b).toBe(-0.9880316240928618);
        expect(matrix.c).toBe(0.9880316240928618);
        expect(matrix.d).toBe(0.15425144988758405);
        expect(matrix.tx).toBe(0);
        expect(matrix.ty).toBe(0);
        matrix = Lavender.Matrix.scale(10, 10);
        expect(matrix.a).toBe(10);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(10);
        expect(matrix.tx).toBe(0);
        expect(matrix.ty).toBe(0);
        matrix = Lavender.Matrix.rotation(30, new Lavender.Point(5,5));
        expect(matrix.a).toBe(0.15425144988758405);
        expect(matrix.b).toBe(-0.9880316240928618);
        expect(matrix.c).toBe(0.9880316240928618);
        expect(matrix.d).toBe(0.15425144988758405);
        expect(matrix.tx).toBe(-0.7114153699022294);
        expect(matrix.ty).toBe(9.168900871026388);
        matrix = Lavender.Matrix.scale(10, 10, new Lavender.Point(5,5));
        expect(matrix.a).toBe(10);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(10);
        expect(matrix.tx).toBe(-45);
        expect(matrix.ty).toBe(-45);
        matrix = Lavender.Matrix.translation(10, 10);
        expect(matrix.a).toBe(1);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(1);
        expect(matrix.tx).toBe(10);
        expect(matrix.ty).toBe(10);
        var matrix2 =new Lavender.Matrix(15, 0, 0, 15, 0, 0)
        matrix = matrix.concat(matrix2);
        expect(matrix.a).toBe(15);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(15);
        expect(matrix.tx).toBe(10);
        expect(matrix.ty).toBe(10);
        var point = matrix.deltaTransformPoint(new Lavender.Point(10,10));
        expect(point.x).toBe(150);
        expect(point.y).toBe(150);
        matrix = matrix.inverse(matrix);
        expect(matrix.a).toBe(0.06666666666666667);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(0.06666666666666667);
        expect(matrix.tx).toBe(-0.6666666666666666);
        expect(matrix.ty).toBe(-0.6666666666666666);
        matrix = matrix.rotate(30, new Lavender.Point(10,10));
        expect(matrix.a).toBe(0.010283429992505602);
        expect(matrix.b).toBe(-0.06586877493952412);
        expect(matrix.c).toBe(0.06586877493952412);
        expect(matrix.d).toBe(0.010283429992505602);
        expect(matrix.tx).toBe(-0.7615220493202972);
        expect(matrix.ty).toBe(0.5558534494701851);
        matrix = Lavender.Matrix.IDENTITY;
        matrix = matrix.scale(10, 10, new Lavender.Point(5,5));
        expect(matrix.a).toBe(10);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(10);
        expect(matrix.tx).toBe(-45);
        expect(matrix.ty).toBe(-45);
        point = matrix.transformPoint(point);
        expect(point.x).toBe(1455);
        expect(point.y).toBe(1455);
        matrix = matrix.translate(10, 10);
        expect(matrix.a).toBe(10);
        expect(matrix.b).toBe(0);
        expect(matrix.c).toBe(0);
        expect(matrix.d).toBe(10);
        expect(matrix.tx).toBe(55);
        expect(matrix.ty).toBe(55);
    });

});