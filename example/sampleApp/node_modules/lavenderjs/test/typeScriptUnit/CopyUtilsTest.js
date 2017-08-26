/**
 * Created by dsmiley on 5/19/17.
 */
describe('Lavender.CopyUtils', function(){

    it('Testing Lavender.CopyUtils', function() {
        var child = {name:'testName', address:'115', height:null, width:null, rotation:25};
        var parent = {height:56, width:33, rotation:100};
        Lavender.CopyUtils.copyInheredValues(child, parent);
        expect(child.height).toBe(56);
        expect(child.width).toBe(33);
        expect(child.rotation).toBe(25);
        Lavender.CopyUtils.overwriteValues(child, parent);
        expect(child.height).toBe(56);
        expect(child.width).toBe(33);
        expect(child.rotation).toBe(100);
        var newObject = Lavender.CopyUtils.concatObjects([child, parent]);
        expect(newObject.height).toBe(56);
        expect(newObject.width).toBe(33);
        expect(newObject.rotation).toBe(100);
        expect(newObject.name).toBe('testName');
        expect(newObject.address).toBe('115');
        Lavender.CopyUtils.copyProperties(parent, newObject);
        expect(parent.height).toBe(56);
        expect(parent.width).toBe(33);
        expect(parent.rotation).toBe(100);
        expect(parent.name).toBe('testName');
        expect(parent.address).toBe('115');
    });

});