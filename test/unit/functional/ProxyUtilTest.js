describe('ProxyUtilTest', function () {
    // TODO make this test better, this coverage is weak as we are not testing class extensions
    //  nor are we testing a wide range of property values
    it('should proxy an generic Javascript object', function () {
        const notify = (prop, value, target) => {
            notifyResult = {prop, value, target};
        };
        let notifyResult = {};
        const target = {
            message1: "hello",
            message2: "world"
        };
        const proxy = Lotus.bind(target, ['message1'], notify);
        expect(proxy.message1).toBe('hello');
        expect(proxy.message2).toBe('world');
        // trigger notify
        proxy.message1 = 'Bzznitch';
        expect(proxy.message1).toBe('Bzznitch');
        expect(notifyResult.prop).toBe('message1');
        expect(notifyResult.value).toBe('Bzznitch');
        expect(notifyResult.target).toEqual(target);
        // non bound property should not update notifyResult!
        proxy.message2 = 'No hello for you!';
        expect(proxy.message2).toBe('No hello for you!');
        expect(notifyResult.prop).toBe('message1');
        expect(notifyResult.value).toBe('Bzznitch');
        expect(notifyResult.target).toEqual(target);
    });
    it('should proxy a map', function () {
        const notify = (prop, value, target) => {
            notifyResult = {prop, value, target};
        };
        let notifyResult = {};

        let map = new Map();
        const proxy = Lotus.bind(map, null, notify);
        proxy.set('test', 1);
        expect(proxy.get('test')).toBe(1);
        expect(notifyResult.target.get('test')).toBe(1);
        expect(notifyResult.target).toEqual(map);
    });
    it('should proxy an array', function () {
        const notify = (prop, value, target) => {
            notifyResult = {prop, value, target};
        };
        let notifyResult = {};

        let array = [1,2,3];
        const arrayProxy = Lotus.bind(array, null, notify);
        arrayProxy[0] = 'I dont want to complex this'
        expect(arrayProxy[0]).toBe('I dont want to complex this');
        expect(notifyResult.prop).toBe('0');
        expect(notifyResult.value).toBe('I dont want to complex this');
        expect(notifyResult.target).toEqual(array);
    });
});
