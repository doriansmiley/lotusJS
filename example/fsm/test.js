function createMatrix (rows, columns) {
    // we add one more row so track transaction state!
    const dims = (rows + 1) * (columns + 1);
    const matrix = new Array(dims).fill(0);
    // set identity values for the last row except the state position
    for (let i = dims - (rows + 1); i < matrix.length - 1; i++) {
        matrix[i] = 1;
    }
    return matrix;
};

function reducer (state) {
    const status = state.reduce((a, b, index) => (index < state.length - 1) ? a * b : a, 1);
    state[state.length - 1] = status;
    return state;
};

async function doTransaction (states, timeout = 1000, values = {}) {

    return new Promise(async (resolve, reject) => {
        const transitions = new Map(states);
        try {
            const state = transitions.get('current');
            if (state && !state.hasOwnProperty('executed')) {
                try {
                    const result = await state.execute(values);
                    state.executed = 1;
                    state.result = result;
                    transitions.get('stack').push(state);
                    if (state.next) {
                        transitions.set('current', state.next(state, transitions.get('states')));
                        await doTransaction(transitions, timeout, result);
                    }
                } catch (e) {
                    if (state.error) {
                        const result = {...values};
                        result.error = e;
                        state.executed = -1;
                        state.result = result;
                        transitions.set('current', state.error(state, transitions.get('states')));
                        await doTransaction(transitions, timeout, result);
                    }
                };
            }
            resolve({transitions});
        } catch (e) {
            reject(e);
        }
    });
}

async function stateMachine (states, timeout = 1000) {
    // TODO add support to parse JSON
    const transitions = new Map();
    transitions.set('stack', []);
    transitions.set('states', states);
    transitions.set('current', states[0]);
    return await doTransaction(transitions, timeout);
}

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

(async function () {
    const result = await stateMachine([
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
    ]);
    console.log(result.transitions.get('stack')[result.transitions.get('stack').length-1].result);
    console.log('🎉');
}());
