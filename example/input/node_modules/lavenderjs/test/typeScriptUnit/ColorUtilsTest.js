/**
 * Created by dsmiley on 5/19/17.
 */
describe('Lavender.ColorUtils', function(){

    it('Testing Lavender.ColorUtils', function() {
        expect(Lavender.ColorUtils.rgb2hex('rgb(0, 102, 255)')).toBe('#0066ff');
        expect(Lavender.ColorUtils.hexToRgb('#0066ff')).toBe('rgb(0,102,255)');
        expect(Lavender.ColorUtils.hexToRgbA('#0066ff')).toBe('rgba(0,102,255,1)');
        expect(Lavender.ColorUtils.hexToRgbArray('#0066ff')[0]).toBe(0);
        expect(Lavender.ColorUtils.hexToRgbArray('#0066ff')[1]).toBe(102);
        expect(Lavender.ColorUtils.hexToRgbArray('#0066ff')[2]).toBe(255);
        expect(Lavender.ColorUtils.rgbToHsl(0, 102, 255)[0]).toBe(216);
        expect(Lavender.ColorUtils.rgbToHsl(0, 102, 255)[1]).toBe(100);
        expect(Lavender.ColorUtils.rgbToHsl(0, 102, 255)[2]).toBe(50);
        expect(Lavender.ColorUtils.rgbToHsv(0, 102, 255)[0]).toBe(216);
        expect(Lavender.ColorUtils.rgbToHsv(0, 102, 255)[1]).toBe(100);
        expect(Lavender.ColorUtils.rgbToHsv(0, 102, 255)[2]).toBe(100);
    });

});