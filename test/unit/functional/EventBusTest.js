describe('Test EventBus Core Features', () => {
    let subscription;
    let subscription2;
    let subscription3;
    let count = 0;

    it('Should register a listener and receive an event', async () => {
        subscription = Lotus.listen(
            {
                type: 'testEvent1',
            },
            (value) => {
                count++;
                expect(value.payload).toBe('testValue');
            }
        );
        subscription2 = Lotus.listen(
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
    });

    it('Should remove the listener', async () => {
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

    it('Should register a listener and receive a promise', (done) => {
        subscription3 = Lotus.listen(
            {
                type: 'testEventAsync',
            },
            (value) => {
                count++;
                expect(count).toBe(4);
                expect(value.type).toBe('testEventAsync');
                expect(value.payload).toBe('asyncEvent1');
                done();
            }
        );

        Lotus.emit(
            new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        type: 'testEventAsync',
                        payload: 'asyncEvent1',
                    });
                }, 1000);
            })
        );
    });

    it('Should remove the listener for async event', async () => {
        subscription3.unsubscribe();

        await Lotus.emit({
            type: 'testEventAsync',
            payload: 'asyncEvent1',
        });

        expect(count).toBe(4);
        expect(subscription3.closed).toBe(true);
    });
});
