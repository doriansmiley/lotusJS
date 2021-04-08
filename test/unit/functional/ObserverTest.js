describe('Test observe function', function () {

    it('Will register an observer with a custom timeout, then destroy', function (done) {
        const target = {
            a: 'a',
            b: 'b',
            c: 'c',
            d: [1,2,3]
        };
        // create an observable to watch the target proxy
        const {destroy, closed, subscribe, unsubscribe, proxy} = Lotus.observe(target , 500);
        // with an interval of 500 next should be called twice, once for the a property and once for the b
        let count = 2;
        // create an observer that subscribes to changes in the proxy
        const observer = {
            properties: ['a', 'b'],
            next: ({prop, value, obj}) => {
                expect(['a', 'b'].includes(prop)).toBe(true);
                expect(obj).toEqual(target);
                expect(value === 1 || value === 2).toBe(true);
                count--
                if (count === 0) {
                    expect(closed()).toBeFalse();
                    destroy();
                    expect(closed()).toBeTrue();
                    // verify we didn't get anymore callbacks after count hit 0
                    setTimeout(() => {
                        expect(closed()).toBeTrue();
                        expect(count).toBe(0);
                        try {
                            proxy.a = 2;
                            proxy.b = 3;
                        } catch (e) {
                            expect(e.message).toBe('Cannot perform \'set\' on a proxy that has been revoked');
                            done();
                        }
                    }, 1000);
                }
            },
        }
        subscribe(observer);
        for (var i=0; i <= 1000; i++) {
            // should trigger one callback
            proxy.a = 1;
            // should trigger one callback
            proxy.b = 2;
            // we should not get notified about these changes as our observer
            // defines custom properties
            proxy.c = i * 5;
            proxy.d = [i * 15];
        }
    });

    it('Will register an observer with a custom timeout, then remove the observer', function (done) {
        const target = {
            a: 'a',
            b: 'b',
            c: 'c',
            d: [1,2,3]
        };
        // create an observable to watch the target proxy
        const {destroy, closed, subscribe, unsubscribe, proxy} = Lotus.observe(target , 500);
        // with an interval of 500 next should be called twice, once for the a property and once for the b
        let count = 2;
        // create an observer that subscribes to changes in the proxy
        const observer = {
            properties: ['a', 'b'],
            next: ({prop, value, obj}) => {
                expect(['a', 'b'].includes(prop)).toBe(true);
                expect(obj).toEqual(target);
                expect(value === 1 || value === 2).toBe(true);
                count--
                if (count === 0) {
                    expect(closed()).toBeFalse();
                    unsubscribe(observer);
                    expect(closed()).toBeFalse();
                    proxy.a = 2;
                    proxy.b = 3;
                    // verify we didn't get anymore callbacks after count hit 0
                    setTimeout(() => {
                        expect(closed()).toBeFalse();
                        expect(count).toBe(0);
                        done();
                    }, 1000);
                    // TODO test unsubscribe
                }
            },
        }
        subscribe(observer);
        for (var i=0; i <= 1000; i++) {
            // should trigger one callback
            proxy.a = 1;
            // should trigger one callback
            proxy.b = 2;
            // we should not get notified about these changes as our observer
            // defines custom properties
            proxy.c = i * 5;
            proxy.d = [i * 15];
        }
    });
})
