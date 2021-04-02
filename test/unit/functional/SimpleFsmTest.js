describe('SimpleFsmTest', function () {
    // TODO make this test better, this coverage is weak as we are not testing class extensions
    //  nor are we testing a wide range of property values
    it('It should execute a simple state machine', async function () {
        const loadAd = (ad) => (values) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    newValue = {...values};
                    newValue.adsLoaded = true;
                    resolve(newValue);
                }, 1000);
            });
        };

        const loadUI = (ui) => (values) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    newValue = {...values};
                    newValue.uiLoaded = true;
                    resolve(newValue);
                }, 1000);
            });
        };

        const done = (values) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    newValue = {...values};
                    newValue.done = true;
                    resolve(newValue);
                }, 1000);
            });
        };

        const states = [
            {
                execute: loadAd({}),
                next: (state, states) => states[1],
                error: (state, states) => states[2],
            },
            {
                execute: loadUI({}),
                next: (state, states) => states[2],
                error: (state, states) => states[2],
            },
            {
                execute: done
            },
        ];

        const result = await Lotus.stateMachine(states);
        expect(JSON.stringify(result.transitions.get('stack')[result.transitions.get('stack').length-1].result)).toBe('{"adsLoaded":true,"uiLoaded":true,"done":true}');
        expect(result.transitions.get('stack')[0]).toEqual(states[0]);
        expect(result.transitions.get('stack')[1]).toEqual(states[1]);
        expect(result.transitions.get('stack')[2]).toEqual(states[2]);
    });
});
