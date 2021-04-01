/*
* @description Build reactive programming using a basic callback for proxies. This is lean by design, so don't ask me to fuck it up with complexity for your edge cases.
* @example
const notify = (prop, value, target) => {
 console.log(`notify triggered for prop ${prop} value ${value} target ${target}`);
};

const target = {
  message1: "hello",
  message2: "world"
};
const proxy = bind(target, ['message1'], notify);
proxy.message1 = 'Bzznitch'; // triggers notify
* */
export function bind (obj: { [key: string]: any }, properties: Array<string>, notify: (prop: string, value: any, obj: { [key: string]: any }) => void) {
    const handler = {
        get (target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);
            if (prop === 'set' && target instanceof Map) {
                // trigger callbacks
                notify(prop, value, target);
            }
            return typeof value == 'function' ? value.bind(target) : value;
        },
        set: function (target, prop, value, receiver) {
            if (!properties || properties.includes(prop)) {
                // trigger callbacks
                notify(prop, value, target);
            }
            return Reflect.set(target, prop, value, receiver);
        }
    };

    return new Proxy(obj, handler);
}
/*
* @example
var Person = function(name) {
  this.name = name;
};
var Boy = extend(Person, function(name, age) {
  this.age = age;
});
Boy.prototype.gender = 'M';
var Peter = new Boy('Peter', 13);
console.log(Peter.gender);  // "M"
console.log(Peter.name);    // "Peter"
console.log(Peter.age);     // 13
* */
function extend (sup, base) {
    const descriptor = Object.getOwnPropertyDescriptor(
        base.prototype, 'constructor'
    );
    base.prototype = Object.create(sup.prototype);
    const handler = {
        construct: function (target, args) {
            const obj = Object.create(base.prototype);
            this.apply(target, obj, args);
            return obj;
        },
        apply: function (target, that, args) {
            sup.apply(that, args);
            base.apply(that, args);
        }
    };
    const proxy = new Proxy(base, handler);
    descriptor.value = proxy;
    Object.defineProperty(base.prototype, 'constructor', descriptor);
    return proxy;
}
