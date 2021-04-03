describe('Test EventBus Core Features', () => {
    let count = 0;

    it('Should register a listener, receive an event, and remove the listeners', async () => {
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

        expect(count).toBe(4);
        expect(next.type).toBe('testEventAsync');
        expect(next.payload).toBe('asyncEvent1');

        subscription3.unsubscribe();

        await Lotus.emit({
            type: 'testEventAsync',
            payload: 'asyncEvent1',
        });

        expect(count).toBe(4);
        expect(subscription3.closed).toBe(true);
    });
});
