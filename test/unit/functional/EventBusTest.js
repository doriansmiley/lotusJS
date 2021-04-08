describe('Test EventBus Core Features', () => {

    it('Should register a listener, receive an event, and remove the listeners', async () => {
        let count = 0;
        const subscription = Lotus.listen(
            {
                type: 'testEvent1',
            },
            (value) => {
                count++;
                expect(value.payload).toBe('testValue');
            }
        );

        const subscription2 = Lotus.listen(
            {
                type: 'testEvent1',
            },
            (value) => {
                count++;
                expect(value.payload).toBe('testValue');
            }
        );

        await Lotus.emit({
            type: 'testEvent1',
            payload: 'testValue',
        });

        expect(count).toBe(2);
        expect(subscription.closed).toBe(false);

        subscription.unsubscribe();

        await Lotus.emit({
            type: 'testEvent1',
            payload: 'testValue',
        });

        expect(count).toBe(3);
        expect(subscription.closed).toBe(true);

        subscription2.unsubscribe();

        await Lotus.emit({
            type: 'testEvent1',
            payload: 'testValue',
        });

        expect(count).toBe(3);
        expect(subscription2.closed).toBe(true);
    });

    it('Should register a listener and receive a promise, then remove the listener', async () => {
        let count = 0;
        let next = {};
        const subscription3 = Lotus.listen(
            {
                type: 'testEventAsync',
            },
            (value) => {
                count++;
                next = value;
            }
        );

        await Lotus.emit(
            new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        type: 'testEventAsync',
                        payload: 'asyncEvent1',
                    });
                }, 1000);
            })
        );

        expect(count).toBe(1);
        expect(next.type).toBe('testEventAsync');
        expect(next.payload).toBe('asyncEvent1');

        subscription3.unsubscribe();

        await Lotus.emit({
            type: 'testEventAsync',
            payload: 'asyncEvent1',
        });

        expect(count).toBe(1);
        expect(subscription3.closed).toBe(true);
    });

    it('Should register a listener for DI, receive the proxy, and remove the listeners', (done) => {
        const users = [
            {
                userName: 'myUsername',
                id: '1234',
            },
            {
                userName: 'myUsername2',
                id: '5678',
            },
        ];
        // create an observable to watch the target proxy, normally this would be done is services
        const {proxy} = Lotus.observe(users);
        // setup and event handler for the getUsers event, note this should prevent GC
        const subscription = Lotus.listen(
            {
                type: 'getUsers',
            },
            (value) => {
                value.payload(proxy);
            }
        );
        // this is how application facades can request data
        // it's simple, decoupled.
        Lotus.emit({
            type: 'getUsers',
            payload: (users) => {
                expect(subscription.closed).toBe(false);
                expect(users.length).toBe(2);
                subscription.unsubscribe();
                expect(subscription.closed).toBe(true);
                done();
            },
        });
    });
});
