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

export function observe (obj: Target, properties?: Array<string>): Observable {
    const observers: Observer[] = [];
    let closed = false;
    // TODO add debounce
    const callback = (prop: string, value: any, obj: { [key: string]: any }) => {
        observers.forEach((observer) => {
            if (!observer.properties || observer.properties.includes(prop)) {
                observer.next({prop, value, obj});
            }
        });
    };
    const proxy = bind(obj, properties, callback);
    return {
        destroy: () => {
            proxy.revoke();
            this.unsubscribe();
            closed = true;
        },
        closed: () => Boolean(closed),
        subscribe: (observer: Observer) => observers.push(observer),
        unsubscribe: (observer?) => {
            const observerIndex = (observer) ? observers.indexOf(observer) : 0;
            if (observerIndex > -1) {
                observers.splice(observerIndex,1);
            }
        },
        proxy: proxy.proxy,
    };
}
