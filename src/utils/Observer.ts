import {bind} from './ProxyUtils';

export type Target ={ [key: string]: any } | Array<any> | Map<any, any>;
export type Value = {
    prop: string;
    value: any;
    obj: { [key: string]: any };
}
export type Observer = {
    properties?: Array<string>;
    next: (value: Value) => void;
}
export type Observable = {
    subscribe: (observer: Observer) => void;
    unsubscribe: (observer?) => void;
    destroy: () => void;
    closed: () => boolean;
    proxy: Target;
}

export function observe (obj: Target, interval = 50, properties?: Array<string>): Observable {
    const observers: Observer[] = [];
    let closed = false;
    const calls = [];
    if (interval < 30) {
        throw new Error('The interval must be greater than 30 milliseconds!');
    }
    const callback = (prop: string, value: any, obj: { [key: string]: any }) => {
        observers.forEach((observer) => {
            if (!observer.properties || observer.properties.includes(prop)) {
                if (calls.length === 0) {
                    setTimeout(() => {
                        // it's possible timeout will be invoked after closure.
                        if (closed) {
                            return;
                        }
                        const uniqueCalls = new Map(calls);
                        [...uniqueCalls.keys()].forEach((key) => observer.next(
                            {prop: key as string, value: uniqueCalls.get(key), obj}
                        ));
                        // dump all the calls
                        calls.splice(0);
                    }, interval);
                }
                // store all the calls into a 2D array from which we can map
                // This results in the last value assigned to a prop before timeout
                // being the value that get passed at notification time
                // ie let d = new Map([['a', 1], ['a', 1], ['b', 2], ['a', 3]]);
                // yields d.get('a') === 3
                calls.push([prop, value]);
            }
        });
    };
    const proxy = bind(obj, properties, callback);
    return {
        destroy () {
            if (closed) {
                return;
            }
            proxy.revoke();
            observers.splice(0);
            // dump all the calls
            calls.splice(0);
            closed = true;
        },
        closed () {return Boolean(closed);},
        subscribe (observer: Observer) {
            if (closed) {
                return;
            }
            observers.push(observer);
        },
        unsubscribe (observer?) {
            if (closed) {
                return;
            }
            const observerIndex = observers.indexOf(observer);
            if (observerIndex > -1) {
                observers.splice(observerIndex,1);
            } else {
                observers.splice(0);
            }
        },
        proxy: proxy.proxy,
    };
}
