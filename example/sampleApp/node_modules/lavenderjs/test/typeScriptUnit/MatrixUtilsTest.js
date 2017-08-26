/**
 * Created by dsmiley on 7/11/17.
 */
/**
 * Created by dsmiley on 7/11/17.
 */
describe('Lavender.MatrixUtils', function(){

    it('Testing Lavender.MatrixUtils', function() {
        var matrix = new Lavender.Matrix(1, 0, 0, 1, 0, 0);
        matrix = Lavender.MatrixUtils.rotate(matrix, 30, new Lavender.Point(5,5));
        expect(matrix.a).toBe(0.8660254037844387);
        expect(matrix.b).toBe(0.49999999999999994);
        expect(matrix.c).toBe(-0.49999999999999994);
        expect(matrix.d).toBe(0.8660254037844387);
        expect(matrix.tx).toBe(3.169872981077806);
        expect(matrix.ty).toBe(-1.8301270189221928);
        var matrixCss =  Lavender.MatrixUtils.matrixToCSS(matrix);
        expect(matrixCss).toBe('matrix(0.8660254038,0.5,-0.5,0.8660254038,3.1698729811,-1.8301270189)');
        var element = document.createElement('div');
        element.style.transform = matrixCss;
        expect(Lavender.MatrixUtils.getRotationAngleForElement(element)).toBe(30);
        expect(Lavender.MatrixUtils.getRotationAngle(matrix)).toBe(30);
        matrix = Lavender.MatrixUtils.getMatrix(matrixCss);
        expect(matrix.a).toBeCloseTo(0.8660254037844387);
        expect(matrix.b).toBeCloseTo(0.49999999999999994);
        expect(matrix.c).toBeCloseTo(-0.49999999999999994);
        expect(matrix.d).toBeCloseTo(0.8660254037844387);
        expect(matrix.tx).toBeCloseTo(3.169872981077806);
        expect(matrix.ty).toBeCloseTo(-1.8301270189221928);
    });

});