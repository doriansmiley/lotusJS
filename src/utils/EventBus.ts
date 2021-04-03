import composeP from 'ramda/es/composeP';
import compose from 'ramda/es/compose';

export type AbstractEventBusEventType = {
    payload?: unknown;
    type: string;
    cancel?: boolean;
};

export type Subscription = {
    closed: boolean;
    unsubscribe: () => void;
}

type Emitter<T extends AbstractEventBusEventType> = (event: T | Promise<T>) => void;

const subscriberMap = new Map<string, any[]>();
// used to intercept events, cause side effects, and forward to subscribers
// SHOULD BE INTERNAL ONLY! Do not expose this to the public.
const interceptors: Array<
    (value: AbstractEventBusEventType) => typeof value
    > = [];

// factories
const trace = function <T extends AbstractEventBusEventType> (value: T) {
    // eslint-disable-next-line no-console
    console.log(
        `event bus invoked with event type: ${value.type} and payload: ${value.payload}`
    );
    return value;
};

const registerFactory = function <T extends AbstractEventBusEventType> (subscriberMap: Map<string, any[]>) {
    return (event: T, onNext: (value: T) => void, interceptor?: (value: AbstractEventBusEventType) => typeof value) => {
        if (!subscriberMap.get(event.type)) {
            subscriberMap.set(event.type, []);
        }
        if (interceptor) {
            interceptors.push(interceptor);
        }
        subscriberMap.get(event.type).push(onNext);
        // operation is idempotent
        return {
            closed: false,
            unsubscribe () {
                if (interceptor) {
                    const interceptorIndex = interceptors.indexOf(interceptor);
                    interceptors.splice(interceptorIndex, 1);
                }
                const index = subscriberMap.get(event.type).indexOf(onNext);
                this.closed = true;
                // splice mutates the array in
                subscriberMap.get(event.type).splice(index, 1);
            },
        };
    };
};

const emitFactory = function <T extends AbstractEventBusEventType> (
    subscriberMap: Map<string, any[]>
) {
    return async function <T extends AbstractEventBusEventType> (
        event: T
    ) {
        // if interceptors have not canceled the event fire it
        if (!event?.cancel) {
            subscriberMap
                .get(event.type)
                ?.forEach((callback: (value: AbstractEventBusEventType) => void) => {
                    callback(event);
                });
        }
        return event;

    };
};

const interceptorFactory = function <T extends AbstractEventBusEventType> (
    interceptors: Array<(value: AbstractEventBusEventType) => typeof value>
) {
    interceptors.push(trace);
    return async function <T extends AbstractEventBusEventType> (
        event: T
    ) {
        // have interceptors receive and transform the event
        interceptors.forEach(interceptor => {
            interceptor(event as T);
        });
        // if interceptors have not canceled the event fire it
        return event;

    };
};

const promiseFactory = async function <T extends AbstractEventBusEventType> (
    event: T | Promise<T>
) {
    let result;
    if (event instanceof Promise) {
        result = await event;
    } else {
        result = event;
    }
    return result;
};

// exports
export const emit = composeP<
    AbstractEventBusEventType,
    AbstractEventBusEventType,
    AbstractEventBusEventType,
    AbstractEventBusEventType
    >(emitFactory(subscriberMap), interceptorFactory(interceptors), promiseFactory);

// in the future I think we could have some more interceptors besides trace
// please note that registerFactory must be last in composition due to the number of args
export const listen = compose<
    Map<string, any[]>,
    (event: AbstractEventBusEventType, onNext: (value: AbstractEventBusEventType) => void) => Subscription
        >(registerFactory)(subscriberMap);
