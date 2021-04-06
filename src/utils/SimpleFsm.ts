export type State = {
    executed?: -1 | 0 | 1;
    result?: unknown;
    execute: (any) => unknown;
    next?: (state: State, states: State[]) => State;
    error?: (state: State, states: State[]) => State;
}
// typing the map as Map<string, State | State[]> causes the compiler to complain insistently
async function doTransaction (states: Map<string, any>, timeout = 1000, values = {}) {

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
                        const result = {
                            error: undefined,
                            ...values};
                        result.error = e;
                        state.executed = -1;
                        state.result = result;
                        transitions.set('current', state.error(state, transitions.get('states')));
                        await doTransaction(transitions, timeout, result);
                    }
                }
            }
            resolve({transitions});
        } catch (e) {
            reject(e);
        }
    });
}

export async function stateMachine (states: State[], timeout = 1000) {
    // TODO make cancelable
    const transitions = new Map();
    transitions.set('stack', []);
    transitions.set('states', states);
    transitions.set('current', states[0]);
    return await doTransaction(transitions, timeout);
}
